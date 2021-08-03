import Express from 'express'
import Multer from 'multer'

import dbFirebase from '../../data/firebase'

const routerCadCli = Express.Router()

const db = dbFirebase

const upload = Multer({ dest: '../../../certs' })

routerCadCli.post('/cad/cli/gn', upload.single('Certificado'), async (req, res) => {
  const { CnpjCpf, clientSecret, clientSecretId } = req.body
  console.log(req.file)
  // Multer({
  //   storage: Multer.diskStorage({
  //     destination: 'uploads/',
  //     filename (req, file, callback) {
  //       const fileName = `${CnpjCpf}-${file.originalname}`

  //       return callback(null, fileName)
  //     }
  //   })
  // })

  const newclient = {
    certificado: req.file?.filename,
    clientId: clientSecretId,
    clientSecret: clientSecret,
    cnpj_cpf: CnpjCpf
  }

  try {
    const docRef = db.collection('users').doc('kYN3EPBL7UG7z6zqPwdG')

    const respDb = await docRef.set(newclient)

    return res.status(200).send(console.log(respDb))
  } catch (error) {
    return res.status(400).send(console.log(error))
  }
})

export default routerCadCli
