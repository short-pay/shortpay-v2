/**
 * Configurações ou metadados do Tema "Boca"
 */
export const bocaThemeConfig = {
  themeName: 'Boca Checkout',
  themeDescription:
    'Um tema inspirado no layout Boca Shop, focado em etapas (Identificação, Entrega e Pagamento).',
  previewUrl: '/images/themes/boca-preview.png',

  // Cores padrão para o tema
  colors: {
    primary: '#0066ff', // Azul do banner
    success: '#0dac5c', // Verde "Continuar" ou "Comprar agora"
    textDark: '#333333',
    textLight: '#ffffff',
    background: '#f9fafb',
  },

  // Labels padrão (caso você queira usar no builder)
  labels: {
    step1Label: 'IDENTIFICAÇÃO',
    step2Label: 'ENTREGA',
    step3Label: 'PAGAMENTO',
    continueButton: 'Continuar',
    buyButton: 'Comprar agora',
  },

  // Campos que podem ser editados no builder
  editableFields: [
    {
      key: 'bannerText',
      label: 'Texto do Banner Superior',
      type: 'text',
      defaultValue: '¡SOLO 1 UNIDAD POR PERSONA, EL STOCK SE ESTÁ ACABANDO!',
    },
    {
      key: 'logoUrl',
      label: 'URL do Logo',
      type: 'image',
      defaultValue: 'https://placehold.co/100x50',
    },
    {
      key: 'colors.primary',
      label: 'Cor Primária do Tema',
      type: 'color',
      defaultValue: '#0066ff',
    },
    // ... e assim por diante
  ],
}
