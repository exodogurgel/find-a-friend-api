import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindByQueryProps, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findByQuery({
    city,
    age,
    energy,
    independence,
    size,
    type,
  }: FindByQueryProps) {
    let petsFiltered = this.items.filter((item) => item.city === city)

    if (energy) {
      petsFiltered = petsFiltered.filter(
        (item) => Number(item.energy) === Number(energy),
      )
    }

    if (age) {
      petsFiltered = petsFiltered.filter((item) => item.age === age)
    }

    if (independence) {
      petsFiltered = petsFiltered.filter(
        (item) => item.independence === independence,
      )
    }

    if (size) {
      petsFiltered = petsFiltered.filter((item) => item.size === size)
    }

    if (type) {
      petsFiltered = petsFiltered.filter((item) => item.type === type)
    }

    return petsFiltered
  }

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
