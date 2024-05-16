import express from 'express';
import bodyParser from 'body-parser';
import connect from './schemas/index.js';
import productsRouter from './routes/products.router.js';

const app = express();
connect();

app.use(bodyParser.json());
app.use('/api', productsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
