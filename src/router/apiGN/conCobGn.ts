import Axios from 'axios'
import { Router } from 'express'
import { dataVari } from './dataVariavesGN'

const ConCob = Router()

ConCob.get('/con/gn/:txid', async (req, res) => {
  const accessToken = req.headers.authorization
  const { txid } = req.params

  const dataType = {
  }
  const reqGn = Axios.create({
    baseURL: dataVari.endPoint,
    httpsAgent: dataVari.agent,
    headers: {
      Authorization: `${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  try {
    const cobRes = await reqGn.get(`/v2/cob/${txid}`, dataType)
    return res.status(200).send(cobRes.data)
  } catch (error) {
    return res.status(error.response.status).send(error.response.data)
  }
})

export default ConCob
