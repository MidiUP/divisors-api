import { ClassifyNumbersService } from '../../../src/domain/services/classify-numbers-service'

interface sutTypes {
  sut: ClassifyNumbersService
}

const makeSut = (): sutTypes => {
  const sut = new ClassifyNumbersService()
  return { sut }
}

describe('ClassifyNumbersService', () => {
  test('shold return [1] if pass 1 as number in computeDivisors', () => {
    const { sut } = makeSut()
    const number = 1
    const responseExpected = [1]
    const response = sut.computeDivisors(number)
    expect(response).toEqual(responseExpected)
  })

  test('shold return [1, 3, 5, 9, 15, 45] if pass 45 as number in computeDivisors', () => {
    const { sut } = makeSut()
    const number = 45
    const responseExpected = [1, 3, 5, 9, 15, 45]
    const response = sut.computeDivisors(number)
    expect(response).toEqual(responseExpected)
  })

  test('shold return true if pass 1 as number in isPrime', () => {
    const { sut } = makeSut()
    const number = 1
    const responseExpected = true
    const response = sut.isPrime(number)
    expect(response).toBe(responseExpected)
  })

  test('shold return true if pass 3 as number in isPrime', () => {
    const { sut } = makeSut()
    const number = 3
    const responseExpected = true
    const response = sut.isPrime(number)
    expect(response).toBe(responseExpected)
  })

  test('shold return false if pass 4 as number in isPrime', () => {
    const { sut } = makeSut()
    const number = 4
    const responseExpected = false
    const response = sut.isPrime(number)
    expect(response).toBe(responseExpected)
  })

  test('shold return [1, 3, 5] if pass [1, 3, 5, 9, 15, 45] as numbers[] in computePrimes', () => {
    const { sut } = makeSut()
    const numbers = [1, 3, 5, 9, 15, 45]
    const responseExpected = [1, 3, 5]
    const response = sut.computePrimes(numbers)
    expect(response).toEqual(responseExpected)
  })

  test('shold return [] if pass [4, 6] as numbers[] in computePrimes', () => {
    const { sut } = makeSut()
    const numbers = [4, 6]
    const responseExpected = []
    const response = sut.computePrimes(numbers)
    expect(response).toEqual(responseExpected)
  })
})
