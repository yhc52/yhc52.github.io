export class Fraction {
  private _numerator: number;
  private _denominator: number;

  constructor(numerator: number, denominator: number = 1) {
    this._numerator = numerator;
    this._denominator = denominator;
    this.reduce();
  }

  public get numerator(): number {
    return this._numerator;
  }

  public get denominator(): number {
    return this._denominator;
  }

  public set numerator(numerator: number) {
    this._numerator = numerator;
    this.reduce();
  }

  public set denominator(denominator: number) {
    this._denominator = denominator;
    this.reduce();
  }

  public equals(other: Fraction): boolean {
    return this._numerator == other.numerator && this._denominator == other._denominator;
  }

  public clone(): Fraction {
    return new Fraction(this._numerator, this._denominator);
  }

  public toLatex(): string {
    if (this._denominator != 1) {
      if (this._numerator < 0)
        return `-\\frac{${-this._numerator}}{${this._denominator}}`;
      else
        return `\\frac{${this._numerator}}{${this._denominator}}`;
    } else {
      return this._numerator.toString();
    }
  }

  public compare(b: Fraction): number {
    return this._numerator * b._denominator - this._denominator * b._numerator;
  }

  public add(b: Fraction) {
    this._numerator = this._numerator * b._denominator + this._denominator * b._numerator;
    this._denominator *= b._denominator;
    this.reduce();
  }

  public sub(b: Fraction) {
    this._numerator = this._numerator * b._denominator - this._denominator * b._numerator;
    this._denominator *= b._denominator;
    this.reduce();
  }

  public neg() {
    this._numerator = -this._numerator;
  }

  public mul(b: Fraction) {
    this._numerator *= b._numerator;
    this._denominator *= b._denominator;
    this.reduce();
  }

  public div(b: Fraction) {
    this._numerator *= b._denominator;
    this._denominator *= b._numerator;
    this.reduce();
  }

  public inv() {
    const t = this._numerator;
    this._numerator = this._denominator;
    this._denominator = t;
  }

  private reduce() {
    if (this._denominator == 0)
      throw Error('a fraction\'s denominator can not be 0!');

    if (this._denominator < 0) {
      this._numerator = -this._numerator;
      this._denominator = -this._denominator;
    }

    if (this._numerator == 0) {
      this._denominator = 1;
      return;
    }

    const gcd = this.gcd(Math.abs(this._numerator), this._denominator);
    this._numerator /= gcd;
    this._denominator /= gcd;
  }

  private gcd(m: number, n: number): number {
    if (m < n)
      [m, n] = [n, m];

    let r = m % n;
    while (r != 0) {
      m = n;
      n = r;
      r = m % n;
    }

    return n;
  }
}
