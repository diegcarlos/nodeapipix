import Axios from 'axios'
import { Router } from 'express'
import { dataVari } from './dataVariavesGN'

const tokenRouterGn = Router()
tokenRouterGn.post('/token/gn', async (req, res) => {
  try {
    const dataType = {
      grant_type: 'client_credentials'
    }
    const options = {
      headers: {
        authorization: `Basic ${dataVari.credentials}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: dataVari.agent
    }

    const retorno = await Axios.post(dataVari.urlToken, dataType, options)
    return res.status(200).send(retorno.data)
  } catch (error) {
    return res.status(error.response.status).send(error.response.data)
  }
})
export default tokenRouterGn
