import { AdoptionRequirements, Prisma } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  add(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput[],
  ): Promise<AdoptionRequirements[]>
}
