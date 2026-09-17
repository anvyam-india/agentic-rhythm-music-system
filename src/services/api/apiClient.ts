const delay = (ms = 280): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export async function mockRequest<T>(data: T, ms = 280): Promise<T> {
  await delay(ms)
  return data
}

export class MockApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MockApiError'
  }
}
