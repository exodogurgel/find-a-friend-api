import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),
  })

  const searchPetsQuerySchema = z.object({
    age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
    energy: z.coerce.number().min(1).max(5).optional(),
    independence: z.enum(['low', 'medium', 'high']).optional(),
    size: z.enum(['small', 'medium', 'big']).optional(),
    type: z.enum(['cat', 'dog']).optional(),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)
  const { age, energy, independence, size, type } = searchPetsQuerySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age: age ?? null,
    energy: energy ?? null,
    independence: independence ?? null,
    size: size ?? null,
    type: type ?? null,
  })

  return reply.status(200).send({
    pets,
  })
}
