export class UtilCalculator {
  static calculatorStringNumber(numberString: string) {
    let sum: number = 0;
    for (let i = 0; i < numberString.length; i++) {
      const num = parseInt(numberString[i]);
      if (!isNaN(num)) {
        sum += num;
      }
    }
    return sum;
  }

  static calculatorSkipPage({
    page,
    limit,
  }: {
    page: string;
    limit: string;
  }): number {
    const defaultPage = +page || 1;
    const defaultLimit = +limit || 10;

    return +(defaultPage - 1) * +defaultLimit;
  }
}
