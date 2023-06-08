import { BlogService } from "./blog.service";
import{Post, controller , Get , Delete}from "./../decorators/router.decorators";
import { NextFunction, Request, Response } from "express";
import { BlogIdDTO, CreatBlogDTO } from "./blog.dto";
import { plainToClass } from "class-transformer";

import { IBlog } from "./blog.type";
import { FindDoc } from "../types/public_types";

const blogservice : BlogService = new BlogService();
@controller("/Blog")
export class BlogController {
    @Post()
    async CreatBlog(req : Request , res : Response ,  next : NextFunction ){
        try {
            const blogdto : CreatBlogDTO = plainToClass(CreatBlogDTO , req.body)
            const Blogs : IBlog = await blogservice.Creat(blogdto);
            
            return res.status(201).json({
                statuscode : 201,
                message : "created" ,
                data : {Blogs}
            });
            
        } catch (error) {
            next(error)
        }
    };
    @Get()
    async GetAllBlog(req : Request , res : Response , next : NextFunction){
        try {
            const blogs : IBlog[] = await blogservice.FetchAll();
        res.status(200).json({
            
            status_code : 201 ,
            data : {
                blogs
            }
        }) 
        } catch (error) {
            next(error)
        }
    };
    @Get("/find/:id")
    async GetById(req : Request , res : Response , next : NextFunction){
        try {
        const blogdto : BlogIdDTO =  plainToClass(BlogIdDTO , req.params)
        const blogs : FindDoc<IBlog> = await blogservice.FetchById(blogdto);
        res.status(200).json({
            
            status_code : 201 ,
            data : {
                blogs
            }
        }) 
        } catch (error) {
            next(error)
        }
    };
    @Delete("/delete/:id")
    async RemoveById(req : Request , res : Response , next : NextFunction){
        try {
            const blogdto : BlogIdDTO =  plainToClass(BlogIdDTO , req.params)
            const blogs : string = await blogservice.RemoveById(blogdto);
            res.status(200).json({
                
                status_code : 201 ,
                data : {
                    blogs
                }
            }) 
            } catch (error) {
                next(error)
            }
    }

}