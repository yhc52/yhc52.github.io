<script setup lang="ts">
import FractionInput from '~/components/FractionInput.vue';
import type { Determinant } from '~/Determinant';

const determinant = defineModel<Determinant>();
</script>

<template>
  <div class="flex px-[8px] items-center">
    <span class="text-default">(</span>
    <div
      class="grid m-[8px] max-w-fit max-h-fit gap-[4px]"
      :style="{ gridTemplateColumns: '1fr '.repeat(determinant?.order ?? 0),
                gridTemplateRows: '1fr '.repeat(determinant?.order ?? 0) }"
    >
      <FractionInput
        v-for="(item, index) in determinant?.asArray()"
        :key="index"
        class="w-16"
        :model-value="determinant!.asArray()[index]"
        @update:model-value="(val) => determinant!.asArray()[index] = val!"
      />
    </div>
    <span class="text-default">)</span>
  </div>
</template>
