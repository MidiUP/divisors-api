import { ComputePrimes } from './../protocols/compute-primes'
import { ComputeDivisors } from './../protocols/compute-divisors'

export abstract class ClassifyNumbers implements ComputeDivisors, ComputePrimes {
  computeDivisors (number: number): number[] {
    const divisibleNumbersArray: number[] = [1]

    if (number === 1) {
      return divisibleNumbersArray
    }

    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        divisibleNumbersArray.push(i)
      }
    }

    divisibleNumbersArray.push(number)
    return divisibleNumbersArray
  }

  computePrimes (numbers: number[]): number[] {
    return numbers.filter(number => this.isPrime(number))
  }

  isPrime (number: number): boolean {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return false
      }
    }
    return true
  }
}
