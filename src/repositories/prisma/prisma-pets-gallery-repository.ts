import { PetsGalleryRepository } from '../pets-gallery-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsGalleryRepository implements PetsGalleryRepository {
  async add(data: string[], petId: string) {
    await prisma.petGallery.createMany({
      data: data.map((image) => ({
        image,
        pet_id: petId,
      })),
    })

    return null
  }
}
