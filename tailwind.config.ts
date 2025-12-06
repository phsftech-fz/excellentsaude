import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'excellent': {
          // Azul escuro principal (header, botões principais) - baseado no site atual
          navy: {
            50: '#e3e8f0',
            100: '#bac5d6',
            200: '#8d9fba',
            300: '#60799e',
            400: '#3f5c8a',
            500: '#1e3f76', // Azul principal do site
            600: '#1a3869',
            700: '#16305a',
            800: '#12284b',
            900: '#0a1a35', // Azul escuro header
          },
          // Verde (ícone cruz médica e "SAÚDE" no logo) - verde vibrante do logo
          green: {
            50: '#e8f8f5',
            100: '#c3eae3',
            200: '#9ddcd0',
            300: '#77cebd',
            400: '#51c0aa',
            500: '#2bb297', // Verde principal do logo (vibrante)
            600: '#249e87',
            700: '#1d8a77',
            800: '#167667',
            900: '#0f6257',
          },
          // Azul claro (texto "SAÚDE" no logo)
          blue: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#2196f3', // Azul claro
            600: '#1e88e5',
            700: '#1976d2',
            800: '#1565c0',
            900: '#0d47a1',
          },
          // Cinza neutro
          gray: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

