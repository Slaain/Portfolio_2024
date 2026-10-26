import { useEffect, useRef } from 'react';
import { useAppState } from '../lib/app-state';

const VERTEX = /* glsl */ `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Domain-warped fbm "ember flow" that bends toward the cursor.
const FRAGMENT = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uDeep;
uniform vec3 uHot;
uniform vec3 uGlow;
uniform float uIntensity;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
	           mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
	for (int i = 0; i < 5; i++) {
		v += a * noise(p);
		p = rot * p * 2.02;
		a *= 0.5;
	}
	return v;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uRes;
	vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
	vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);

	float t = uTime * 0.06;
	float d = length(p - m);
	vec2 pull = (m - p) * 0.35 * exp(-d * 2.2);

	vec2 q = vec2(fbm(p * 1.4 + pull + t), fbm(p * 1.4 - pull + vec2(5.2, 1.3) - t));
	vec2 r = vec2(fbm(p * 1.8 + 3.5 * q + vec2(1.7, 9.2) + t * 1.4),
	              fbm(p * 1.8 + 3.5 * q + vec2(8.3, 2.8) - t * 1.1));
	float f = fbm(p * 1.6 + 3.0 * r);

	// Ribbons concentrated toward the lower right, fading to the background elsewhere
	float mask = 1.0 - smoothstep(0.0, 1.1, length((uv - vec2(0.85, 0.1)) * vec2(0.9, 1.25)));
	mask = max(mask, 0.7 * exp(-d * 2.6));

	vec3 col = uBg;
	col = mix(col, uDeep, smoothstep(0.25, 0.7, f) * mask);
	col = mix(col, uHot, smoothstep(0.5, 0.85, f * 0.6 + r.x * 0.6) * mask * uIntensity);
	col = mix(col, uGlow, smoothstep(0.78, 1.05, f * 0.55 + r.y * 0.65) * mask * uIntensity * 0.85);

	// Soft vignette
	col = mix(col, uBg, smoothstep(0.55, 1.25, length(uv - 0.5) * 1.4) * 0.6);

	// Dither to avoid banding
	col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

	gl_FragColor = vec4(col, 1.0);
}
`;

const PALETTES = {
	dark: { bg: '#0b0b0c', deep: '#3d1306', hot: '#ff5a1f', glow: '#ffc29e', intensity: 0.9 },
	light: { bg: '#f4f2ee', deep: '#f7cdb4', hot: '#ff6a2b', glow: '#fff1e6', intensity: 0.75 }
} as const;

const hexToRgb = (hex: string) => {
	const n = parseInt(hex.slice(1), 16);
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] as const;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type)!;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn('[ShaderBackground]', gl.getShaderInfoLog(shader));
	}
	return shader;
}

export function ShaderBackground({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme } = useAppState();
	const themeRef = useRef(theme);

	// The render loop reads the theme from a ref so it can ease colors without restarting
	useEffect(() => {
		themeRef.current = theme;
	}, [theme]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
		if (!gl) return;

		const program = gl.createProgram()!;
		gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
		gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
		gl.linkProgram(program);
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const position = gl.getAttribLocation(program, 'position');
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const u = (name: string) => gl.getUniformLocation(program, name);
		const uRes = u('uRes');
		const uTime = u('uTime');
		const uMouse = u('uMouse');
		const uBg = u('uBg');
		const uDeep = u('uDeep');
		const uHot = u('uHot');
		const uGlow = u('uGlow');
		const uIntensity = u('uIntensity');

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		// Render below native resolution: the effect is soft, so this is invisible and much cheaper.
		const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6;

		const resize = () => {
			const { clientWidth, clientHeight } = canvas;
			canvas.width = Math.max(1, Math.floor(clientWidth * scale));
			canvas.height = Math.max(1, Math.floor(clientHeight * scale));
			gl.viewport(0, 0, canvas.width, canvas.height);
		};
		resize();
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);

		const mouse = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4 };
		const onPointer = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.tx = (e.clientX - rect.left) / rect.width;
			mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
		};
		window.addEventListener('pointermove', onPointer, { passive: true });

		// Colors ease between themes instead of snapping
		const current = { ...PALETTES[themeRef.current], rgb: {} as Record<string, number[]> };
		const colorKeys = ['bg', 'deep', 'hot', 'glow'] as const;
		colorKeys.forEach((k) => (current.rgb[k] = [...hexToRgb(PALETTES[themeRef.current][k])]));
		let intensity: number = PALETTES[themeRef.current].intensity;

		let visible = true;
		const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		io.observe(canvas);

		let frame = 0;
		const start = performance.now();
		const render = (now: number) => {
			frame = requestAnimationFrame(render);
			if (!visible || document.hidden) return;

			const target = PALETTES[themeRef.current];
			colorKeys.forEach((k) => {
				const goal = hexToRgb(target[k]);
				current.rgb[k] = current.rgb[k].map((v, i) => v + (goal[i] - v) * 0.08);
			});
			intensity += (target.intensity - intensity) * 0.08;

			mouse.x += (mouse.tx - mouse.x) * 0.045;
			mouse.y += (mouse.ty - mouse.y) * 0.045;

			gl.uniform2f(uRes, canvas.width, canvas.height);
			gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000 + 12);
			gl.uniform2f(uMouse, mouse.x, mouse.y);
			gl.uniform3fv(uBg, current.rgb.bg);
			gl.uniform3fv(uDeep, current.rgb.deep);
			gl.uniform3fv(uHot, current.rgb.hot);
			gl.uniform3fv(uGlow, current.rgb.glow);
			gl.uniform1f(uIntensity, intensity);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		};
		frame = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			io.disconnect();
			window.removeEventListener('pointermove', onPointer);
			// Free GPU resources but keep the context: StrictMode remounts reuse the same canvas
			gl.deleteBuffer(buffer);
			gl.deleteProgram(program);
		};
	}, []);

	return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
