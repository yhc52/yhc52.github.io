<script setup lang="ts">
import FractionInput from '~/components/FractionInput.vue';
import type { Matrix } from '~/Matrix';

const matrix = defineModel<Matrix>();
</script>

<template>
  <div class="flex px-[8px] items-center">
    <span class="text-default">(</span>
    <div
      class="grid m-[8px] max-w-fit max-h-fit gap-[4px]"
      :style="{ gridTemplateColumns: '1fr '.repeat(matrix?.rowCount ?? 0),
                gridTemplateRows: '1fr '.repeat(matrix?.columnCount ?? 0) }"
    >
      <FractionInput
        v-for="(_, index) in matrix?.asArray()"
        class="w-16"
        v-model="matrix!.asArray()[index]"
      />
    </div>
    <span class="text-default">)</span>
  </div>
</template>
