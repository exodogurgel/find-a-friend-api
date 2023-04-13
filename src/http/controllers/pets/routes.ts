import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import multer from 'fastify-multer'

import uploadConfig from '@/config/upload'
const upload = multer(uploadConfig)

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', { preHandler: upload.array('images', 6) }, register)
}
