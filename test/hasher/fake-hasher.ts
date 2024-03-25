import { HashGenerator } from 'src/domain/users/application/hasher/hash-generator'

export class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
