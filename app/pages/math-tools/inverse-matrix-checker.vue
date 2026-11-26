<script setup lang="ts">
import { Fraction } from '~/Fraction';
import { SquareMatrixWithIdentity } from '~/SquareMatrixWithIdentity';
import {
  ColumnAddKColumnOperation,
  MulColumnOperation,
  RowAddKRowOperation,
  SwapRowOperation
} from '~/Operations';
import { OperationStack } from '~/OperationStack';
import { SquareMatrix } from '~/SquareMatrix';
import SquareMatrixEditView from '~/components/SquareMatrixEditView.vue';
import AddOperationControl from '~/components/AddOperationControl.vue';

const matrix = ref(SquareMatrixWithIdentity.createWithIdentity(
  SquareMatrix.fromArray2D([
    [new Fraction(1), new Fraction(2), new Fraction(3)],
    [new Fraction(4), new Fraction(5), new Fraction(6)],
    [new Fraction(7), new Fraction(8), new Fraction(9)]
  ])
));
const operations = ref(new OperationStack(
  matrix.value as SquareMatrixWithIdentity, [
    new SwapRowOperation(1, 2),
    new MulColumnOperation(1, new Fraction(1, 2)),
    new ColumnAddKColumnOperation(1, 2, new Fraction(3)),
    new RowAddKRowOperation(2, 3, new Fraction(-5))
  ]));

const isLoaded = ref(false);
onMounted(() => {
  isLoaded.value = true;
});
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh-var(--ui-header-height))] gap-y-[24px] p-[24px] pb-[48px]">
    <div class="flex-1 border-2 border-default rounded-md p-[24px] flex flex-wrap items-center">
      <LatexView
        v-for="value in operations.getTransformationLatex()"
        :key="value"
        :latex="value"
      />
      <span
        v-if="!isLoaded"
        calss="text-default"
      >
        矩阵渲染中。。。
      </Span>
    </div>
    <div class="flex flex-col lg:flex-row flex-0 self-center gap-[32px] items-center">
      <div class="flex flex-col gap-y-[8px]">
        <UFieldGroup>
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            label="更改矩阵阶数："
          />
          <UInputNumber
            class="w-30"
            :min="1"
            :model-value="matrix.order"
            @update:model-value="(val) => {
              matrix.changeOrder(val)
            }"
          />
        </UFieldGroup>
        <!-- @vue-generic {SquareMatrixWithIdentity} -->
        <AddOperationControl
          mode="column"
          :max-column-or-row="matrix.order"
          @click="(op) => operations.pushOperation(op)"
        />
        <UButton
          label="删除上一个运算"
          @click="operations.popOperation()"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-default self-center">编辑左侧矩阵：</span>
        <!-- @vue-expect-error -->
        <SquareMatrixEditView v-model="matrix.squareMatrixPart" />
      </div>
      <div class="flex flex-col">
        <span class="text-default self-center">编辑右侧矩阵：</span>
        <!-- @vue-expect-error -->
        <SquareMatrixEditView v-model="matrix.identityPart" />
        <UButton
          label="重置为单位矩阵"
          @click="matrix.identityPart = SquareMatrix.createIdentity(matrix.order)"
        />
      </div>
    </div>
  </div>
</template>
