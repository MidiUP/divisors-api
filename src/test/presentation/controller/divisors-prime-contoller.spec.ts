import { HttpRequest } from '../../../presentation/protocols/http'
import { badRequest } from './../../../presentation/helpers/helpers-http'
import { MissingParamError } from './../../../presentation/errors/missing-param'
import { Validation } from './../../../presentation/protocols/validation'
import { DivisorsPrimeController } from './../../../presentation/controller/divisors-prime-contoller'

interface sutTypes {
  sut: DivisorsPrimeController
  validator: Validation
}

const makeValidator = (): Validation => {
  class Validator implements Validation {
    async validate (input: any): Promise<Error> {
      return null
    }
  }
  return new Validator()
}

const makeSut = (): sutTypes => {
  const validator = makeValidator()
  const sut = new DivisorsPrimeController(validator)
  return {
    sut,
    validator
  }
}

const req: HttpRequest = {
  header: {},
  body: {}
}

describe('DivisorsPrime Controller', () => {
  test('return bad request if validator return error', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValueOnce(new Promise(resolve => resolve(new MissingParamError('any'))))
    const response = await sut.handle(req)
    expect(response).toEqual(badRequest(new MissingParamError('any')))
  })
})
