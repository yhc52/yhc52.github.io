import { Fraction } from './Fraction';
import type { IElementaryTransformable } from './IElementaryTransformable';

export class Determinant implements IElementaryTransformable<Determinant> {
  private _data: Fraction[];
  private _order: number;
  public k: Fraction;

  constructor(data: Fraction[], order: number, k: Fraction = new Fraction(1)) {
    this._data = data;
    this._order = order;
    this.k = k;
  }

  public static fromArray2D(data: Fraction[][], k: Fraction = new Fraction(1)): Determinant {
    return new Determinant(data.flat(), data.length, k);
  }

  public static createEmpty(): Determinant {
    return new Determinant([], 0, new Fraction(1));
  }

  public clone(): Determinant {
    return new Determinant(this._data.map(frac => frac.clone()), this._order, this.k);
  }

  private cloneWithK(k: Fraction): Determinant {
    return new Determinant(this._data.map(frac => frac.clone()), this._order, k);
  }

  public get(column: number, row: number): Fraction {
    return this._data[this._order * column + row]!;
  }

  public set(column: number, row: number, value: Fraction) {
    this._data[this._order * column + row] = value;
  }

  public asArray(): Fraction[] {
    return this._data;
  }

  public get order(): number {
    return this._order;
  }

  public changeOrder(newOrder: number) {
    if (newOrder > this._order) {
      let i = 0;
      let c = 0;
      const newArr: Fraction[] = [];
      for (; c < this._order; c++) {
        let r = 0;
        for (; r < this._order; r++) {
          newArr.push(this._data[i++]!);
        }
        for (; r < newOrder; r++) {
          newArr.push(new Fraction(0));
        }
      }
      for (;c < newOrder; c++) {
        for (let r = 0; r < newOrder; r++) {
          newArr.push(new Fraction(0));
        }
      }
      this._data = newArr;
      this._order = newOrder;
    } else if (newOrder < this._order) {
      let i = 0;
      for (let c = 0; c < newOrder; c++) {
        for (let r = c * this._order; r < c * this._order + newOrder; r++) {
          this._data[i++] = this._data[r]!;
        }
      }
      this._data.length = newOrder * newOrder;
      this._order = newOrder;
    }
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
    for (let i = 1; i < this._order; i++) {
      for (let j = 1; j < this._order; j++) {
        m += this._data[index++]!.toLatex() + '&';
      }
      m += this._data[index++]!.toLatex() + '\\\\';
    }
    for (let j = 1; j < this._order; j++) {
      m += this._data[index++]!.toLatex() + '&';
    }
    m += this._data[index]!.toLatex();

    return m + '\\end{vmatrix}';
  }

  public swapColumn(a: number, b: number): Determinant {
    const newK = this.k.clone();
    newK.neg();
    const newDet = this.cloneWithK(newK);
    const ra = (a - 1) * this._order;
    const rb = (b - 1) * this._order;
    for (let i = 0; i < this._order; i++) {
      newDet._data[ra + i] = this._data[rb + i]!;
      newDet._data[rb + i] = this._data[ra + i]!;
    }
    return newDet;
  }

  public swapRow(a: number, b: number): Determinant {
    const newK = this.k.clone();
    newK.neg();
    const newDet = this.cloneWithK(newK);
    for (let i = 0; i < this._order; i++) {
      const ca = i * this._order + a - 1;
      const cb = i * this._order + b - 1;
      newDet._data[ca] = this._data[cb]!;
      newDet._data[cb] = this._data[ca]!;
    }
    return newDet;
  }

  public columnMulK(column: number, k: Fraction): Determinant {
    const newK = this.k.clone();
    newK.div(k);
    const newDet = this.cloneWithK(newK);
    for (let i = 0; i < this._order; i++) {
      newDet._data[(column - 1) * this._order + i]!.mul(k);
    }
    return newDet;
  }

  public rowMulK(row: number, k: Fraction): Determinant {
    const newK = this.k.clone();
    newK.div(k);
    const newDet = this.cloneWithK(newK);
    for (let i = 0; i < this._order; i++) {
      newDet._data[i * this._order + row - 1]!.mul(k);
    }
    return newDet;
  }

  public columnAddKColumn(a: number, k: Fraction, b: number): Determinant {
    const newDet = this.clone();
    for (let i = 0; i < this._order; i++) {
      const temp = k.clone();
      temp.mul(this._data[(b - 1) * this._order + i]!);
      newDet._data[(a - 1) * this._order + i]!.add(temp);
    }
    return newDet;
  }

  public rowAddKRow(a: number, k: Fraction, b: number): Determinant {
    const newDet = this.clone();
    for (let i = 0; i < this._order; i++) {
      const temp = k.clone();
      temp.mul(newDet._data[i * this._order + b - 1]!);
      newDet._data[i * this._order + a - 1]!.add(temp);
    }
    return newDet;
  }
}
