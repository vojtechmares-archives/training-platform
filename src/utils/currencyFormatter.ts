const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CZK',

    maximumFractionDigits: 0, // (causes 2500.99 to be printed as `CZK 2,501`)
});

export function formatCurrency(price: number | bigint): string {
    return currencyFormatter.format(price).replace(',', ' ')
}
