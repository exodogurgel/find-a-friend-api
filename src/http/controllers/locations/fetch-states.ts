import { FetchStatesUseCase } from '@/use-cases/fetch-states'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchStates(
  FastifyRequest: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchStatesUseCase = new FetchStatesUseCase()

  const { states } = await fetchStatesUseCase.execute()

  return reply.status(200).send({
    states,
  })
}
