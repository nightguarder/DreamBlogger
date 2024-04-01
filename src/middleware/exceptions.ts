import { Request, Response, NextFunction } from "express";

//Error exception Middleware
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const statusCode = err?.statusCode || 500;
  //404
  
  if (statusCode === 404) {
    return res.status(statusCode).render("layouts/error", {
      pageTitle: "Error",
      pageDescription: "Sorry, Page Not Found",
    });
  }
  res.status(statusCode).json({
    message: err.message || "An unknown error occurred",
    status: statusCode,
    stack: process.env.ENV === "development" ? err.stack : undefined,
  });
}

