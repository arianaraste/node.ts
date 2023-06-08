import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { UserModel } from "../models/user.model";
import { Algorithm , sign } from "jsonwebtoken";
import { jwtGeneratorPayloadDTO } from "../types/public_types";

const AccessTokenSecretKey : string = '4204957E27FA164A6782C54BC24ECB8E';

export  function HashString (data : string) : string {
    
    const salt = genSaltSync(10);
    
    const HashedString : string = hashSync(data , salt);
   
    return HashedString;
};

export  function CompareHashString (data : string , encrypted: string ) : boolean {
   
    return compareSync(data , encrypted);
};
export async function jwtGenerator(payload :jwtGeneratorPayloadDTO) : Promise<void> {
   
    const {id} = payload;
    
    const user = await UserModel.findById(id);
    
    if(!user) throw {status : 404 , massage : "not fund user"};
    
    const expiresIn = new Date().getTime() + (1000 + 60 + 60 + 24);
    
    const algorithm : Algorithm = "HS512";
    
    
    
    sign(payload , AccessTokenSecretKey , {expiresIn , algorithm} , async (err , Token) => {
        if(!err && Token){
            user.accessToken = Token;
            await user.save()
            console.log(user);
            

        }})
    
};
export function errorhandler (errors : any[]){

    let errortext : string[] = [];

    for (const errorIteam of errors ) {

        errortext = errortext.concat(errorIteam.constraints);

    };
    return errortext;
}