export const minimalThemeDefaultConfig = {
  themeName: 'Minimal',
  previewUrl: '/images/themes/minimal.png', // algum preview do tema

  // Valores padrão de cores
  colors: {
    primary: '#333',
    secondary: '#777',
  },

  // Textos ou labels padrão
  labels: {
    headerText: 'Checkout Minimal',
    buttonText: 'Finalizar Compra',
  },

  // Poderia ter um "layout" se for um editor mais avançado
  layout: [
    { type: 'header', editable: true },
    { type: 'productList', editable: true },
    { type: 'footer', editable: false },
  ],
}
