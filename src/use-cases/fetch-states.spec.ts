import { beforeEach, describe, expect, it } from 'vitest'
import { FetchStatesUseCase } from './fetch-states'

let sut: FetchStatesUseCase

describe('Fetch States Use Case', () => {
  beforeEach(() => {
    sut = new FetchStatesUseCase()
  })

  it('should be able to fetch states in Brazil', async () => {
    const { states } = await sut.execute()
    console.log(states.length)

    expect(states).toHaveLength(27)
  })
})
