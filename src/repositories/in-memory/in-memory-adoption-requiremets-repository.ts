import { Prisma, AdoptionRequirements } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = []

  async add(data: Prisma.AdoptionRequirementsUncheckedCreateInput[]) {
    await Promise.all(
      data.map((requirement) => {
        return this.items.push({
          id: requirement.id ?? randomUUID(),
          title: requirement.title,
          pet_id: requirement.pet_id,
        })
      }),
    )

    return this.items
  }
}
