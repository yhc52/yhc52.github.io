<script setup lang="ts">
import FractionInput from '~/components/FractionInput.vue';
import {
  ColumnAddKColumnOperation,
  MulColumnOperation,
  MulRowOperation,
  RowAddKRowOperation,
  SwapColumnOperation,
  SwapRowOperation,
  type IOperation
} from '~/Operations';
import { OperationType, type OperationInputMode } from './InputPrarmTypes';
import { Fraction } from '~/Fraction';

const { mode, type, maxColumnOrRow }
  = defineProps<{ mode: OperationInputMode; type: OperationType; maxColumnOrRow: number }>();
const text = computed(() => mode == 'column' ? '行' : '列');

const emit = defineEmits<{ close: [IOperation | null] }>();

const a = ref(1);
const b = ref(1);
const k = ref(new Fraction(1));
</script>

<template>
  <UModal title="请输入参数">
    <template #body>
      <div
        v-if="type==OperationType.swap"
        class="flex flex-col gap-[16px] items-center"
      >
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            :label="`${text}1：`"
          />
          <UInputNumber
            v-model="a"
            class="w-30"
            :min="1"
            :max="maxColumnOrRow"
          />
        </UFieldGroup>
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            :label="`${text}2：`"
          />
          <UInputNumber
            v-model="b"
            class="w-30"
            :min="1"
            :max="maxColumnOrRow"
          />
        </UFieldGroup>
        <UButton
          label="确定"
          @click="() => {
            if (mode == 'column')
              emit('close', new SwapColumnOperation(a, b))
            else
              emit('close', new SwapRowOperation(a, b))
          }"
        />
      </div>

      <div
        v-else-if="type==OperationType.xMulK"
        class="flex flex-col gap-[16px] items-center"
      >
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            :label="`${text}：`"
          />
          <UInputNumber
            v-model="a"
            class="w-30"
            :min="1"
            :max="maxColumnOrRow"
          />
        </UFieldGroup>
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            label="乘数："
          />
          <FractionInput
            v-model="k as Fraction"
            class="w-30"
          />
        </UFieldGroup>
        <UButton
          label="确定"
          @click="() => {
            if (mode == 'column')
              emit('close', new MulColumnOperation(a, k as Fraction))
            else
              emit('close', new MulRowOperation(a, k as Fraction))
          }"
        />
      </div>

      <div
        v-else
        class="flex flex-col gap-[16px] items-center"
      >
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            :label="`${text}1：`"
          />
          <UInputNumber
            v-model="a"
            class="w-30"
            :min="1"
            :max="maxColumnOrRow"
          />
        </UFieldGroup>
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            :label="`${text}2：`"
          />
          <UInputNumber
            v-model="b"
            class="w-30"
            :min="1"
            :max="maxColumnOrRow"
          />
        </UFieldGroup>
        <UFieldGroup class="self-center">
          <UBadge
            color="neutral"
            variant="outline"
            size="lg"
            label="乘数："
          />
          <FractionInput
            v-model="k as Fraction"
            class="w-30"
          />
        </UFieldGroup>
        <UButton
          label="确定"
          @click="() => {
            if (mode == 'column')
              emit('close', new ColumnAddKColumnOperation(a, b, k as Fraction))
            else
              emit('close', new RowAddKRowOperation(a, b, k as Fraction))
          }"
        />
      </div>
    </template>
  </UModal>
</template>
