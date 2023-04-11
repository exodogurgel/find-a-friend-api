import { PetGallery } from '@prisma/client'

export interface PetsGalleryRepository {
  add(data: string[], petId: string): Promise<PetGallery[]>
}
