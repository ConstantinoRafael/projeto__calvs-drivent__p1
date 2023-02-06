import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.datatype.string(),
      image: faker.datatype.string(),
    },
  });
}

export async function createRooms(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.string(),
      capacity: faker.datatype.number(),
      hotelId,
    },
  });
}
