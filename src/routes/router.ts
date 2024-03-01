import express, { Router } from "express";

import { PostController } from "../controller/PostController";

//Pro pouziti vytvor instanci v main.ts..

export function appRouter(): Router {
  const router = express.Router();
  const Home = {
    title: "DreamBlogger",
    description:
      "A Full-stack Web Application to share your Aspirations with others.",
  };
  const Post = {
    title: "Blog Posts",
    description: "Read inspiring blog posts from others.",
  };

  const Contact = {
    title: "Contact Page",
    description: "Reach out to contact page",
  };
  //Homepage
  router.get("", (req, res) => {
    res.render("pages/index", {
      pageTitle: Home.title,
      pageDescription: Home.description,
    });
  });
  router.get("/posts", (req, res) => {
    res.render("pages/posts", {
      pageTitle: Post.title,
      pageDescription: Post.description,
    });
  });
  router.get("/contact", (req, res) => {
    res.render("pages/contact", {
      pageTitle: Contact.title,
      pageDescription: Contact.description,
    });
  });

  return router;
}

export function createRouter(controller: PostController) {
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
