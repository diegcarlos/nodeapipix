import * as Express from 'express'
import toKen from './router/apiGN/tokenGN'

const app = Express()

app.use(toKen)

app.listen(3333, () => {
  console.log('running')
})
