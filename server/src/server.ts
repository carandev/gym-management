import app from './app'

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0' // Escuchar en todas las interfaces

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`🌐 Server also available on http://192.168.101.19:${PORT}`)
})
