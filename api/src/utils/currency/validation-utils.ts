export function isValidCurrency(currency: string): boolean {
  const supportedCurrencies = ['BRL', 'USD', 'EUR']
  return supportedCurrencies.includes(currency)
}
