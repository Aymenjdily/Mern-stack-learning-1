const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const friendModal = require('./models/friendsModel')
require("dotenv").config()

app.use(cors())
app.use(express.json())

// Connect to data base

mongoose.connect("mongodb+srv://aymenjdily:19960807@cluster.fpou0us.mongodb.net/tutorial1",{useNewUrlParser : true})

app.post('/addfriend', async (req,res) => {
    const name = req.body.name
    const age = req.body.age

    const friend = new friendModal({
        name : name,
        age : age,
        description : `${name} is Amazing friend` 
    })
    await friend.save()
    res.send(friend)
})

app.get('/getfriend', async (req,res) => {
    friendModal.find({}, (err, result) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.put('/updatefriend', async (req,res) => {
    const newAge = req.body.newAge
    const id = req.body.id

    try{
        await friendModal.findById(id, (err, friendToUpdate) => {
            friendToUpdate.age = Number(newAge)
            friendToUpdate.save()
        })
    }
    catch(err){
        console.log(err)
    }
    
    res.send("Updated")
})

app.delete('/delete/:id', async (req,res) => {
    const id = req.params.id
    await friendModal.findByIdAndRemove(id).exec()
    res.send("Deleted")
})

app.listen(process.env.PORT || 8000, () => {
    console.log('You are connected')
})