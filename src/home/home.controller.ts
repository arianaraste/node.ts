import {Request,Response, NextFunction } from "express";
import { controller, Get } from "../decorators/router.decorators";



@controller("/users")
export class HomeApplication {
    @Get()

    Get_Home_Info(req : Request , res : Response , next : NextFunction){
        
        try {
            return res.send("users");
            
            
        } catch (error) {
            next(error)
        }

    }

};

