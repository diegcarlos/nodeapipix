import * as Express from 'express'
import tokenRouterGn from './router/apiGN/tokenGN'

const app = Express()

app.use(tokenRouterGn)

app.listen(3333, () => {
  console.log('running')
})
