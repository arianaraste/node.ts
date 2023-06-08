
import { UserModel } from "../models/user.model";
import { HashString, errorhandler } from "../modules/utils";
import { RegisterDTO } from "./auth.dto";
import { IUser } from "../types/user.types";
import { validateSync } from "class-validator";

export class AuthService {
    async register(UserDto : RegisterDTO):Promise<IUser>{
    const errors = validateSync(UserDto)
    const errorcheck = errorhandler(errors);
    if(errorcheck) throw {status : 400 ,errors : errorcheck , message : "validation  error"}
    const existuser = await UserModel.findOne({username : UserDto.username});
    if(existuser) throw {status : 400 , massage : "this username already exist"}
    const newpassword= HashString(UserDto.password)
    UserDto.password = newpassword
    const user : IUser = await UserModel.create(UserDto);
    return user

    };

}