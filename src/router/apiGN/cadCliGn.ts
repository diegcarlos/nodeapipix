import Express from 'express'

import { dbfirebase, storagefirebase } from '../../data/firebase'

const routerCadCli = Express.Router()
const db = dbfirebase

routerCadCli.post('/cad/cli/gn', async (req, res) => {
  const file = req.files?.certFile
  const { cnpjcpf, clientSecret, clientSecretId, cert } = req.body

  await storagefirebase
    .ref()
    .child(`certificate/${cnpjcpf}.p12`)
    .put(file?.data)

  const newclient = {
    certificate: cert,
    clientId: clientSecretId,
    clientSecret: clientSecret,
    cnpjcpf: cnpjcpf
  }

  try {
    const docRef = db.collection('authenticated')

    const respdb = await docRef.add(newclient)

    return res.status(200).send(respdb)
  } catch (error) {
    return res.status(400).send(console.log(error))
  }
})

export default routerCadCli
