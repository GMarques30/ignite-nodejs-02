import { UseCaseError } from '../use-case-error'

export class RequiredFieldsError extends Error implements UseCaseError {
  constructor() {
    super('Required fields')
  }
}
