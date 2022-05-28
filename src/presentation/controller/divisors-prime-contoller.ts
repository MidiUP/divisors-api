import { Validation } from '../protocols/validation'
import { badRequest, ok } from '../helpers/helpers-http'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
export class DivisorsPrimeController implements Controller {
  constructor (
    private readonly validator: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = await this.validator.validate(request.body)
    if (error) {
      return badRequest(error)
    }

    return ok({})
  }
}
