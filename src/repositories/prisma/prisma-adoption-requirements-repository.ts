import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async add(data: string[], petId: string) {
    await prisma.adoptionRequirements.createMany({
      data: data.map((requirement) => ({
        title: requirement,
        pet_id: petId,
      })),
    })

    return null
  }
}
