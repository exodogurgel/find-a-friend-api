import { makeGetPetGalleryUseCase } from '@/use-cases/factories/make-get-pet-gallery-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function gallery(request: FastifyRequest, reply: FastifyReply) {
  const galleryParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = galleryParamsSchema.parse(request.params)

  const getPetGalleryUseCase = makeGetPetGalleryUseCase()

  const { petGallery } = await getPetGalleryUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    petGallery,
  })
}
