<script setup lang="ts">
import { Fraction } from '~/Fraction';
import { Matrix } from '~/Matrix';
import { ColumnAddKColumnOperation, MulColumnOperation, RowAddKRowOperation, SwapRowOperation } from '~/Operations';
import { OperationStack } from "~/OperationStack";
import MatrixEditView from '~/components/MatrixEditView.vue';

var matrix = ref(Matrix.fromArray2D([
    [new Fraction(1), new Fraction(2), new Fraction(3)],
    [new Fraction(4), new Fraction(5), new Fraction(6)],
    [new Fraction(7), new Fraction(8), new Fraction(9)]
]));
var operations = ref(new OperationStack(
    matrix.value as Matrix, [
        new SwapRowOperation(1, 2), 
        new MulColumnOperation(1, new Fraction(1, 2)),
        new ColumnAddKColumnOperation(1, 2, new Fraction(3)),
        new RowAddKRowOperation(2, 3, new Fraction(-5))
    ]));

var isLoaded = ref(false);
onMounted(()=>{ isLoaded.value = true });
</script>

<template>
    <div class="flex flex-col min-h-[calc(100vh-var(--ui-header-height))] gap-y-[24px] p-[24px] pb-[48px]">
        <div class="flex-1 border-2 border-default rounded-md p-[24px] flex flex-wrap items-center">
            <LatexView v-for="value in operations.getTransformationLatex()" :latex="value"/>
            <span v-if="!isLoaded" calss="text-default">矩阵渲染中。。。</Span>
        </div>
        <div class="flex flex-col lg:flex-row flex-0 self-center gap-[16px] items-center">
            <div class="flex flex-col gap-y-[16px]">
                <UFieldGroup class="self-center">
                    <UBadge color="neutral" variant="outline" size="lg" label="更改矩阵行数：" />
                    <UInputNumber :modelValue="matrix.columnCount" 
                                  @update:modelValue="(val)=>matrix.changeColumnCount(val)" 
                                  class="w-30" 
                                  :min="1"/>
                </UFieldGroup>
                <UFieldGroup class="self-center">
                    <UBadge color="neutral" variant="outline" size="lg" label="更改矩阵列数：" />
                    <UInputNumber :modelValue="matrix.rowCount" 
                                  @update:modelValue="(val)=>matrix.changeRowCount(val)" 
                                  class="w-30" 
                                  :min="1"/>
                </UFieldGroup>
            </div>
            <div class="flex flex-col">
                <span class="text-default self-center">编辑初始矩阵：</span>
                <MatrixEditView v-model="matrix as Matrix"/>
            </div>
            <div class="flex flex-col gap-y-[8px]">
                <AddOperationControl mode="column" 
                                     :max-column-or-row="matrix.columnCount"
                                     @click="(op) => operations.pushOperation(op)"/>
                <AddOperationControl mode="row" 
                                     :max-column-or-row="matrix.rowCount"
                                     @click="(op) => operations.pushOperation(op)"/>
                <UButton label="删除上一个运算" @click="operations.popOperation()"/>
            </div>
        </div>
    </div>
</template>