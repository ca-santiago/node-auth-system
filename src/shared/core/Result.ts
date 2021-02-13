
	
export class Result<T> {

	public readonly errors: string[];
  public readonly value: T;

  get isSuccess(): boolean {
    return !(this.errors.length > 0);
  }

	constructor(errors: string[], value?: T){
		this.errors = errors;
		this.value = value;
	}
	
	public getValue(): T {
		if(!this.value)
		  throw new Error('Cannot get value form error Result');
		return this.value;
	}
	
  public static ok<U>(value: U): Result<U> {
    return new Result<U>([], value);
  }

  public static fail<U>(error: string[]): Result<U> {
    return new Result<U>(error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    const errors: string[] = [];
    results.forEach((result) => {
      if (result.isSuccess === false) {
        errors.push(...result.errors);
      }
    });
    
    return errors.length > 0 ? Result.fail(errors) : Result.ok(undefined);
  }
}
