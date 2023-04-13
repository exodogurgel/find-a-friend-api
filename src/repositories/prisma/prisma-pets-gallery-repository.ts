import { PetsGalleryRepository } from '../pets-gallery-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsGalleryRepository implements PetsGalleryRepository {
  async findManyById(id: string) {
    const gallery = await prisma.petGallery.findMany({
      where: {
        pet_id: id,
      },
    })

    return gallery
  }

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
