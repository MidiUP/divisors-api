import { ComputeDivisors } from '../protocols/compute-divisors'

export class DivisorsPrimeService implements ComputeDivisors {
  computeDivisorsPrimes: (numbers: number[]) => number[]
  computeDivisors: (number: number) => number[]
}
