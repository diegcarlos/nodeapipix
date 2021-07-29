import Axios from 'axios'
import { Router } from 'express'
import * as Fs from 'fs'
import * as Path from 'path'
import * as https from 'https'
import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const tokenRouterGn = Router()
tokenRouterGn.post('/token/gn', async (req, res) => {
  try {
    const cert = Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`))
    const agent = new https.Agent({ pfx: cert, passphrase: '' })
    const dataCred: string = process.env.GN_CLIENT_ID + ':' + process.env.GN_SECRET_ID
    const credentials = Buffer.from(dataCred).toString('base64')
    const url = `${process.env.GN_ENDPOINT}/oauth/token`
    const dataType = {
      grant_type: 'client_credentials'
    }
    const options = {
      headers: {
        authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: agent
    }

    const retorno = await Axios.post(url, dataType, options)
    return res.status(200).send(retorno.data)
  } catch (error) {
    return res.status(400).send({ success: false, status: 'error' })
  }
})
export default tokenRouterGn
