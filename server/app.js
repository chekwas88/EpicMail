import express, { json } from 'express';
import userRoute from './route/userRoute';

const app = express();

app.use(json());
app.use(userRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app started at ${port}`));

export default app;
