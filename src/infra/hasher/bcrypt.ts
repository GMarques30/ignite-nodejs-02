import { HashGenerator } from 'src/domain/application/users/hasher/hash-generator'
import { hash } from 'bcryptjs'

export class BCrypt implements HashGenerator {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
