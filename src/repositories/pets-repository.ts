import { Pet, Prisma } from '@prisma/client'

export interface FindByQueryProps {
  city: string
  age: string | null
  independence: string | null
  energy: number | null
  size: string | null
  type: string | null
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByQuery(data: FindByQueryProps): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
