import { HttpRequest } from '../../../presentation/protocols/http'
import { badRequest, serverError, ok } from '../../../presentation/helpers/helpers-http'
import { MissingParamError } from '../../../presentation/errors/missing-param'
import { Validation } from '../../../presentation/protocols/validation'
import { DivisorsPrimeController } from '../../../presentation/controllers/divisors-prime-controller'
import { ClassifyNumbers } from '../../../domain/usecases/classify-numbers'

interface sutTypes {
  sut: DivisorsPrimeController
  validator: Validation
  service: ClassifyNumbers
}

const makeValidator = (): Validation => {
  class Validator implements Validation {
    async validate (input: any): Promise<Error> {
      return null
    }
  }
  return new Validator()
}

const makeService = (): ClassifyNumbers => {
  const fakeNumbers = [0, 1, 2]
  class Service extends ClassifyNumbers {
    computeDivisors (number: number): number[] {
      return fakeNumbers
    }

    computePrimes (numbers: number[]): number[] {
      return fakeNumbers
    }

    isPrime (number: number): boolean {
      return true
    }
  }
  return new Service()
}

const makeSut = (): sutTypes => {
  const validator = makeValidator()
  const service = makeService()
  const sut = new DivisorsPrimeController(validator, service)
  return {
    sut,
    validator,
    service
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

  test('return server error if service compute divisors return error', async () => {
    const { sut, service } = makeSut()
    jest.spyOn(service, 'computeDivisors').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(req)
    expect(response).toEqual(serverError(new Error()))
  })

  test('return server error if service compute prime numbers return error', async () => {
    const { sut, service } = makeSut()
    jest.spyOn(service, 'computePrimes').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(req)
    expect(response).toEqual(serverError(new Error()))
  })

  test('return ok if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(req)
    const fakeNumbers = [0, 1, 2]
    const expectedResponse = {
      divisorsNumbers: fakeNumbers,
      primeNumbers: fakeNumbers
    }
    expect(response).toEqual(ok(expectedResponse))
  })
})
