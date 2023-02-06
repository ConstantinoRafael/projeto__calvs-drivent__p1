import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (e) {
    if (e.name === "PaymenteRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const rooms = await hotelService.getRooms(userId, Number(hotelId));
    
    return res.status(httpStatus.OK).send(rooms);
  } catch (e) {
    if (e.name === "PaymenteRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
