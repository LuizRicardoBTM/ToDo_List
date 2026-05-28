import 'dotenv/config';
import express from "express";
import { taskRouterInstance } from "./containers/task.container.js";
import { userRouterInstance } from './containers/user.container.js';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());



app.use("/tasks", AuthenticationMiddleware, taskRouterInstance);
app.use("/users", userRouterInstance);

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});