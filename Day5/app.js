const express = require('express');
const fs = require('fs/promises');

let users=[];
const app = express();
app.use(express.json());

app.get('/users',(req,res) => {
    res.json(users);
})

app.post('/reguser',(req,res) => {
    const {name,age} =req.body;
    let user=[];
    if(!name ||!age){
        res.status(400).json({message: 'Invalid name or age'})
    } 
    else{
        const newid=users.length>0 ? users[users.length-1].id+1:1;
        user={id:newid,name,age};
        users.push(user)
    }
    
    res.status(201).json(user);
})

app.put('/user/:id',(req,res) =>{
    const uid=req.params.id;
    const {name:newname,age:newage}=req.body;
    const index=users.findIndex(user=>user.id == uid);
    if(index==-1)
        res.status(400).json({message: 'users not found' })
    else{
        users[index].name=newname;
        users[index].age=newage;
        res.status(200).json({message: 'user updated successfully', data: users[index]});
    }
})

app.delete('/user/:id',(req,res) =>{
    const uid=req.params.id;
    const index=users.findIndex(user=>user.id == uid);
    if(index==-1)
        res.status(400).json({message: 'users not found' })
    else{
        users.splice(index,1);
        res.status(200).json({message: 'user deleted successfully', data: users[index]});
    }
})

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});