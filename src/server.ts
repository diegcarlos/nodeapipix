import * as Express from 'express'
import toKenGn from './router/apiGN/tokenGN'
import routerCobPix from './router/apiGN/cobGnPix'

const app = Express()

app.use(toKenGn)
app.use(routerCobPix)

app.listen(3333, () => {
  console.log('running')
})
