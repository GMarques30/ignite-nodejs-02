import { UseCaseError } from 'src/core/errors/use-case-error'

export class NotFoundError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`"${identifier}" not found.`)
  }
}
