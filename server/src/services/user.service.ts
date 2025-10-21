import { PrismaClient } from "@prisma/client";
import { TenantMessage } from "../utils/tenant.message";
import {CreateUserRequest} from "../requests";

export class UserService {
  static async list(prisma: PrismaClient) {
    console.log('Devolviendo todos los usuarios registrados')
    return prisma.tenantUser.findMany();
  }

  static async create(prisma: PrismaClient, spec: CreateUserRequest) {
    const exists = await prisma.tenantUser.findUnique({
        where: {
            email: spec.email
        }
    });

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
