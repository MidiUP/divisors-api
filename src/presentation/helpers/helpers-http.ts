import { HttpResponse } from './../protocols/http'

export const ok = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const unprocessableEntity = (error: Error): HttpResponse => {
  return {
    statusCode: 422,
    body: error
  }
}
