

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T> {

  get raw(): T {
    return Object.freeze(this.props)
  }

  public readonly props: T;

  constructor(props: T) {
    this.props = props;
  }


  public equals(vo: ValueObject<T>): boolean {
    if (vo.props === undefined || vo.props === null) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}