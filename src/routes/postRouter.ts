import express, { Router } from "express";
import { PostController } from "../controller/PostController";

export function postRouter(controller: PostController) {
    const router = express.Router();
  
    //add new post
    router.post("/", controller.addpost);
  
    //get All posts
    router.get("/", controller.getAllPost);
  
    //get single post
    router.get("/:id", controller.getPost);
  
    //update
    router.put("/:id", controller.updatePost);
  
    //delete
    router.delete("/:id", controller.deletePost);
  
    return router;
  }