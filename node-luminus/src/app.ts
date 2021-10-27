import express          from 'express';
import { router }       from './routes';
import { errorHandler } from './middleware/errorHandler';
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server running on port 5000");
})