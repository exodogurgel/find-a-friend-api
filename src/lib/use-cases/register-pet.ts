import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository'
import { PetsGalleryRepository } from '@/repositories/pets-gallery-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  age: string
  city: string
  description: string
  energy: number
  independence: string
  size: string
  type: string
  environment: string
  orgId: string
  adoptionRequirements: string[]
  gallery: string[]
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petsGalleryRepository: PetsGalleryRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    name,
    age,
    city,
    description,
    energy,
    independence,
    size,
    type,
    environment,
    orgId,
    adoptionRequirements,
    gallery,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      city,
      description,
      photo: gallery[0],
      energy,
      independence,
      size,
      type,
      environment,
      org_id: orgId,
    })

    await this.petsGalleryRepository.add(gallery, pet.id)

    await this.adoptionRequirementsRepository.add(adoptionRequirements, pet.id)

    return {
      pet,
    }
  }
}
