import * as Express from 'express'
import toKenGn from './router/apiGN/tokenGN'
import routerCobPix from './router/apiGN/cobGnPix'
// import touterGeQrGn from './router/apiGN/cobGeQrPix'

const app = Express()

app.use(Express.json())

app.use(toKenGn)
app.use(routerCobPix)
// app.use(touterGeQrGn)

app.listen(3333, () => {
  console.log('running')
})
