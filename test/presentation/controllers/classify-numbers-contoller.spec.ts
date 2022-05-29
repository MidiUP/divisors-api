import { HttpRequest } from '../../../src/presentation/protocols/http'
import { badRequest, serverError, ok } from '../../../src/presentation/helpers/helpers-http'
import { MissingParamError } from '../../../src/presentation/errors/missing-param'
import { Validation } from '../../../src/presentation/protocols/validation'
import { ClassifyNumbersController } from '../../../src/presentation/controllers/classify-numbers-controller'
import { ClassifyNumbers } from '../../../src/domain/usecases/classify-numbers'

interface sutTypes {
  sut: ClassifyNumbersController
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
  const sut = new ClassifyNumbersController(validator, service)
  return {
    sut,
    validator,
    service
  }
}

const req: HttpRequest = {
  header: {
    number: 1
  },
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

  test('service compute divisors shold be called with correct params', async () => {
    const { sut, service } = makeSut()
    const spyService = jest.spyOn(service, 'computeDivisors')
    await sut.handle(req)
    expect(spyService).toHaveBeenCalledWith(1)
  })

  test('return server error if service compute prime numbers return error', async () => {
    const { sut, service } = makeSut()
    jest.spyOn(service, 'computePrimes').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(req)
    expect(response).toEqual(serverError(new Error()))
  })

  test('service compute prime numbers shold be called with correct params', async () => {
    const { sut, service } = makeSut()
    const spyService = jest.spyOn(service, 'computePrimes')
    await sut.handle(req)
    expect(spyService).toHaveBeenCalledWith([0, 1, 2])
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
