import * as fs from 'fs'
import * as path from 'path'
import { process } from './process'
import { fileExtension } from './utils/file'

const SCREENSHOTS_DIR: string = '/Users/rk/Desktop'
const FUISHO_ASCII_ART = `
█████▒█    ██  ██▓  ██████  ██░ ██  ▒█████  
▓██   ▒ ██  ▓██▒▓██▒▒██    ▒ ▓██░ ██▒▒██▒  ██▒
▒████ ░▓██  ▒██░▒██▒░ ▓██▄   ▒██▀▀██░▒██░  ██▒
░▓█▒  ░▓▓█  ░██░░██░  ▒   ██▒░▓█ ░██ ▒██   ██░
░▒█░   ▒▒█████▓ ░██░▒██████▒▒░▓█▒░██▓░ ████▓▒░
▒ ░   ░▒▓▒ ▒ ▒ ░▓  ▒ ▒▓▒ ▒ ░ ▒ ░░▒░▒░ ▒░▒░▒░ 
░     ░░▒░ ░ ░  ▒ ░░ ░▒  ░ ░ ▒ ░▒░ ░  ░ ▒ ▒░ 
░ ░    ░░░ ░ ░  ▒ ░░  ░  ░   ░  ░░ ░░ ░ ░ ▒  
        ░      ░        ░   ░  ░  ░    ░ ░  
                                            
                (•́⌄•́๑)૭✧
        〜ふいしょは走っています〜
`

console.log(FUISHO_ASCII_ART)
fs.watch(SCREENSHOTS_DIR, async (eventType: string, filename: string) => {
  if (
    eventType === 'rename' &&
    !filename.startsWith('.') &&
    fileExtension(filename) === 'png'
  ) {
    // check whether image was created or deleted
    if (fs.existsSync(path.resolve(SCREENSHOTS_DIR, filename))) {
      process(SCREENSHOTS_DIR, filename)
    }
  }
})
