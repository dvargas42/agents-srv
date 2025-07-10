import type { FastifyReply, FastifyRequest } from 'fastify'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connections.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async (_: FastifyRequest, reply: FastifyReply) => {
    const result = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
      })
      .from(schema.rooms)
      .orderBy(schema.rooms.createdAt)
    reply.status(200).send({
      result,
    })
  })
}
