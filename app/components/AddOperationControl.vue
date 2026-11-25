<script setup lang="ts" generic="T extends IElementaryTransformable<T>">
import type { IOperation } from '~/Operations.ts';
import { OperationType, type OperationInputMode } from './InputPrarmTypes.ts';
import OperationPrarmInput from './OperationPrarmInput.vue';
import type { IElementaryTransformable } from '~/IElementaryTransformable.ts';

const click = defineEmits<{ (e: 'click', type: IOperation<T>): void }>();

const { mode, maxColumnOrRow }
  = defineProps<{ mode: OperationInputMode; maxColumnOrRow: number }>();

const text = mode == 'column' ? '行' : '列';

const operations = ref<{ label: string; id: OperationType }[]>([
  {
    label: `交换两${text}`,
    id: OperationType.swap
  },
  {
    label: `某${text}乘常数`,
    id: OperationType.xMulK
  },
  {
    label: `某${text}加上某倍的另一${text}`,
    id: OperationType.xAddYMulk
  }
]);
const operationValue = ref<OperationType>();

const overlay = useOverlay();
const modal = overlay.create(OperationPrarmInput<T>);

async function open() {
  const instance
    = modal.open({ mode: mode, type: operationValue.value!, maxColumnOrRow: maxColumnOrRow });

  const operation = await instance.result;

  if (operation)
    click('click', operation);
}
</script>

<template>
  <UFieldGroup class="self-center">
    <UButton
      color="neutral"
      variant="subtle"
      :label="'添加' + text + '运算'"
      @click="() => { if (operationValue) open() }"
    />
    <USelectMenu
      v-model="operationValue"
      class="w-52"
      value-key="id"
      :placeholder="'选择' + text + '运算'"
      :items="operations"
    />
  </UFieldGroup>
</template>
