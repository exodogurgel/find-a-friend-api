import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

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
      password_hash: await hash('123456', 6),
      whatsapp_number: '123456789',
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      cep: '123',
      password_hash: await hash('123456', 6),
      whatsapp_number: '123456789',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
