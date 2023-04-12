import { beforeEach, describe, expect, it } from 'vitest'
import { FetchCitiesByStateUseCase } from './fetch-cities-by-state'
import { AxiosError } from 'axios'

let sut: FetchCitiesByStateUseCase

describe('Fetch Cities By State Use Case', () => {
  beforeEach(() => {
    sut = new FetchCitiesByStateUseCase()
  })

  it('should be able to fetch cities by state in Brazil', async () => {
    const { cities } = await sut.execute({ UF: 'RN' })

    expect(cities).toHaveLength(167)
  })

  it('should not be able to fetch cities by state with wrong UF', async () => {
    await expect(() => sut.execute({ UF: 'RRR' })).rejects.toBeInstanceOf(
      AxiosError,
    )
  })
})
