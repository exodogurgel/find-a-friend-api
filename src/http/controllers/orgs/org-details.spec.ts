import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Org Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org details', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const orgDetailsResponse = await request(app.server)
      .get('/orgs/details')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(orgDetailsResponse.status).toEqual(200)
    expect(orgDetailsResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
