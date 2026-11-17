import type { Matrix } from "./Matrix";
import type { IOperation } from "./Operations";


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
        var matrix = this.matrix;
        this.operations.forEach((op) => {
            matrix = op.transform(matrix);
        });
        return matrix;
    }
    public getTransformationLatex(): string[] {
        var matrix = this.matrix;
        var latex = [matrix.toLatex()];
        this.operations.forEach((op) => {
            latex.push(op.getOperationLatex());
            try {
                matrix = op.transform(matrix);
                latex.push(matrix.toLatex());
            } catch (error) {
                latex.push("???");
            }
        });
        return latex;
    }
}
