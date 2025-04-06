export function toCents(amount: number): number {
  return Math.round(amount * 100)
}

export function fromCents(cents: number): number {
  return cents / 100
}

export function isValidCurrency(currency: string): boolean {
  const supportedCurrencies = ['BRL', 'USD', 'EUR']
  return supportedCurrencies.includes(currency)
}
