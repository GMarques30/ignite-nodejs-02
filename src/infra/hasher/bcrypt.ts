import { hash } from 'bcryptjs'
import { HashGenerator } from 'src/domain/users/application/hasher/hash-generator'

export class BCrypt implements HashGenerator {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
