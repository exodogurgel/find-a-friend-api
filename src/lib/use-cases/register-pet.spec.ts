import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsGalleryRepository } from '@/repositories/in-memory/in-memory-pets-gallery-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requiremets-repository'

let petsRepository: InMemoryPetsRepository
let petsGalleryRepository: InMemoryPetsGalleryRepository
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsGalleryRepository = new InMemoryPetsGalleryRepository()
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new RegisterPetUseCase(
      petsRepository,
      petsGalleryRepository,
      adoptionRequirementsRepository,
    )
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'pet-01',
      type: 'cat',
      age: 'adolescent',
      city: 'caraúbas',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      orgId: 'org-01',
      gallery: ['image-01', 'image-02'],
      adoptionRequirements: ['requirement-01', 'requirement-02'],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
