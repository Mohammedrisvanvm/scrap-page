import { Router } from "express";
import { scrape } from "../controller/scrap-controller.js";

const router = Router();

router.post("/scrap", scrape);


export default router;