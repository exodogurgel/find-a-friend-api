import { PetGallery } from '@prisma/client'
import { PetsGalleryRepository } from '../pets-gallery-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsGalleryRepository implements PetsGalleryRepository {
  public items: PetGallery[] = []

  async add(data: string[], petId: string) {
    await Promise.all(
      data.map((imageGallery) => {
        return this.items.push({
          id: randomUUID(),
          image: imageGallery,
          pet_id: petId,
        })
      }),
    )

    return this.items
  }
}
