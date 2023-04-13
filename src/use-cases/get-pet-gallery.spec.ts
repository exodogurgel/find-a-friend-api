import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsGalleryRepository } from '@/repositories/in-memory/in-memory-pets-gallery-repository'
import { GetPetGalleryUseCase } from './get-pet-gallery'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsGalleryRepository: InMemoryPetsGalleryRepository
let sut: GetPetGalleryUseCase

describe('Get Pet Gallery Use Case', () => {
  beforeEach(() => {
    petsGalleryRepository = new InMemoryPetsGalleryRepository()
    sut = new GetPetGalleryUseCase(petsGalleryRepository)
  })

  it('should be able to get a specific pet gallery', async () => {
    await petsGalleryRepository.add(['image-01', 'image-02'], 'pet-01')

    const { petGallery } = await sut.execute({ petId: 'pet-01' })

    expect(petGallery).toHaveLength(2)
  })

  it('should not be able to get pet gallery with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
