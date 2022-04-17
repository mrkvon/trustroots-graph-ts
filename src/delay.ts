const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))

export default async <T>(time: number, f: Promise<T>): Promise<T> =>
  (await Promise.all([f, delay(time)]))[0]
