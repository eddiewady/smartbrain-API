const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

const knex= require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile =require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'test123',
		database:'smart-brain'
	}
});



app.use(cors());

app.use(bodyParser.json());
const port = 3000;






app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})



app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})





app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})


app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res)=>{image.handleApiCall(req,res)})






app.listen(process.env.PORT || port,()=>{console.log(`app is running on port ${process.env}`)});