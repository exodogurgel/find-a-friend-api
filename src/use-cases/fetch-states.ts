import { getBrazilStates } from '@/lib/location'

export class FetchStatesUseCase {
  async execute() {
    const states = await getBrazilStates()

    return {
      states,
    }
  }
}
