import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const createPet = await petsRepository.create({
      id: 'pet-01',
      name: 'pet-01',
      type: 'cat',
      age: 'adolescent',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    const { pet } = await sut.execute({ petId: createPet.id })

    expect(pet.name).toEqual('pet-01')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
