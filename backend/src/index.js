import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import productApi from './apis/product';
import userApi from './apis/user';
import orderApi from './apis/order';
import categoryApi from './apis/category';

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

mongoose
  .connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use('/api/category', categoryApi);
app.use('/api/products', productApi);
app.use('/api/users', userApi);
app.use('/api/order', orderApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('server is started on port ' + port));
``;
