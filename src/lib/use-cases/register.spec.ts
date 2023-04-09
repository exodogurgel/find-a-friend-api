import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

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

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'john doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      cep: '123',
      password: '123456',
      whatsappNumber: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'john doe',
      email,
      address: '123 Main St',
      cep: '123',
      password: '123456',
      whatsappNumber: '123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'john doe',
        email,
        address: '123 Main St',
        cep: '123',
        password: '123456',
        whatsappNumber: '123456789',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
