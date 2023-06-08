import express from "express"
import { Application , Request , Response , NextFunction } from "express";
import http, { Server } from "http";
import { Response_Type } from "./types/public_types";
import ApplicationRouter from "./routes/index.routes";
import "./types/app.module";
import "./modules/MongoDBConection"


const app : Application = express();
const server : Server = http.createServer(app);
const PORT = 5600;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(ApplicationRouter);


app.use((req : Request , res : Response , next : NextFunction) => {

    const response: Response_Type = {
        Status_Code : 404 ,
        Response_Massage : "not found page"
    };
    
    return res.status(404).json(response);


})
app.use((error : any , req : Request , res : Response , next : NextFunction) => {
    const status : number = +error?.status || 500;
    const massage : string = error?.message || "InternalServerError "
    const errors  = error?.errors || [];
    console.log(errors);
    
    const response: Response_Type = {
        Status_Code : status ,
        Response_Massage : massage ,
        errors
        
    };
    
    return res.status(404).json(response);


})

server.listen(PORT,()=>{console.log(`server run over http://localhost:${PORT}`);
})