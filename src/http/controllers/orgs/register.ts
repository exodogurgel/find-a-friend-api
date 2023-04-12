import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      passwordConfirm: z.string(),
      address: z.string(),
      cep: z.string(),
      whatsappNumber: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match.",
      path: ['passwordConfirm'],
    })

  const { name, email, password, address, cep, whatsappNumber } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      whatsappNumber,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
