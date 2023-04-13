import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { registerPet } from '@/utils/test/register-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Gallery (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a specific pet gallery', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    await registerPet(app, token)

    // const response = await request(app.server).get('/pets/gallery/123').send()

    // expect(response.statusCode).toEqual(200)
  })
})
