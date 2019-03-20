import express, { json } from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoute from './route/userRoute';
import messageRoute from './route/messageRoute';


const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

app.use(json())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userRoute);
app.use(messageRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EPIC MAIL',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No such endpoint exist',
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app started at ${port}`));

export default app;
