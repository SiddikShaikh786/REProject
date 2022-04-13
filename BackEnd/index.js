const express= require('express');
const port =4000;
const app = express();
const mongoose=require('mongoose');
const cors=require('cors');
const DBUrl='mongodb+srv://SiddikShaikh786:root@cluster0.kxplu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DBUrl, 
    {
        UseNewUrlParser: true,
        UseUnifiedTopology: true
    },
    (error)=>
    {
        if(!error)
        {
            console.log('DB connected successfully')
        }
        else
        {
            console.log('Couldnt connect')
        }
    }
    )

    //importing router middleware
    const router=require('./router/route')
   
   //body parse middleware
   app.use(express.urlencoded({extended:true}))

   //cors middleware
   app.use(cors())

   //json level middleware
   app.use(express.json())

   //router level middleware
  app.use('/users',router)


   //eror level middleware
   app.get('/error',(req, res) => {
       res.status(500).send('Something went wrong')
   })

   



















   app.listen(port,()=>{
       console.log(`server listening the port ${port}`)
   })