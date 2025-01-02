import { ETime } from 'src/enums/common';
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

  static convertTimeToMilisecond({
    typeTime,
    value,
  }: {
    typeTime: ETime;
    value: number;
  }): number {
    switch (typeTime) {
      case ETime.SECOND:
        return value * 1000;
      case ETime.MINUTE:
        return value * 1000 * 60;
      case ETime.HOUR:
        return value * 1000 * 60 * 60;
      case ETime.DAY:
        return value * 1000 * 60 * 60 * 24;
      default:
        throw new Error('Invalid time type');
    }
  }
}
