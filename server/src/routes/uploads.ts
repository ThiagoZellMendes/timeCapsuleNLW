import { FastifyInstance } from 'fastify'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'

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

    const fileName = fileId.concat(extersion)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}
