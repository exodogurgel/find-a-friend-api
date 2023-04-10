import { Prisma, PetGallery } from '@prisma/client'
import { PetsGalleryRepository } from '../pets-gallery-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsGalleryRepository implements PetsGalleryRepository {
  public items: PetGallery[] = []

  async add(data: Prisma.PetGalleryUncheckedCreateInput[]) {
    await Promise.all(
      data.map((imageGallery) => {
        return this.items.push({
          id: imageGallery.id ?? randomUUID(),
          image: imageGallery.image,
          pet_id: imageGallery.pet_id,
        })
      }),
    )

    return this.items
  }
}
