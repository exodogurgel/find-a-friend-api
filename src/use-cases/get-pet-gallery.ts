import { env } from '@/env'
import { PetsGalleryRepository } from '@/repositories/pets-gallery-repository'
import { PetGallery } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface GetPetGalleryUseCaseRequest {
  petId: string
}

interface GetPetGalleryUseCaseResponse {
  petGallery: PetGallery[]
}

export class GetPetGalleryUseCase {
  constructor(private petsGalleryRepository: PetsGalleryRepository) {}

  async execute({
    petId,
  }: GetPetGalleryUseCaseRequest): Promise<GetPetGalleryUseCaseResponse> {
    const petGallery = await this.petsGalleryRepository.findManyById(petId)

    if (petGallery.length === 0) {
      throw new PetNotFoundError()
    }

    return {
      petGallery: petGallery.map((gallery) => ({
        ...gallery,
        image: `${env.APP_URL}/images/${gallery.image}`,
      })),
    }
  }
}
