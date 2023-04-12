import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetsGalleryRepository } from '@/repositories/prisma/prisma-pets-gallery-repository'
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petsGalleryRepository = new PrismaPetsGalleryRepository()
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    petsGalleryRepository,
    adoptionRequirementsRepository,
  )

  return registerPetUseCase
}
