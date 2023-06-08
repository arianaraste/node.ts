import {Router } from "express";
console.log("test");


const Decorator_Router : Router  = Router();

export function Get (path? : string | undefined){

   return function(target : any , propkey : string , descriptor : PropertyDescriptor ) {
    
    const route = path ? (path[0] == "/" ? path : "/" + path) :  "/" + propkey;
    Decorator_Router.get(`${route}` ,target[propkey]);

   }
};
export function Post (path? : string | undefined){

    return function(target : any , propkey : string , descriptor : PropertyDescriptor ) {
     
     const route = path ? (path[0] == "/" ? path : "/" + path) :  "/" + propkey;
     Decorator_Router.post(`${route}` ,target[propkey]);
 
    }
 
};
export function Delete (path? : string | undefined){

    return function(target : any , propkey : string , descriptor : PropertyDescriptor ) {
     
     const route = path ? (path[0] == "/" ? path : "/" + path) :  "/" + propkey;
     Decorator_Router.delete(`${route}` ,target[propkey]);
 
    }
 
};
export function Put (path? : string | undefined){

    return function(target : any , propkey : string , descriptor : PropertyDescriptor ) {
     
     const route = path ? (path[0] == "/" ? path : "/" + path) :  "/" + propkey;
     Decorator_Router.put(`${route}` ,target[propkey]);
 
    }
 
};
export function Patch (path? : string | undefined){

    return function(target : any , propkey : string , descriptor : PropertyDescriptor ) {
     
     const route = path ? (path[0] == "/" ? path : "/" + path) :  "/" + propkey;
     Decorator_Router.patch(`${route}` ,target[propkey]);
 
    }
 
};
export function controller(pathcontroller? : string | undefined) :any {

    return function(target : any){

        if (pathcontroller?.[0] !== "/") pathcontroller = "/" + pathcontroller ;
        const path : string = pathcontroller? pathcontroller: "/" ;
        Decorator_Router.use(path , Decorator_Router )
        //return class extends target{};  
        
    }

};

console.log("test1");

export default Decorator_Router 