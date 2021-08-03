import { Router } from 'express'
import dbFirebase from '../../data/firebase'

const routerCadCli = Router()

const db = dbFirebase

routerCadCli.post('cad/cli/gn', async (req, res) => {
  const { CnpjCpf, clientSecret, clientSecretId, cert } = req.body

  const newclient = {
    certificado: cert,
    clientId: clientSecretId,
    clientSecret: clientSecret,
    cnpj_cpf: CnpjCpf
  }
  const respDb = await db.ref('authenticated').push(newclient)
  return respDb
})
