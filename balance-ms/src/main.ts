import express from 'express';

const app = express();
const port = 3003;

app.get('/', (req, res) => {
    console.log("Server is open to requests");
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})