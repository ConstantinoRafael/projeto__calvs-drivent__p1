import { notFoundError, paymentRequired } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-respository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== TicketStatus.PAID) {
    throw paymentRequired();
  }

  if (ticket.TicketType.isRemote === true) {
    throw paymentRequired();
  }

  if (ticket.TicketType.includesHotel === false) {
    throw paymentRequired();
  }

  const hotels = await hotelRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }
  
  return hotels;
}

async function getRooms(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== "PAID") {
    throw paymentRequired();
  }

  if (ticket.TicketType.isRemote === true) {
    throw paymentRequired();
  }

  if (ticket.TicketType.includesHotel === false) {
    throw paymentRequired();
  }

  const hotel = await hotelRepository.findHotelById(hotelId);

  if(!hotel) {
    throw notFoundError();
  }

  return hotel;
}

const hotelService = {
  getHotels,
  getRooms,
};

export default hotelService;
