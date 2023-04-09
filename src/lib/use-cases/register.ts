import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  whatsappNumber: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    cep,
    whatsappNumber,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash: password,
      address,
      cep,
      whatsapp_number: whatsappNumber,
    })

    return {
      org,
    }
  }
}
