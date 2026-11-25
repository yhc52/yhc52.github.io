import { Fraction } from './Fraction';
import type { IElementaryTransformable } from './IElementaryTransformable';
import { SquareMatrix } from './SquareMatrix';

export class Determinant implements IElementaryTransformable<Determinant> {
  public inner: SquareMatrix;
  public k: Fraction;

  constructor(inner: SquareMatrix, k: Fraction = new Fraction(1)) {
    this.inner = inner;
    this.k = k;
  }

  public static fromArray(
    data: Fraction[], order: number, k: Fraction = new Fraction(1)
  ): Determinant {
    return new Determinant(new SquareMatrix(data, order), k);
  }

  public static fromArray2D(data: Fraction[][], k: Fraction = new Fraction(1)): Determinant {
    return new Determinant(SquareMatrix.fromArray2D(data), k);
  }

  public static createEmpty(): Determinant {
    return new Determinant(SquareMatrix.createEmpty(), new Fraction(1));
  }

  public clone(): Determinant {
    return new Determinant(this.inner.clone(), this.k);
  }

  public get(column: number, row: number): Fraction {
    return this.inner.get(column, row);
  }

  public set(column: number, row: number, value: Fraction) {
    this.inner.set(column, row, value);
  }

  public asArray(): Fraction[] {
    return this.inner.asArray();
  }

  public get order(): number {
    return this.inner.order;
  }

  public changeOrder(newOrder: number) {
    this.inner.changeOrder(newOrder);
  }

  public toLatex(): string {
    let m;
    if (this.k.denominator == 1 && this.k.numerator == 1)
      m = '\\begin{vmatrix}';
    else if (this.k.denominator == 1 && this.k.numerator == -1)
      m = '-\\begin{vmatrix}';
    else
      m = `${this.k.toLatex()}\\begin{vmatrix}`;

    let index = 0;
    const data = this.inner.asArray();
    for (let i = 1; i < this.inner.order; i++) {
      for (let j = 1; j < this.inner.order; j++) {
        m += data[index++]!.toLatex() + '&';
      }
      m += data[index++]!.toLatex() + '\\\\';
    }
    for (let j = 1; j < this.inner.order; j++) {
      m += data[index++]!.toLatex() + '&';
    }
    m += data[index]!.toLatex();

    return m + '\\end{vmatrix}';
  }

  public swapColumn(a: number, b: number): Determinant {
    const newK = this.k.clone();
    newK.neg();
    return new Determinant(this.inner.swapColumn(a, b), newK);
  }

  public swapRow(a: number, b: number): Determinant {
    const newK = this.k.clone();
    newK.neg();
    return new Determinant(this.inner.swapRow(a, b), newK);
  }

  public columnMulK(column: number, k: Fraction): Determinant {
    const newK = this.k.clone();
    newK.div(k);
    return new Determinant(this.inner.columnMulK(column, k), newK);
  }

  public rowMulK(row: number, k: Fraction): Determinant {
    const newK = this.k.clone();
    newK.div(k);
    return new Determinant(this.inner.rowMulK(row, k), newK);
  }

  public columnAddKColumn(a: number, k: Fraction, b: number): Determinant {
    return new Determinant(this.inner.columnAddKColumn(a, k, b), this.k);
  }

  public rowAddKRow(a: number, k: Fraction, b: number): Determinant {
    return new Determinant(this.inner.rowAddKRow(a, k, b), this.k);
  }
}
