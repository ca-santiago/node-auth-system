import { Result } from "../core/Result";



export class ChangeHandler {

  results: Result<any>[];
  errors: Result<any>[];

  constructor() {
    this.results = [];
    this.errors = [];
  }

  public clean(): void {
    this.results = [];
  }

  public addChange(r: Result<any>) {
    this.results.push(r);
    if (r.isSuccess === false)
      this.errors.push(r)
  }

  public getCombinedResult(): Result<any> {
    return Result.combine(this.results)
  }

  public getErrors(): Result<any>[] {
    return this.errors;
  }

  public existError(): Boolean {
    return this.errors.length > 0;
  }
}