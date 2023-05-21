import { Router } from "express";
import { addVideo, getVideos } from "../controllers/video";
import { verifyToken } from "../utils/verify-token";

const videoRouter = Router();

videoRouter.post("/", verifyToken, addVideo);

videoRouter.get("/", getVideos);

export default videoRouter;
