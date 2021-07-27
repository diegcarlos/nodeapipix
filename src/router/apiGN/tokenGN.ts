import Axios from 'axios'
import * as Fs from 'fs'
import * as Path from 'path'
import * as https from 'https'
import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const toKen = async () => {
  const cert = Fs.readFileSync(Path.resolve(__dirname, `../../../certs/${process.env.GN_CERT}`))
  const agent = new https.Agent({ pfx: cert, passphrase: '' })
  const dataCred: string = process.env.GN_CLIENT_ID + ':' + process.env.GN_SECRET_ID
  const credentials = Buffer.from(dataCred).toString('base64')
  const url = `${process.env.GN_ENDPOINT}/oauth/token`
  const data = {
    grant_type: 'client_credentials'
  }
  const options = {
    headers: {
      authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    httpsAgent: agent
  }
  const res = await Axios.post(url, data, options)
    .then((res) => { console.log(res.data); return res.data })
    .catch((err) => console.log(err))
  return res.data
}
export default toKen
