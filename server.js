import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js';

//App Config
const app = express();
const port = process.env.PORT || 5000;
const connectionUrl = "mongodb+srv://admin:01xIzlftlRa3e7ug@cluster0.rkao1.mongodb.net/just-swap?retryWrites=true&w=majority"

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get("/", (req, res) => res.send(200).send("Hello World!"))

app.post('/just-swap/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
});

app.get('/just-swap/card', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`listening on localhost:${port}`))