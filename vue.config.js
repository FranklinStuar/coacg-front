module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    devServer: {
      proxy: {
        "/coacsg/server/controller/": {
          target: 'http://192.168.2.100:80',
          changeOrigin: true
        },
        "/coac": {
          target: 'http://192.168.2.100:80',
          changeOrigin: true
        },
      },
    }
}
