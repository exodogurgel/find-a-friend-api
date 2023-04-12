import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      passwordConfirm: '123456',
      address: 'example address',
      cep: '11111111',
      whatsappNumber: '11111111111',
    })

    expect(response.status).toEqual(201)
  })
})
