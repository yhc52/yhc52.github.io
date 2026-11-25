import type { Fraction } from './Fraction';

export interface IElementaryTransformable<TSelf extends IElementaryTransformable<TSelf>> {
  clone(): TSelf;

  get(column: number, row: number): Fraction;
  set(column: number, row: number, value: Fraction): void;

  asArray(): Fraction[];

  toLatex(): string;

  swapColumn(a: number, b: number): TSelf;
  swapRow(a: number, b: number): TSelf;

  columnMulK(column: number, k: Fraction): TSelf;
  rowMulK(row: number, k: Fraction): TSelf;
  columnAddKColumn(a: number, k: Fraction, b: number): TSelf;
  rowAddKRow(a: number, k: Fraction, b: number): TSelf;
}
