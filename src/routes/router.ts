import express, { Router } from "express";

import { PostController } from "../controller/PostController";
import { isActiveRoute } from "./helper";
import errorHandler from "../middleware/exceptions";

//Pro pouziti vytvor instanci v main.ts..

enum Route {
  Home = '/',
  Blog = '/blog',
  About = '/about',
  Contact = '/contact',
  Account = '/account',

}

export function ActiveRoute(route: Route, activeRoute: Route): string {
  return route === activeRoute ? 'active' : '';
}
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
    description: "Reach out to us!",
  };

  const About = {
    title: "About Page",
    description: "Learn more about us.",
  };

  const Account = {
    title: "Account Panel",
    description: "Manage your account.",
  };
  //Homepage
  router.get("", (req, res) => {
    res.render("pages/index", {
      pageTitle: Home.title,
      pageDescription: Home.description,
      activeRoute: Route.Home, //parameter for ActiveRoute()
      ActiveRoute: ActiveRoute //Maybe implement middleware to pass this in each request? 
    });
  });

  //Posts
  router.get(Route.Blog, (req, res) => {
    res.render("pages/posts", {
      pageTitle: Post.title,
      pageDescription: Post.description,
      activeRoute: Route.Blog,
      ActiveRoute: ActiveRoute
    });
  });

  //Contact
  router.get(Route.Contact, (req, res) => {
    res.render("pages/contact", {
      pageTitle: Contact.title,
      pageDescription: Contact.description,
      activeRoute: Route.Contact,
      ActiveRoute: ActiveRoute
    });
  });
  //Account
  router.get(Route.Account, (req, res) => {
    res.render("pages/Account", {
      pageTitle: Account.title,
      pageDescription: Account.description,
      activeRoute: Route.Account,
      ActiveRoute: ActiveRoute
    });
  });
  //About
  router.get(Route.About, (req, res) => {
    res.render("pages/about", {
      pageTitle: About.title,
      pageDescription: About.description,
      activeRoute: Route.About,
      ActiveRoute: ActiveRoute
    })
  })
  //Handle errors
  router.use(errorHandler);
  //Health check
  router.get("/api/status", (req, res) => {
    res.send("OK");
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
