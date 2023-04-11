import { AdoptionRequirements } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = []

  async add(data: string[], petId: string) {
    await Promise.all(
      data.map((requirement) => {
        return this.items.push({
          id: randomUUID(),
          title: requirement,
          pet_id: petId,
        })
      }),
    )

    return this.items
  }
}
