import { serverError } from './../helpers/helpers-http'
import { Validation } from '../protocols/validation'
import { badRequest, ok } from '../helpers/helpers-http'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { ClassifyNumbers } from '../../domain/usecases/classify-numbers'

export class DivisorsPrimeController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly service: ClassifyNumbers
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validator.validate(request.header)
      if (error) {
        return badRequest(error)
      }

      const { number } = request.header

      const divisorsNumbers = this.service.computeDivisors(number)

      const primeNumbers = this.service.computePrimes(divisorsNumbers)

      return ok({ divisorsNumbers, primeNumbers })
    } catch (err) {
      return serverError(err)
    }
  }
}
