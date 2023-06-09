import { Prisma } from '@prisma/client'
import { FindByQueryProps, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
            cep: true,
            whatsapp_number: true,
            created_at: true,
          },
        },
        petGallery: {
          select: {
            id: true,
            image: true,
          },
        },
        adoptionRequirements: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return pet
  }

  async findManyByQuery({
    city,
    age,
    energy,
    independence,
    size,
    type,
  }: FindByQueryProps) {
    const query: any = {
      city: {
        contains: city,
      },
    }

    if (age !== null) {
      query.age = age
    }

    if (energy !== null) {
      query.energy = energy
    }

    if (independence !== null) {
      query.independence = independence
    }

    if (size !== null) {
      query.size = size
    }

    if (type !== null) {
      query.type = type
    }
    const pets = await prisma.pet.findMany({
      where: {
        ...query,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
