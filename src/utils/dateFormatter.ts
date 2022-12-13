const options: Intl.DateTimeFormatOptions = { year: '2-digit', day: 'numeric', month: 'short' }

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", options)
}
