<script setup lang="ts">
import { Fraction } from '~/Fraction';
import {
  ColumnAddKColumnOperation,
  MulColumnOperation,
  RowAddKRowOperation,
  SwapRowOperation
} from '~/Operations';
import { OperationStack } from '~/OperationStack';
import { Determinant } from '~/Determinant';
import SquareMatrixEditView from '~/components/SquareMatrixEditView.vue';
import AddOperationControl from '~/components/AddOperationControl.vue';

const determinant = ref(Determinant.fromArray2D([
  [new Fraction(1), new Fraction(2), new Fraction(3)],
  [new Fraction(4), new Fraction(5), new Fraction(6)],
  [new Fraction(7), new Fraction(8), new Fraction(9)]
]));
const operations = ref(new OperationStack<Determinant>(
  determinant.value as Determinant, [
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
        行列式渲染中。。。
      </Span>
    </div>
    <div class="flex flex-col lg:flex-row flex-0 self-center gap-[16px] items-center">
      <div class="flex flex-col gap-y-[16px]">
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            label="更改行列式阶数："
          />
          <UInputNumber
            class="w-30"
            :min="1"
            :model-value="determinant.order"
            @update:model-value="(val) => determinant.changeOrder(val)"
          />
        </UFieldGroup>
      </div>
      <div class="flex flex-col">
        <span class="text-default self-center">编辑初始行列式：</span>
        <!-- @vue-expect-error -->
        <SquareMatrixEditView v-model="determinant.inner" />
      </div>
      <div class="flex flex-col gap-y-[8px]">
        <!-- @vue-generic {Determinant} -->
        <AddOperationControl
          mode="column"
          :max-column-or-row="determinant.order"
          @click="(op) => operations.pushOperation(op)"
        />
        <!-- @vue-generic {Determinant} -->
        <AddOperationControl
          mode="row"
          :max-column-or-row="determinant.order"
          @click="(op) => operations.pushOperation(op)"
        />
        <UButton
          label="删除上一个运算"
          @click="operations.popOperation()"
        />
      </div>
    </div>
  </div>
</template>
