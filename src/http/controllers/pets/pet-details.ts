import { makePetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petDetails(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = petDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makePetDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
