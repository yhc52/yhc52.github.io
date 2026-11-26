import { Fraction } from './Fraction';
import type { IMatrix } from './IMatrix';

export class SquareMatrix implements IMatrix<SquareMatrix> {
  private _data: Fraction[];
  private _order: number;

  constructor(data: Fraction[], order: number) {
    this._data = data;
    this._order = order;
  }

  public static fromArray2D(data: Fraction[][]): SquareMatrix {
    return new SquareMatrix(data.flat(), data.length);
  }

  public static createIdentity(order: number): SquareMatrix {
    const data: Fraction[] = [];
    for (let c = 0; c < order; c++) {
      let r = 0;
      for (; r < c; r++)
        data.push(new Fraction(0));
      data.push(new Fraction(1));
      for (r++; r < order; r++)
        data.push(new Fraction(0));
    }
    return new SquareMatrix(data, order);
  }

  public isIdentity(): boolean {
    let index = 0;
    const frac0 = new Fraction(0);
    const frac1 = new Fraction(1);
    for (let c = 0; c < this._order; c++) {
      let r = 0;
      for (; r < c; r++)
        if (!this._data[index++]!.equals(frac0))
          return false;
      if (!this._data[index++]!.equals(frac1))
        return false;
      for (r++; r < this._order; r++)
        if (!this._data[index++]!.equals(frac0))
          return false;
    }
    return true;
  }

  public static createEmpty(): SquareMatrix {
    return new SquareMatrix([], 0);
  }

  public clone(): SquareMatrix {
    return new SquareMatrix(this._data.map(frac => frac.clone()), this._order);
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
    let m = '\\begin{pmatrix}';
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

    return m + '\\end{pmatrix}';
  }

  public swapColumn(a: number, b: number): SquareMatrix {
    const newMat = this.clone();
    const ra = (a - 1) * this._order;
    const rb = (b - 1) * this._order;
    for (let i = 0; i < this._order; i++) {
      newMat._data[ra + i] = this._data[rb + i]!;
      newMat._data[rb + i] = this._data[ra + i]!;
    }
    return newMat;
  }

  public swapRow(a: number, b: number): SquareMatrix {
    const newMat = this.clone();
    for (let i = 0; i < this._order; i++) {
      const ca = i * this._order + a - 1;
      const cb = i * this._order + b - 1;
      newMat._data[ca] = this._data[cb]!;
      newMat._data[cb] = this._data[ca]!;
    }
    return newMat;
  }

  public columnMulK(column: number, k: Fraction): SquareMatrix {
    const newMat = this.clone();
    for (let i = 0; i < this._order; i++) {
      newMat._data[(column - 1) * this._order + i]!.mul(k);
    }
    return newMat;
  }

  public rowMulK(row: number, k: Fraction): SquareMatrix {
    const newMat = this.clone();
    for (let i = 0; i < this._order; i++) {
      newMat._data[i * this._order + row - 1]!.mul(k);
    }
    return newMat;
  }

  public columnAddKColumn(a: number, k: Fraction, b: number): SquareMatrix {
    const newMat = this.clone();
    for (let i = 0; i < this._order; i++) {
      const temp = k.clone();
      temp.mul(this._data[(b - 1) * this._order + i]!);
      newMat._data[(a - 1) * this._order + i]!.add(temp);
    }
    return newMat;
  }

  public rowAddKRow(a: number, k: Fraction, b: number): SquareMatrix {
    const newMat = this.clone();
    for (let i = 0; i < this._order; i++) {
      const temp = k.clone();
      temp.mul(newMat._data[i * this._order + b - 1]!);
      newMat._data[i * this._order + a - 1]!.add(temp);
    }
    return newMat;
  }
}
