import { HashGenerator } from 'src/domain/application/users/hasher/hash-generator'

export class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}