import { FastifyInstance } from 'fastify'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_800, // 5mb
      },
    })

    if (!upload) {
      return reply.code(400).send('No file uploaded')
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.code(400).send('Invalid file format')
    }

    const fileId = randomUUID()
    const extersion = extname(upload.filename)
  })
}
