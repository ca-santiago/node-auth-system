
export class Result<T>{
  public isSuccess: boolean;
  public error: string[];
  private _value?: T;


  public constructor(isSuccess: boolean, error: string[], value?: T) {
    if (isSuccess && error.length > 0) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && error.length < 1) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this._value) {
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    }
    return this._value;
  }

  public errorValue(): string[] {
    return this.error ? this.error : [];
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, [], value);
  }

  public static fail<U>(error: string[]): Result<U> {
    return new Result<U>(false, error);
  }


  public static combine(results: Result<any>[]): Result<any> {
    const errors: string[] = [];
    results.forEach(result => {
      if (result.isSuccess === false) {
        errors.push(result.error[0])
      }
    })

    return errors.length > 0 ? Result.fail(errors) : Result.ok();
  }

}
