type CheckoutData = {
  theme: string // ex.: "minimal"
  customizations: {
    primaryColor: string
    logoUrl: string
    headerText: string
  }
  products: {
    id: number
    name: string
    price: number
  }[]
}

// Simulando um registro único no "BD"
const mockCheckouts: Record<string, CheckoutData> = {
  abc123: {
    theme: 'minimal',
    customizations: {
      primaryColor: '#3b82f6',
      logoUrl: 'https://placehold.it/100x50',
      headerText: 'Seja bem-vindo(a) ao Meu Checkout!',
    },
    products: [
      { id: 1, name: 'Produto A', price: 50 },
      { id: 2, name: 'Produto B', price: 100 },
    ],
  },
  // pode ter outros checkouts aqui
}

export async function getCheckoutData(checkoutId: string) {
  // simulando busca assíncrona
  return mockCheckouts[checkoutId] || null
}
