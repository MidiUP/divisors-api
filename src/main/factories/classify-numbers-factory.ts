import { ClassifyNumbersService } from './../../domain/services/classify-numbers-service'
import { ClassifyNumbersValidator } from './../../validation/Classify-numbers-validator'
import { ClassifyNumbersController } from './../../presentation/controllers/classify-numbers-controller'
import { Controller } from './../../presentation/protocols/controller'

export const makeClassifyNumbersController = (): Controller => {
  const classifyNumbersValidator = new ClassifyNumbersValidator()
  const classifyNumbersService = new ClassifyNumbersService()
  return new ClassifyNumbersController(classifyNumbersValidator, classifyNumbersService)
}
