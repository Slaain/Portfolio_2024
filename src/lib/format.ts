import type { Period, YearMonth } from '../data/types';

const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' });

const toDate = (value: YearMonth) => {
	const [year, month] = value.split('-').map(Number);
	return new Date(year, month - 1, 1);
};

export const formatMonth = (value: YearMonth) => monthYear.format(toDate(value));

export const formatPeriod = ({ from, to }: Period) => {
	if (!to) return `${formatMonth(from)} — aujourd’hui`;
	if (to === from) return formatMonth(from);
	return `${formatMonth(from)} — ${formatMonth(to)}`;
};

export const yearOf = (value: YearMonth) => value.split('-')[0];

export const pad = (n: number) => String(n).padStart(2, '0');
