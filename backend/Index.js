const express = require('express');
require('./db/config');
const cors = require("cors");
const User = require('./db/User');
const Product = require('./db/product');
const product = require('./db/product');
const { ObjectId } = require('mongodb');
const app = express();

// const connectDb = async ()=>{
//             // mongoose.connect('mongodb://localhost:27017/e-com');
//             // const ProductSchema = new mongoose.Schema({});
//             // const product = mongoose.model('users',ProductSchema);
//             const data = await User.find();
//             console.log(data);
// }
// connectDb();
app.use(express.json());
app.use(cors());        

app.post('/register', async(req, resp)=>{
        let e = await User.find({email:req.body.email});
        console.log(e.length);
        if(e.length>0){
                resp.send(e);
                console.log(" not found");
        }else{
                console.log("found")
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        resp.send(result);
        }
});

app.post('/login',async (req, resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
                resp.send(user)
        }else{
                resp.send({result:"NO USER FOUND"})
        }
     }else{
                resp.send({result:"SUM THING IS MISSING"});
     }
})

app.post('/add-product', async(req, resp)=>{
         let product = new Product(req.body);
         let result = await Product.save();
         resp.send(result);
});

app.get('/products/:user', async (req, resp)=>{
        let products = await Product.find({userId:req.params.user});
        if(products.length>0){
                resp.send(products);
        }else{
                resp.send({result:"No Product found"});
        }
})

app.delete('/product/:id', async(req, resp)=>{
        let result = await Product.deleteOne({_id:req.params.id});
        resp.send(result);
})


app.get('/product/:id', async(req, resp)=>{
        let result = await Product.findOne({_id:req.params.id});
        if(result){
                resp.send(result);
        }else{
                resp.send({result:"No Record found"});
        }
})

app.put('/product/:id', async (req, resp)=>{
        let result = await Product.updateOne({_id:req.params.id},{$set: req.body})
        resp.send(result);
});

        app.get('/search/:id/:key', async (req, resp)=>{
                let result = await Product.find({
                  $or:[ 
                        {name :{$regex :req.params.key}},
                        {price :{$regex :req.params.key}},
                        {category :{$regex :req.params.key}},
                        {company :{$regex :req.params.key}},
                     ]        
                })  
                console.log(result);    
                resp.send(result);
        }
        )

        
app.listen(300);