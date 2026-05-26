import 'dotenv/config';
import express from "express";
import { taskRouterInstance } from "./containers/task.container.js";
import { userRouterInstance } from './containers/user.container.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/tasks", taskRouterInstance);
app.use("/users", userRouterInstance);

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});