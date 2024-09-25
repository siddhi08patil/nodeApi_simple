const express = require("express");
const users = require('./MOCK_DATA.json')
const app = express();
const fs=require("fs");
const PORT=8000;
//middleware also called plugin
app.use(express.urlencoded({extended:false}));

//routes
app.get('/api/users',(req,res)=>{
    return res.json(users); //get user data in json form
});
app.get('/users',(req,res)=>{
    const html=`<ul>
      ${users.map((user)=>`<li>${user.first_name}</li>`).join("")} //get user data in html form
    </ul>`;
    res.send(html);
});
//multiple routes with same address but different http methodes
app.route('/api/users/:id').get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id); //get the user with specific id only
    return res.json(user);
})


//dynamic path parameters have : at beggininh

app.post('/api/users',(req,res)=>{
    const body=req.body;
    console.log("body",body);
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success" ,id:users.length+1});
    });
    
});



app.listen(PORT);