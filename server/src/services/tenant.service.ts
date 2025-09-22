import { PrismaClient } from "@prisma/client";
import { TenantMessage } from "../utils/tenant.message";

export class TenantService {
  static async list(prisma: PrismaClient) {
    console.log('Devolviendo todos los gimnasios registrados')
    return prisma.tenant.findMany();
  }

  static async create(prisma: PrismaClient, name: string) {
    const exists = await prisma.tenant.findFirst({ where: { name } });

    if (exists) {
      console.error(TenantMessage.alreadyExist)
      throw new Error(TenantMessage.alreadyExist);
    }

    console.log('Creando un gimnasio')

    return prisma.tenant.create({
      data: { name },
    });
  }

  static async getById(prisma: PrismaClient, id: number) {
    console.log('Devolviendo un gimnasio con id: ' + id)

    return await prisma.tenant.findFirst({
      where: {
        id
      }
    })
  }

  static async update(prisma: PrismaClient, id: number, name: string) {
    console.log('Se actualiza un gimnnasio.')

    return prisma.tenant.update({
      where: { id },
      data: { name },
    });
  }

  static async delete(prisma: PrismaClient, id: number) {
    console.log('Se elimina un gimnasio.')
    return prisma.tenant.delete({ where: { id } });
  }
}
