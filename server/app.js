import express, { json } from 'express';
import cors from 'cors';
import userRoute from './route/userRoute';
import messageRoute from './route/messageRoute';


const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(json());
app.use(userRoute);
app.use(messageRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app started at ${port}`));

export default app;
