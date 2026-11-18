import type { Matrix } from './Matrix';
import type { IOperation } from './Operations';

export class OperationStack {
  public matrix: Matrix;
  public operations: IOperation[];

  constructor(matrix: Matrix, operations: IOperation[] = []) {
    this.matrix = matrix;
    this.operations = operations;
  }

  public pushOperation(operation: IOperation) {
    this.operations.push(operation);
  }

  public popOperation() {
    this.operations.pop();
  }

  public getTransformedMatrix(): Matrix {
    let matrix = this.matrix;
    this.operations.forEach((op) => {
      matrix = op.transform(matrix);
    });
    return matrix;
  }

  public getTransformationLatex(): string[] {
    let matrix = this.matrix;
    const latex = [matrix.toLatex()];
    this.operations.forEach((op) => {
      latex.push(op.getOperationLatex());
      try {
        matrix = op.transform(matrix);
        latex.push(matrix.toLatex());
      } catch {
        latex.push('???');
      }
    });
    return latex;
  }
}
