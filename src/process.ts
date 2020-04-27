import * as fs from 'fs'
import * as path from 'path'
import { textract } from './utils/ocr'
import * as loading from 'loading-cli'
import { normalize } from './utils/normalize'

const STORAGE_DIR_PATH = 'storage'

export async function process(dirname: string, filename: string) {
  const load = loading(`Extracting text on ${filename}`).start()
  const content = await textract(path.resolve(dirname, filename)).then(normalize)
  load.stop().clear()
  console.log(`> ${content}`)
  if (content.length <= 10) {
    console.log(`> https://jisho.org/search/${encodeURI(content)}`)
  }
  console.log(`------------------------------------`)
}
