import { Result } from "./Result";



export interface IGuardResult {
  succeeded: boolean;
  message: string
}

export interface IGuardArgument {
  argument: string | number | {} | [];
  argumentName: string
}

export type GuardArgumentCollection = IGuardArgument[];


export class Guard {

  /**
   * Test one argument to verify if it is null or undefined
   * @param argument to be tested 
   * @param argumentName 
   */
  public static againstNullOrUndefined(argument: any, argumentName: string): Result<any> {
    if (argument === null || argument === undefined) {
      return Result.fail([`Must provide: ${argumentName}`]);
    } else {
      return Result.ok(argument);
    }
  }

  /**
   * Receive a collection of guard argument and verify if there is error on them
   * @param args A collection of GuardArguments
   */
  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): Result<any> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isSuccess === false) return result;
    }
    return Result.ok();
  }

  public static optionalInput(value: any, defa: any): any {
    return this.againstNullOrUndefined(value, '').isSuccess ? value : defa;
  }

}