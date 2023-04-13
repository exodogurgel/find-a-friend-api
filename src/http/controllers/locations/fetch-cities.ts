import { FetchCitiesByStateUseCase } from '@/use-cases/fetch-cities-by-state'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchCities(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchCitiesParamsSchema = z.object({
    UF: z.string(),
  })

  const { UF } = fetchCitiesParamsSchema.parse(request.params)

  const fetchCitiesByStateUseCase = new FetchCitiesByStateUseCase()

  const { cities } = await fetchCitiesByStateUseCase.execute({ UF })

  return reply.status(200).send({
    cities,
  })
}
