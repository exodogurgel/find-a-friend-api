import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    passwordConfirm: '123456',
    address: 'example address',
    cep: '11111111',
    whatsappNumber: '11111111111',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
