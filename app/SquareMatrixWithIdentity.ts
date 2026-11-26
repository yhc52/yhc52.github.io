import type { Fraction } from './Fraction';
import type { IElementaryTransformable } from './IElementaryTransformable';
import { SquareMatrix } from './SquareMatrix';

export class SquareMatrixWithIdentity implements IElementaryTransformable<SquareMatrixWithIdentity> {
  public squareMatrixPart: SquareMatrix;
  public identityPart: SquareMatrix;

  constructor(squareMatrixPart: SquareMatrix, identityPatt: SquareMatrix) {
    this.squareMatrixPart = squareMatrixPart;
    this.identityPart = identityPatt;
  }

  public static createWithIdentity(squareMatrixPart: SquareMatrix): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      squareMatrixPart, SquareMatrix.createIdentity(squareMatrixPart.order)
    );
  }

  public clone(): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(this.squareMatrixPart.clone(), this.identityPart.clone());
  }

  public get order(): number {
    return this.squareMatrixPart.order;
  }

  public changeOrder(newOrder: number) {
    if (newOrder > this.squareMatrixPart.order && this.identityPart.isIdentity()) {
      this.identityPart = SquareMatrix.createIdentity(newOrder);
    } else {
      this.identityPart.changeOrder(newOrder);
    }
    this.squareMatrixPart.changeOrder(newOrder);
  }

  public toLatex(): string {
    const order = this.squareMatrixPart.order;
    const data1 = this.squareMatrixPart.asArray();
    const data2 = this.identityPart.asArray();
    const c = 'c'.repeat(order);
    let m = `\\left(\\begin{array}{${c}|${c}}`;
    let index1 = 0;
    let index2 = 0;
    for (let i = 1; i < order; i++) {
      for (let j = 0; j < order; j++) {
        m += data1[index1++]!.toLatex() + '&';
      }
      for (let j = 1; j < order; j++) {
        m += data2[index2++]!.toLatex() + '&';
      }
      m += data2[index2++]!.toLatex() + '\\\\';
    }
    for (let j = 0; j < order; j++) {
      m += data1[index1++]!.toLatex() + '&';
    }
    for (let j = 1; j < order; j++) {
      m += data2[index2++]!.toLatex() + '&';
    }
    m += data2[index2]!.toLatex();

    return m + '\\end{array}\\right)';
  }

  public swapColumn(a: number, b: number): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      this.squareMatrixPart.swapColumn(a, b),
      this.identityPart.swapColumn(a, b)
    );
  }

  public swapRow(a: number, b: number): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      this.squareMatrixPart.swapRow(a, b),
      this.identityPart.swapRow(a, b)
    );
  }

  public columnMulK(column: number, k: Fraction): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      this.squareMatrixPart.columnMulK(column, k),
      this.identityPart.columnMulK(column, k)
    );
  }

  public rowMulK(row: number, k: Fraction): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      this.squareMatrixPart.rowMulK(row, k),
      this.identityPart.rowMulK(row, k)
    );
  }

  public columnAddKColumn(a: number, k: Fraction, b: number): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      this.squareMatrixPart.columnAddKColumn(a, k, b),
      this.identityPart.columnAddKColumn(a, k, b)
    );
  }

  public rowAddKRow(a: number, k: Fraction, b: number): SquareMatrixWithIdentity {
    return new SquareMatrixWithIdentity(
      this.squareMatrixPart.rowAddKRow(a, k, b),
      this.identityPart.rowAddKRow(a, k, b)
    );
  }
}
