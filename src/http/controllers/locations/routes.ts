import { FastifyInstance } from 'fastify'

import { fetchStates } from './fetch-states'

export async function locationRoutes(app: FastifyInstance) {
  app.get('/location/states', fetchStates)
}
