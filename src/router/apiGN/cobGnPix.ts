import Axios from 'axios'
import * as Express from 'express'
import { v4 as uuid } from 'uuid'
import * as Fs from 'fs'
import * as Path from 'path'
import * as https from 'https'
const routerCobPix = Express.Router()

const cert = Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`))
const agent = new https.Agent({ pfx: cert, passphrase: '' })
const keyPixRecebedor = '0e77310e-4c62-4ad3-9bd7-3c9c72344c93'

const idunico = uuid()
const gerarTxid = idunico.replace(/-/g, '')

routerCobPix.post('/hash/gn', async (req, res) => {
  const accessToken = req.headers.authorization

  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: '00.01'
    },
    chave: keyPixRecebedor,
    solicitacaoPagador: 'teste'
  }
  try {
    const reqGn = Axios.create({
      baseURL: process.env.GN_ENDPOINT,
      httpsAgent: agent,
      headers: {
        Authorization: `${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    const cobRes = await reqGn.put(`v2/cob/${gerarTxid}`, dataCob)
    return res.status(200).send(cobRes.data)
  } catch (error) {
    return res.status(400).send({ success: false, status: 'error' })
  }
})

export default routerCobPix
