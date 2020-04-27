/**
 * Google Drive API v3
 * Node.js Quickstart
 * https://developers.google.com/drive/api/v3/quickstart/nodejs
 */

import * as fs from 'fs'
import { google } from 'googleapis'
import * as readline from 'readline'

const TOKEN_PATH = 'token.json'
const SCOPES = ['https://www.googleapis.com/auth/drive']

export function googleAuth() {
  return new Promise((resolve: any, reject: any) => {
    fs.readFile('credentials.json', (err: any, content: any) => {
      if (err) return reject('Error loading client secret file:', err)
      authorize(JSON.parse(content), resolve)
    })
  })
}

function authorize(credentials: any, callback: any) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  fs.readFile(TOKEN_PATH, (err, token: any) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}
