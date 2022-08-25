import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { body } from "express-validator";

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout); //delete refresh token from db
router.get("/activate/:link", userController.activate); //activation via mail
router.get("/refresh", userController.refresh); //refresh access token
router.get("/users", userController.getUsers); //get users

export default router;
