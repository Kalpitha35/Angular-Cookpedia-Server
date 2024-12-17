const mongoose = require("mongoose")

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB Atlas Successfully connected with cookpediaServer");
}).catch(err=>{
    console.log("MongoDB Atlas Connection Failed!!!");
    console.log(err);
})