import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import multer from 'fastify-multer'

import uploadConfig from '@/config/upload'
import { gallery } from './gallery'
import { search } from './search'
const upload = multer(uploadConfig)

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/gallery/:petId', gallery)
  app.get('/pets/:city', search)

  app.post(
    '/pets',
    { onRequest: [verifyJWT], preHandler: upload.array('images', 6) },
    register,
  )
}
