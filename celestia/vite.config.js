import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { //同plugins同级
    cors: true,
    proxy: { //配置代理服务器
      "/api": {
        target: "http://146.19.80.133:26659",    //目标url
        changeOrigin: true,    //允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""),     //重写路径,替换/api
      },
    },
  }
})
