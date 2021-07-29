import Axios from 'axios'
import * as Express from 'express'
import * as Fs from 'fs'
import * as Path from 'path'
import * as https from 'https'
const routerCobPix = Express.Router()

const cert = Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`))
const agent = new https.Agent({ pfx: cert, passphrase: '' })
const keyPixRecebedor = '0e77310e-4c62-4ad3-9bd7-3c9c72344c93'

routerCobPix.post('/hash/gn', async (req, res) => {
  const accessToken = req.headers.authorization
  let { amount, description } = req.body
  amount = amount / 100
  console.log(amount)
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: amount.toFixed(2)
    },
    chave: keyPixRecebedor,
    solicitacaoPagador: description
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

    const cobRes = await reqGn.post('v2/cob/', dataCob)
    return res.status(200).send(cobRes.data)
  } catch (error) {
    console.log(error.response.status)
    return res.status(error.response.status).send(error.response.data)
  }
})

export default routerCobPix
