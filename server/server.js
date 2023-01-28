const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5002;

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

let calculations = [];

app.post('/calculator' , (req, res)=> {
    console.log('inside of my POST request', req.body);
    // posting the object package from client side
    let objectSS = req.body;
    
    calculations.push(objectSS);
    res.sendStatus(201);
});  

app.get('/calculator', (req, res) => {
    console.log('getting the input data from client js', calculations);
     // calculations are going to go here ⬇️

     for (let object of calculations) {
        if (object.operator === "+") {
        object.result = Number(object.input1) + Number(object.input2); 
        } else if (object.operator === "-") {
            object.result = Number(object.input1) - Number(object.input2);
        } else if (object.operator === "*") {
            object.result = Number(object.input1) * Number(object.input2); 
        } else if (object.operator === "/") {
            object.result = Number(object.input1) / Number(object.input2);
        };
    };
    res.send(calculations);
    console.log('this is a calculation', calculations)
  });

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })