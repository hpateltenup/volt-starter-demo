import type { LoginResponse } from '../types/auth.types'

export function loginApi(): Promise<LoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'john@example.com'
      })
    }, 1500)
  })
}