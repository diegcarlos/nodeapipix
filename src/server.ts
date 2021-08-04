import Express from 'express'
import ExpressUpload from 'express-fileupload'
import toKenGn from './router/apiGN/tokenGN'
import routerCobPix from './router/apiGN/cobGn'
import routerGeQrGn from './router/apiGN/cobGeQrPix'
import routerConCobGn from './router/apiGN/conCobGn'
import routerCadCliGn from './router/apiGN/cadCliGn'

const app = Express()

app.use(ExpressUpload())
app.use(Express.json())

/** Api Gerencia Net */
app.use(routerCadCliGn)
app.use(toKenGn)
app.use(routerCobPix)
app.use(routerGeQrGn)
app.use(routerConCobGn)
/**  */

app.listen(3333, () => {
  console.log('running')
})
