import { getBrazilCitiesByState } from '@/lib/location'
import { InvalidUFInitialsError } from './errors/invalid-UF-initials-error'

interface FetchCitiesByStateUseCaseRequest {
  UF: string
}

export class FetchCitiesByStateUseCase {
  async execute({ UF }: FetchCitiesByStateUseCaseRequest) {
    const cities = await getBrazilCitiesByState(UF)

    if (!cities) {
      throw new InvalidUFInitialsError()
    }

    return {
      cities,
    }
  }
}
