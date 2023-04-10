import { PetGallery, Prisma } from '@prisma/client'

export interface PetsGalleryRepository {
  add(data: Prisma.PetGalleryUncheckedCreateInput[]): Promise<PetGallery[]>
}
