// adminRouter.ts
import express, { Router } from "express";
import { isActiveRoute } from "./helper";
//import AdminController from "../controller/AdminController"; // Import your AdminController

const adminLayout = "../views/layouts/admin";
// Define admin routes
enum Route {
    Admin = '/admin',
    Account = '/account',
    Notifications = '/notifications',
  }
/**
 * GET /
 * Admin - Login Page
*/
export function adminRouter(): Router {
  const router = express.Router();
  const Admin = {
    title: "Admin",
    description:
      "Admin page for DreamBlogger",
  };
  const Account = {
    title: "Account Panel",
    description: "Manage your account.",
  };

  router.get(Route.Admin, (req, res) => {
    try {
        res.render("admin/login", {
            pageTitle: Admin.title,
            pageDescription: Admin.description,
            layout: adminLayout,
            activeRoute: Admin.title, //parameter for ActiveRoute()
            ActiveRoute: isActiveRoute,
          });    
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
  })
  router.get(Route.Account, (req, res) => {
    try {
        res.render("admin/account", {
            pageTitle: Account.title,
            pageDescription: Account.description,
            layout: adminLayout,
            activeRoute: Account.title, //parameter for ActiveRoute()
            ActiveRoute: isActiveRoute,
          });    
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
  }) 

  return router;
}
