import axios from 'axios'

const API_URL = 'https://openexchangerates.org/api/latest.json'
const APP_ID = 'fe760aead4994bbba5d6e0dab6fea609' // Sua chave de API

// Inicialize o cache como um objeto vazio
let ratesCache: { [key: string]: number } = {}
let lastFetched: number | null = null

/**
 * Busca as taxas de câmbio da API e armazena em cache.
 */
async function fetchExchangeRates(
  baseCurrency: string,
): Promise<{ [key: string]: number }> {
  if (
    Object.keys(ratesCache).length > 0 && // Verifica se há dados no cache
    lastFetched &&
    Date.now() - lastFetched < 3600000 // Cache válido por 1 hora
  ) {
    return ratesCache
  }

  try {
    const response = await axios.get(API_URL, {
      params: { app_id: APP_ID, base: baseCurrency },
    })

    if (!response.data || !response.data.rates) {
      throw new Error('Invalid response from currency API.')
    }

    ratesCache = response.data.rates
    lastFetched = Date.now()

    console.log('💱 Fetched new exchange rates:', ratesCache)
    return ratesCache
  } catch (error) {
    console.error('❌ Failed to fetch exchange rates:', error)
    throw new Error('Failed to fetch exchange rates.')
  }
}

/**
 * Converte um valor de uma moeda para outra usando taxas de câmbio locais.
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
): Promise<number> {
  const rates = await fetchExchangeRates(fromCurrency)

  if (!rates[toCurrency]) {
    throw new Error(`Conversion rate for ${toCurrency} not available.`)
  }

  const convertedAmount = amount * rates[toCurrency]
  return Number.parseFloat(convertedAmount.toFixed(2))
}
