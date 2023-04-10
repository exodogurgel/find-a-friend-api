import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      city: data.city,
      description: data.description,
      photo: data.photo,
      energy: data.energy,
      independence: data.independence,
      size: data.size,
      type: data.type,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
