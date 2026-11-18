import type { Fraction } from './Fraction';
import type { Matrix } from './Matrix';

export interface IOperation {
  transform(matrix: Matrix): Matrix;
  getOperationLatex(): string;
}

export class SwapColumnOperation implements IOperation {
  public column1: number;
  public column2: number;

  constructor(column1: number, column2: number) {
    this.column1 = column1;
    this.column2 = column2;
  }

  transform(matrix: Matrix): Matrix {
    return matrix.swapColumn(this.column1, this.column2);
  }

  getOperationLatex(): string {
    return `\\xrightarrow{c_{${this.column1}}\\leftrightarrow c_{${this.column2}}}`;
  }
}

export class SwapRowOperation implements IOperation {
  public row1: number;
  public row2: number;

  constructor(row1: number, row2: number) {
    this.row1 = row1;
    this.row2 = row2;
  }

  transform(matrix: Matrix): Matrix {
    return matrix.swapRow(this.row1, this.row2);
  }

  getOperationLatex(): string {
    return `\\xrightarrow{r_{${this.row1}}\\leftrightarrow r_{${this.row2}}}`;
  }
}

function toParenthesisStr(fraction: Fraction) {
  if (fraction.numerator == 1 && fraction.denominator != 1)
    if (fraction.numerator < 0)
      return `\\times (${fraction.denominator})`;
    else
      return `\\times ${fraction.denominator}`;

  if (fraction.numerator < 0)
    return `\\times (${fraction.toLatex()})`;
  return `\\times ${fraction.toLatex()}`;
}

export class MulColumnOperation implements IOperation {
  public column: number;
  public scale: Fraction;

  constructor(column: number, scale: Fraction) {
    this.column = column;
    this.scale = scale;
  }

  transform(matrix: Matrix): Matrix {
    return matrix.columnMulK(this.column, this.scale);
  }

  getOperationLatex(): string {
    return `\\xrightarrow{c_{${this.column}} ${toParenthesisStr(this.scale)}}`;
  }
}

export class MulRowOperation implements IOperation {
  public row: number;
  public scale: Fraction;

  constructor(row: number, scale: Fraction) {
    this.row = row;
    this.scale = scale;
  }

  transform(matrix: Matrix): Matrix {
    return matrix.rowMulK(this.row, this.scale);
  }

  getOperationLatex(): string {
    return `\\xrightarrow{r_{${this.row}} ${toParenthesisStr(this.scale)}}`;
  }
}

function toSignedStr(fraction: Fraction) {
  if (fraction.numerator < 0)
    return fraction.toLatex();
  return '+' + fraction.toLatex();
}
export class ColumnAddKColumnOperation implements IOperation {
  public a: number;
  public b: number;
  public scale: Fraction;

  constructor(a: number, b: number, scale: Fraction) {
    this.a = a;
    this.b = b;
    this.scale = scale;
  }

  transform(matrix: Matrix): Matrix {
    return matrix.columnAddKColumn(this.a, this.scale, this.b);
  }

  getOperationLatex(): string {
    return `\\xrightarrow{c_{${this.a}}${toSignedStr(this.scale)} c_{${this.b}}}`;
  }
}

export class RowAddKRowOperation implements IOperation {
  public a: number;
  public b: number;
  public scale: Fraction;

  constructor(a: number, b: number, scale: Fraction) {
    this.a = a;
    this.b = b;
    this.scale = scale;
  }

  transform(matrix: Matrix): Matrix {
    return matrix.rowAddKRow(this.a, this.scale, this.b);
  }

  getOperationLatex(): string {
    return `\\xrightarrow{r_{${this.a}}${toSignedStr(this.scale)} r_{${this.b}}}`;
  }
}
