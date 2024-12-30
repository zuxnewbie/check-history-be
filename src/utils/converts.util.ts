import { IQueries } from 'src/interfaces/common';

export class UtilConverts {
  static convertBinaryToDecimal(numberStringBinary: string): number {
    return parseInt(numberStringBinary, 2);
  }

  static convertStringToBoolean(val: string): boolean {
    if (!val) return false;
    if (val.toLowerCase() === 'true') return true;
    return false;
  }

  static convertCondition<T>(queries: IQueries) {
    let isDeleted = false;
    if (
      queries.isDeleted &&
      queries.isDeleted.toString().toLowerCase() === 'true'
    ) {
      isDeleted = true;
    }
    const condition: Record<keyof T | any, string | boolean> = {
      isDeleted,
    };
    if (queries.searchBy) {
      condition[queries.searchBy] = queries.searchVal;
    }
    return condition;
  }
}
