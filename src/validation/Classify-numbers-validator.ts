import { Validation } from '../presentation/protocols/validation'
import * as yup from 'yup'
import { BadRequestError } from '../presentation/errors/bad-request'

export class ClassifyNumbersValidator implements Validation {
  private readonly schema = yup.object().shape({
    number: yup.number().integer('number shold be integer').min(1, 'number shold be greater than 0').required()
  })

  async validate (input: any): Promise<Error> {
    return new Promise(resolve => {
      this.schema.validate(input)
        .then(res => {
          resolve(null)
        })
        .catch(err => {
          resolve(new BadRequestError(err.errors))
        })
    })
  }
}
