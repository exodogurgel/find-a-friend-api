import { makeGetOrgDetailsUseCase } from '@/use-cases/factories/make-get-org-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function orgDetails(request: FastifyRequest, reply: FastifyReply) {
  const getOrgDetailsUseCase = makeGetOrgDetailsUseCase()

  const { org } = await getOrgDetailsUseCase.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
