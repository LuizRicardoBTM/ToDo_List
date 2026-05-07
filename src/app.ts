import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/task');

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});