import express from 'express';
import {promises as fs} from 'fs';
import {data} from './data';

let app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.get('/test', (req, res) => {
    console.log(data);
    res.send("Test!");
});

app.get('/data', (req, res)=>{
   
    res.json(data);
});

app.post('/data', (req, res)=>{
   
    let newData = req.body;
    data.push(newData);
    res.json(data);

});

app.get('/data/:name', (req, res)=>{
    let {name} = req.params;
    let person = data.find(p => p.name === name);

    res.json(person);

});

app.get('/file-data', async (req, res)=>{
    let data = await fs.readFile(__dirname + '/data.json');
    let people = JSON.parse(data);

    res.json(people);
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});

 