const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors());
//app.use(express.json());

//Port
const PORT = process.env.PORT || 5500;

// connect to mongodb server
mongoose.connect(process.env.DB_CONNECT).then(()=>app.listen(5500, ()=>console.log(`Connected to mongodb on port ${PORT}`)))
.catch(err => console.log(err))

//create schema
const todoSchema = {
    title:{
        type:String,
        required:true
    },
    content:String
};
//creae schemamodel
const Todo = mongoose.model('Todo',todoSchema);

//post means add items in todo 
app.post('/', async (req, res)=> {
    const newItem = new Todo(req.body);
    try{
        const saveItem =await newItem.save();
        res.status(201).json(saveItem);
    }catch(error){
        res.status(409).json({error: error.message})
    }
});

//get todoItems
app.get('/', async (req, res)=> {
    try{
        const allTodoItems = await Todo.find({});
        res.status(200).json(allTodoItems);
    }catch(error){
        res.status(409).json({error: error.message})
    }
});

//put means update the todoItems
app.put('/:id', async (req,res) => {
    try{
    const updateItem = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json("Item Updated");
}catch(error){
    res.status(409).json({error: error.message})
}});

//delete the todoItems
app.delete('/:id', async (req,res) => {
    try{
    const deleteItem = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
}catch(error){
    res.status(409).json({error: error.message})
}});
//Add port
//app.listen(PORT,()=>console.log("Server listening on"));

//BackendCompleted