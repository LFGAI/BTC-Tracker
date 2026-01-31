
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo (production, development)
  // Fix: cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" in Vite config
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Prioriza a chave do env do Vite, depois do sistema
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});
