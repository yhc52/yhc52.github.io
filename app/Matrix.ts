import { Fraction } from './Fraction'

export class Matrix {
  private _data: Fraction[]
  private _columnCount: number
  private _rowCount: number

  constructor(data: Fraction[], columns: number, rows: number) {
    this._data = data
    this._columnCount = columns
    this._rowCount = rows
  }

  public static fromArray2D(data: Fraction[][]): Matrix {
    return new Matrix(data.flat(), data.length, data[0]!.length)
  }

  public static createEmpty(): Matrix {
    return new Matrix([], 0, 0)
  }

  public clone(): Matrix {
    return new Matrix(this._data.map(frac => frac.clone()), this._columnCount, this._rowCount)
  }

  public get(column: number, row: number): Fraction {
    return this._data[this._rowCount * column + row]!
  }

  public set(column: number, row: number, value: Fraction) {
    this._data[this._rowCount * column + row] = value
  }

  public asArray(): Fraction[] {
    return this._data
  }

  public get columnCount(): number {
    return this._columnCount
  }

  public changeColumnCount(newColumn: number) {
    if (newColumn > this._columnCount) {
      for (let i = 0; i < (newColumn - this._columnCount) * this._rowCount; i++) {
        this._data.push(new Fraction(0))
      }
      this._columnCount = newColumn
    } else if (newColumn < this._columnCount) {
      this._data.length = newColumn * this._rowCount
      this._columnCount = newColumn
    }
  }

  public get rowCount(): number {
    return this._rowCount
  }

  public changeRowCount(newRow: number) {
    if (newRow > this._rowCount) {
      let i = 0
      const newArr: Fraction[] = []
      for (let c = 0; c < this._columnCount; c++) {
        let r = 0
        for (; r < this._rowCount; r++) {
          newArr.push(this._data[i++]!)
        }
        for (; r < newRow; r++) {
          newArr.push(new Fraction(0))
        }
      }
      this._data = newArr
      this._rowCount = newRow
    } else if (newRow < this._rowCount) {
      let i = 0
      for (let c = 0; c < this._columnCount; c++) {
        for (let r = c * this._rowCount; r < c * this._rowCount + newRow; r++) {
          this._data[i++] = this._data[r]!
        }
      }
      this._data.length = newRow * this._columnCount
      this._rowCount = newRow
    }
  }

  public toLatex(): string {
    let m = '\\begin{pmatrix}'

    let index = 0
    for (let i = 1; i < this._columnCount; i++) {
      for (let j = 1; j < this._rowCount; j++) {
        m += this._data[index++]!.toLatex() + '&'
      }
      m += this._data[index++]!.toLatex() + '\\\\'
    }
    for (let j = 1; j < this._rowCount; j++) {
      m += this._data[index++]!.toLatex() + '&'
    }
    m += this._data[index]!.toLatex()

    return m + '\\end{pmatrix}'
  }

  public swapColumn(a: number, b: number): Matrix {
    const newMat = this.clone()
    const ra = (a - 1) * this._rowCount
    const rb = (b - 1) * this._rowCount
    for (let i = 0; i < this._rowCount; i++) {
      newMat._data[ra + i] = this._data[rb + i]!
      newMat._data[rb + i] = this._data[ra + i]!
    }
    return newMat
  }

  public swapRow(a: number, b: number): Matrix {
    const newMat = this.clone()
    for (let i = 0; i < this._columnCount; i++) {
      const ca = i * this._rowCount + a - 1
      const cb = i * this._rowCount + b - 1
      newMat._data[ca] = this._data[cb]!
      newMat._data[cb] = this._data[ca]!
    }
    return newMat
  }

  public columnMulK(column: number, k: Fraction): Matrix {
    const newMat = this.clone()
    for (let i = 0; i < this._rowCount; i++) {
      newMat._data[(column - 1) * this._rowCount + i]!.mul(k)
    }
    return newMat
  }

  public rowMulK(row: number, k: Fraction): Matrix {
    const newMat = this.clone()
    for (let i = 0; i < this._rowCount; i++) {
      newMat._data[i * this._rowCount + row - 1]!.mul(k)
    }
    return newMat
  }

  public columnAddKColumn(a: number, k: Fraction, b: number): Matrix {
    const newMat = this.clone()
    for (let i = 0; i < this._rowCount; i++) {
      const temp = k.clone()
      temp.mul(this._data[(b - 1) * this._rowCount + i]!)
      newMat._data[(a - 1) * this._rowCount + i]!.add(temp)
    }
    return newMat
  }

  public rowAddKRow(a: number, k: Fraction, b: number): Matrix {
    const newMat = this.clone()
    for (let i = 0; i < this._rowCount; i++) {
      const temp = k.clone()
      temp.mul(newMat._data[i * this._rowCount + b - 1]!)
      newMat._data[i * this._rowCount + a - 1]!.add(temp)
    }
    return newMat
  }
}
