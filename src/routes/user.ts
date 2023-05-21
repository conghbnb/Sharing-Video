import { Router } from "express";
import { test } from "../controllers/user";

const userRouter = Router();

userRouter.get("/test", test);

export default userRouter;
