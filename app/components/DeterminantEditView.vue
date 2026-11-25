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
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <FractionInput
        v-for="(_, index) in determinant?.asArray()"
        v-model="determinant!.asArray()[index]"
        class="w-16"
      />
    </div>
    <span class="text-default">)</span>
  </div>
</template>
