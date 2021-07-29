import Axios from 'axios'
import { Router } from 'express'
import { dataVari } from './dataVariavesGN' // Variaves de ambiente

const routerCobPix = Router()

routerCobPix.post('/cob/gn', async (req, res) => {
  const accessToken = req.headers.authorization
  let { amount, description } = req.body
  amount = amount / 100
  const dataCob = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: amount.toFixed(2)
    },
    chave: dataVari.keyPixReceb,
    solicitacaoPagador: description
  }
  try {
    const reqGn = Axios.create({
      baseURL: process.env.GN_ENDPOINT,
      httpsAgent: dataVari.agent,
      headers: {
        Authorization: `${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    const cobRes = await reqGn.post('v2/cob/', dataCob)
    return res.status(200).send(cobRes.data)
  } catch (error) {
    return res.status(error.response.status).send(error.response.data)
  }
})

export default routerCobPix
