import path from 'node:path'

import fastify from 'fastify'
import multer from 'fastify-multer'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '15m',
  },
})

app.register(fastifyCookie)
app.register(multer.contentParser)

app.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', 'tmp', 'uploads'),
  prefix: '/images',
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // -TODO- Here we should log to an external tool like Datadog/NewRelic/Sentry
  }
})
