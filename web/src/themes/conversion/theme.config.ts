export interface ThemeProps {
  primaryColor: string
  logo: string
  companyName: string
  securityBadgeEnabled: boolean
}

const themeConfig = {
  name: 'Conversion',
  description: 'Tema otimizado para alta conversão',
  customizableOptions: [
    'primaryColor',
    'logo',
    'companyName',
    'securityBadgeEnabled',
  ],
  defaultConfig: {
    primaryColor: '#28BF65',
    logo: '',
    companyName: 'Minha Loja',
    securityBadgeEnabled: true,
  },
}

export default themeConfig
export const conversionTheme = {
  colors: {
    primary: '#E6007E',
    secondary: '#333333',
    background: '#FFFFFF',
    text: '#333333',
    border: '#E5E7EB',
    error: '#DC2626',
    success: '#059669',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
}

export type ThemeConfig = typeof conversionTheme
