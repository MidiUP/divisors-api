import { BadRequestError } from '../../src/presentation/errors/bad-request'
import { ClassifyNumbersValidator } from '../../src/validation/Classify-numbers-validator'

interface sutTypes {
  sut: ClassifyNumbersValidator
}

const makeSut = (): sutTypes => {
  const sut = new ClassifyNumbersValidator()
  return {
    sut
  }
}

describe('create music validation tests', () => {
  test('should return error if number is not passed', async () => {
    const { sut } = makeSut()
    const req = {}
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('number is a required field'))
  })

  test('should return error if number is of type string', async () => {
    const { sut } = makeSut()
    const req = {
      number: 'teste'
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('number must be a `number` type, but the final value was: `NaN` (cast from the value `"teste"`).'))
  })

  test('should return error if number is 0', async () => {
    const { sut } = makeSut()
    const req = {
      number: 0
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('number shold be greater than 0'))
  })

  test('should return error if number is negative', async () => {
    const { sut } = makeSut()
    const req = {
      number: -1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('number shold be greater than 0'))
  })

  test('should return error if number is not integer', async () => {
    const { sut } = makeSut()
    const req = {
      number: 1.2
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new BadRequestError('number shold be integer'))
  })
})
