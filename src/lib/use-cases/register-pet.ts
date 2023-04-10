import { PetsRepository } from '@/repositories/pets-repository'
import { AdoptionRequirements, Pet, PetGallery } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  age: string
  city: string
  description: string
  photo: string
  energy: number
  independence: string
  size: string
  type: string
  environment: string
  orgId: string
  AdoptionRequirements: AdoptionRequirements[]
  gallery: PetGallery[]
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    city,
    description,
    photo,
    energy,
    independence,
    size,
    type,
    environment,
    orgId,
    AdoptionRequirements,
    gallery,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      city,
      description,
      photo,
      energy,
      independence,
      size,
      type,
      environment,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
