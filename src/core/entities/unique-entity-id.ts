import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private _value: string

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }

  toString() {
    return this._value
  }
}
