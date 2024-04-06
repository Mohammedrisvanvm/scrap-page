import  Express  from "express";
import scrapRoute from './route/scrap-route.js'

const app=Express()
app.use('/',scrapRoute)

app.listen(3000,()=>{
    console.log("server running");
})