import { Injectable } from '@nestjs/common';

@Injectable()
export class Cpf {
  private static CPF_BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
  ];

  private static CPF_STRICT_STRIP_REGEX = /[.-]/g;

  private static CPF_LOOSE_STRIP_REGEX = /[^\d]/g;

  private static checkDigit(digits: string): number {
    const numbers: number[] = digits.split('').map((number) => {
      return parseInt(number, 10);
    });

    const modulus: number = numbers.length + 1;
    const multiplied: Array<number> = numbers.map((number, index) => number * (modulus - index));
    const mod: number = multiplied.reduce((buffer, number) => buffer + number) % 11;

    return mod < 2 ? 0 : 11 - mod;
  }

  private static cpfStrip(number: string, strict?: boolean): string {
    const regex: RegExp = strict ? this.CPF_STRICT_STRIP_REGEX : this.CPF_LOOSE_STRIP_REGEX;
    return (number || '').replace(regex, '');
  }

  public static format(number: string): string {
    return this.cpfStrip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  public static isValid(number: string, strict?: boolean): boolean {
    const stripped: string = this.cpfStrip(number, strict);

    if (!stripped || stripped.length !== 11 || this.CPF_BLACKLIST.includes(stripped)) return false;

    let numbers: string = stripped.substr(0, 9);
    numbers += this.checkDigit(numbers);
    numbers += this.checkDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  }
}
