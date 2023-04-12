import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets at a specific city', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'pet-01',
      type: 'cat',
      age: 'adolescent',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'pet-02',
      type: 'cat',
      age: 'adolescent',
      city: 'city-02',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-02',
      photo: 'photo-01',
    })

    const { pets } = await sut.execute({
      city: 'city-01',
      age: null,
      energy: null,
      independence: null,
      size: null,
      type: null,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ city: 'city-01' })])
  })

  it('should be able to search fot cats', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'pet-03',
      type: 'cat',
      age: 'adolescent',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'pet-02',
      type: 'dog',
      age: 'adolescent',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    const { pets } = await sut.execute({
      city: 'city-01',
      age: null,
      energy: null,
      size: null,
      independence: null,
      type: 'cat',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search for pets at a specific city and filters (age, energy)', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'pet-01',
      type: 'cat',
      age: 'adolescent',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'pet-02',
      type: 'cat',
      age: 'elderly',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'pet-03',
      type: 'cat',
      age: 'elderly',
      city: 'city-01',
      description: '',
      energy: 3,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    await petsRepository.create({
      id: 'pet-04',
      name: 'pet-04',
      type: 'cat',
      age: '',
      city: 'city-01',
      description: '',
      energy: 4,
      size: 'small',
      independence: 'medium',
      environment: '',
      org_id: 'org-01',
      photo: 'photo-01',
    })

    const { pets } = await sut.execute({
      city: 'city-01',
      age: 'elderly',
      energy: 4,
      independence: null,
      size: null,
      type: null,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ age: 'elderly' })])
  })
})
