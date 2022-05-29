import supertest from 'supertest'
import { setupApp } from '../../../src/main/config/app'

const app = setupApp()
const path = '/api/classify-numbers'

describe('tests integration of login', () => {
  test('shold return 400 if number is 0', async () => {
    await supertest(app)
      .get(`${path}/0`)
      .expect(400)
  })

  test('shold return 400 if number is negative', async () => {
    await supertest(app)
      .get(`${path}/-1`)
      .expect(400)
  })

  test('shold return 400 if number is string', async () => {
    await supertest(app)
      .get(`${path}/teste`)
      .expect(400)
  })

  test('shold return 400 if number is not integer', async () => {
    await supertest(app)
      .get(`${path}/1.2`)
      .expect(400)
  })

  test('shold return 200 if number is correct', async () => {
    await supertest(app)
      .get(`${path}/1`)
      .expect(200)
  })
})
