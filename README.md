# Portfolio 2026 — Idris Ali

Portfolio personnel en React 19, Vite et TypeScript. Il est publié gratuitement sur GitHub Pages à l'adresse <https://slaain.github.io/Portfolio_2024/>.

## Développement local

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Publication

Le workflow GitHub Actions `.github/workflows/deploy.yml` construit `dist/` et le publie sur GitHub Pages à chaque push sur `master`. Le chemin Vite `/Portfolio_2024/` est configuré pour ce dépôt de projet. Les fichiers statiques utilisent ce préfixe aussi pour les logos, captures et PDF.

Dans les paramètres du dépôt, `Settings > Pages > Build and deployment > Source` doit être réglé sur **GitHub Actions**. L'URL est ensuite visible dans l'environnement `github-pages` du workflow.
