import { PrismaPetsGalleryRepository } from '@/repositories/prisma/prisma-pets-gallery-repository'
import { GetPetGalleryUseCase } from '../get-pet-gallery'

export function makeGetPetGalleryUseCase() {
  const pestGalleryRepository = new PrismaPetsGalleryRepository()
  const getPetGalleryUseCase = new GetPetGalleryUseCase(pestGalleryRepository)

  return getPetGalleryUseCase
}
