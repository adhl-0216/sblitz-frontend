export const Currencies = {
    USD: { label: 'USD', symbol: '$' },
    EUR: { label: 'EUR', symbol: '€' },
    GBP: { label: 'GBP', symbol: '£' },
    JPY: { label: 'JPY', symbol: '¥' },
    AUD: { label: 'AUD', symbol: 'A$' },
    CAD: { label: 'CAD', symbol: 'C$' },
    CHF: { label: 'CHF', symbol: 'CHF' },
    CNY: { label: 'CNY', symbol: '¥' },
    SEK: { label: 'SEK', symbol: 'kr' },
    NZD: { label: 'NZD', symbol: 'NZ$' }
} as const;

export type Currency = {
    label: string;
    symbol: string;
};

export type CurrencyCode = keyof typeof Currencies;
