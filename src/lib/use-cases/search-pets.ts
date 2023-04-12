import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age: string | null
  independence: string | null
  energy: number | null
  size: string | null
  type: string | null
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByQuery(data)

    return {
      pets,
    }
  }
}
