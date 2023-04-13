import { DiskStorage } from '@/providers/disk-storage'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.enum(['cub', 'adolescent', 'elderly']),
    city: z.string(),
    description: z.string(),
    energy: z.coerce
      .number()
      .min(1, { message: 'minimum allowed is 1.' })
      .max(5, { message: 'maximum allowed is 5.' }),
    independence: z.enum(['low', 'medium', 'high']),
    size: z.enum(['small', 'medium', 'big']),
    type: z.enum(['cat', 'dog']),
    environment: z.enum(['small', 'medium', 'big']),
    adoptionRequirements: z.array(z.string()),
  })

  const {
    name,
    age,
    city,
    description,
    energy,
    independence,
    size,
    type,
    environment,
    adoptionRequirements,
  } = registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()
    const diskStorage = new DiskStorage()

    const images = request.files

    const gallery = images.map((image) => image.filename!)

    if (gallery.length > 0) {
      for await (const image of gallery) {
        await diskStorage.saveFile(image)
      }
    }

    await registerPetUseCase.execute({
      name,
      age,
      city,
      description,
      energy,
      independence,
      size,
      photo: images[0].filename!,
      type,
      environment,
      gallery,
      adoptionRequirements,
      orgId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
