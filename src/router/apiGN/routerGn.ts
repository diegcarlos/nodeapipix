import Axios from 'axios'
import toKen from './tokenGN'
import { v4 as uuid } from 'uuid'
import * as Fs from 'fs'
import * as Path from 'path'
import * as https from 'https'

const accessToken = toKen().then((res) => { return res.data.access_token })
const cert = Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`))
const agent = new https.Agent({ pfx: cert, passphrase: '' })

const reqGn = Axios.create({
  baseURL: process.env.GN_ENDPOINT,
  httpsAgent: agent,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})

const idunico = uuid()
const gerarTxid = idunico.replace(/-/g, '')

const dataCob = {
  calendario: {
    expiracao: 3600
  },
  valor: {
    original: '00.01'
  },
  chave: '0e77310e-4c62-4ad3-9bd7-3c9c72344c93',
  solicitacaoPagador: 'Teste produção'

}
const cobResponse = reqGn.put(`v2/cob/${gerarTxid}`, dataCob)
  .then((res) => { return res })
  .catch((err) => { console.log(err) })

export default cobResponse
