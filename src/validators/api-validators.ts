import SuperExpressive from 'super-expressive';
import { BadRequest } from '../httpError/httpError';

export class ApiValidator {
  private value: any;
  private isValid: boolean = true;
  private validationMessage: string = '';

  constructor(value: any) {
    this.value = value;
  }

  public isValueAbsent(text: string): this {
    return this._setValidationState(
      this.value === undefined ||
        this.value === null ||
        String(this.value) === '',
      text,
    );
  }

  public isNotANumber(text: string): this {
    return this._setValidationState(
      SuperExpressive().nonDigit.toRegex().test(this.value) === true ||
        this.value.toString() === '',
      text,
    );
  }

  public isNotValidString(text: string): this {
    return this._setValidationState(
      SuperExpressive().nonWord.toRegex().test(this.value) === true,
      text,
    );
  }

  public isNotLongEnough(text: string, length: number): this {
    return this._setValidationState(
      this.value.length < length,
      text + ' ' + length.toString(),
    );
  }

  public isTooLong(text: string, length: number): this {
    return this._setValidationState(
      this.value.toString().length > length,
      text + ' ' + length.toString(),
    );
  }

  public isAboveBigInt(text: string): this {
    return this._setValidationState(
      Number(this.value) > 999999999999999999,
      text,
    );
  }

  private _setValidationState(expression: boolean, message: string) {
    if (!this.isValid) {
      return this;
    }
    if (expression) {
      throw new BadRequest(message);
    }
    return this;
  }
}
