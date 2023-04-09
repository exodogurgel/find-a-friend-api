import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      cep: '123',
      password_hash: '123456',
      whatsapp_number: '123456789',
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
