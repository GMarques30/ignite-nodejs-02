import { UseCaseError } from 'src/core/errors/use-case-error'

export class UnauthorizedError extends Error implements UseCaseError {
  constructor() {
    super('Unauthorized')
  }
}
