import * as Fs from 'fs'
import Express from 'express'
import * as Path from 'path'
import * as https from 'https'
import * as dotenv from 'dotenv'
import { dbfirebase } from '../../data/firebase'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const dataCred: string = process.env.GN_CLIENT_ID + ':' + process.env.GN_SECRET_ID
const db = dbfirebase

const authenticatedRef = db.collection('authenticated')

const router = Express.Router()

export const routerGetCli = router.get('/con/cli/gn/:cnpjcpf', async (req, res) => {
  const cnpjcpf = req.params

  try {
    const snapshot = await authenticatedRef.where('cnpjcpf', '==', cnpjcpf).get()
    snapshot.forEach(doc => {
      console.log(doc.data)
    })
    res.status(200).send(snapshot.docs)
  } catch (error) {

  }
})

export const dataVari = {
  cert: Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`)),
  agent: new https.Agent({ pfx: Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`)), passphrase: '' }),
  dataCred: process.env.GN_CLIENT_ID + ':' + process.env.GN_SECRET_ID,
  credentials: Buffer.from(dataCred).toString('base64'),
  urlToken: `${process.env.GN_ENDPOINT}/oauth/token`,
  endPoint: process.env.GN_ENDPOINT,
  keyPixReceb: '0e77310e-4c62-4ad3-9bd7-3c9c72344c93'
}
