import app from './server';

const port = process.env.SERVER_PORT || 8081;

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
