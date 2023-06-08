import { Post, controller } from "../decorators/router.decorators";
import {Request , Response , NextFunction} from  "express";
import { UserModel } from "../models/user.model";
import { CompareHashString, errorhandler, jwtGenerator } from "../modules/utils";
import { IUser } from "../types/user.types";
import { AuthService } from "./auth.servise";
import { RegisterDTO } from "./auth.dto";
import { plainToClass } from "class-transformer"
import { validateSync } from "class-validator"
import { error } from "console";



const authservice : AuthService = new AuthService();
@controller("/auth")
export class AuthController {
    
    @Post()
    async Register(req : Request , res : Response , next : NextFunction){
        
        try {
            const RegDTO : RegisterDTO = plainToClass(RegisterDTO , req.body , {excludeExtraneousValues : true});
            const user : IUser = await authservice.register(RegDTO);
            return res.send(user);

        } catch (error) {
               next(error)
        }
    };
    @Post()
    async Login(req : Request , res : Response , next : NextFunction){
        
        try {

            const {username , password} = req.body;
            const existuser : IUser | null  = await UserModel.findOne({username});
            if(!existuser) throw {status : 401 , message : "the username or password isnt corecete"};
            const isTrueUser : boolean = CompareHashString(password , existuser.password);
            if(!isTrueUser) throw {status : 401 , message : "the username or password isnt corecete"};
            await jwtGenerator({username , id : existuser._id});
            const user = await UserModel.findById(existuser._id ,{__v :0 ,password: 0})
            return res.json({
                status : 200 ,
                data : {
                    user 
                }
            })
           

        } catch (error) {
            console.log(error);
            
            next(error)
        }

    }


};

