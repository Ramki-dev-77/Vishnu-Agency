import express from 'express';
import cors from 'cors';
import fs from 'fs';

//used to create a express server
const app = express();
const port = 5000;

//To stop blocking from one domain to another like front to back-end
app.use(cors());
app.use(express.json());

//To add the customer
app.put("/api/add",(req,res)=>{

    //getting data from frontend
    const data = req.body;

    //To read the existing file
    const jsonData = fs.readFileSync('customers.json','utf-8');

    //Converting to json
    const addedData = JSON.parse(jsonData);

    let length = addedData.length;
    data.id = length+1;

    //Add the data got from the frontend
    addedData.push(data);
    console.log(addedData);

    //Overwrite the file and respond to front end
    fs.writeFileSync('customers.json',JSON.stringify(addedData,null,2));

    res.json({message:"Success"});
});

//To get the customer details
app.get("/api/show",(req,res)=>{
    //same as add endpoint
    const readData = fs.readFileSync("customers.json",'utf-8');
    const sendData = JSON.parse(readData);
    res.json(sendData);
});

app.delete("/api/delete",(req,res)=>{
    const indexData = req.body;
    console.log("Index : "+indexData.id);

    const readData = fs.readFileSync("customers.json","utf-8");
    const datum = JSON.parse(readData);
    
    if(indexData.id === 0){
        datum.splice(0,0);
    }
    else{
        datum.splice(indexData.id,indexData.id);
    }

    fs.writeFileSync('customers.json',JSON.stringify(datum,null,2));

    
    res.json({message:"Success"});

});

//To categorize which leads to sorting
app.get("/api/category",(req,res)=>{
    const jsonData = fs.readFileSync("customers.json",'utf-8');
    const datum = JSON.parse(jsonData);

    console.log(datum)
    res.json()
})
//To enable the port to listen to the server
app.listen(port ,()=>{
    console.log(`Server is running in ${port} successfully!!`);
})