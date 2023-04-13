import request from 'supertest'
import path from 'node:path'
import { FastifyInstance } from 'fastify'

export async function registerPet(app: FastifyInstance, token: string) {
  const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .field('id', '123')
    .field('name', 'pet-01')
    .field('age', 'adolescent')
    .field('city', 'city-01')
    .field('description', '')
    .field('energy', 4)
    .field('independence', 'medium')
    .field('size', 'small')
    .field('type', 'cat')
    .field('environment', 'medium')
    .field('adoptionRequirements[0]', 'requirement-01')
    .field('adoptionRequirements[1]', 'requirement-02')
    .attach(
      'images',
      path.resolve(__dirname, '..', '..', '..', 'tmp', 'test.png'),
    )

  return {
    response,
  }
}
