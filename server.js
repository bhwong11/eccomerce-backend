const express = require('express');
const app = express();

const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.get('/hello',(req,res)=>{
    return res.send('HELLO!')
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})