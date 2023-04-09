import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      name: 'john doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      cep: '123',
      password: '123456',
      whatsappNumber: '123456789',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
