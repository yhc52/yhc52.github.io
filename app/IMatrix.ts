import type { Fraction } from './Fraction';
import type { IElementaryTransformable } from './IElementaryTransformable';

export interface IMatrix<TSelf extends IMatrix<TSelf>> extends IElementaryTransformable<TSelf> {
  get(column: number, row: number): Fraction;
  set(column: number, row: number, value: Fraction): void;
  asArray(): Fraction[];
}
