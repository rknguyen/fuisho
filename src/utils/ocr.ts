import * as fs from 'fs'
import { google } from 'googleapis'
import { googleAuth } from './googleapis'

const TEXT = 'text'
const TEXT_MIMETYPE = `${TEXT}/plain`
const GOOGLE_DOCUMENT_MIMETYPE = 'application/vnd.google-apps.document'

export async function textract(imagePath: string): Promise<any> {
  const auth: any = await googleAuth()
  const drive = google.drive({ version: 'v3', auth })
  const fileExtension: string = imagePath.split('.').pop()
  const fileName: string = `${Date.now().toString()}.${fileExtension}`
  const fileResponse: any = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: GOOGLE_DOCUMENT_MIMETYPE,
    },
    media: {
      mimeType: GOOGLE_DOCUMENT_MIMETYPE,
      body: fs.createReadStream(imagePath),
    },
  })
  const fileId: string = fileResponse.data.id
  const fileContent: any = await drive.files.export(
    { fileId, mimeType: TEXT_MIMETYPE },
    { responseType: TEXT }
  )
  await drive.files.delete({ fileId })
  return fileContent.data
}
