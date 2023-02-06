
import { getHotels, getRooms } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken);
hotelsRouter.get("", getHotels);
hotelsRouter.get("/:hotelId", getRooms);

export { hotelsRouter };
