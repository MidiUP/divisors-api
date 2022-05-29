import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'
import { makeClassifyNumbersController } from '../factories/classify-numbers-factory'

export default (route: Router): void => {
  route.get('/classify-numbers/:number', adapterRouter(makeClassifyNumbersController()))
}
