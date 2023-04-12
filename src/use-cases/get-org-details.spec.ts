import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOrgDetailsUseCase } from './get-org-details'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgDetailsUseCase

describe('Get Org Details Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgDetailsUseCase(orgsRepository)
  })

  it('should be able to get org details', async () => {
    const createOrg = await orgsRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      cep: '123',
      password_hash: await hash('123456', 6),
      whatsapp_number: '123456789',
    })

    const { org } = await sut.execute({ orgId: createOrg.id })

    expect(org.name).toEqual('john doe')
  })

  it('should not be able to get org details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
