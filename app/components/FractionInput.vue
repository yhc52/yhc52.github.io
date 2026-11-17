<script setup lang="ts">
import { Fraction } from '~/Fraction';

const fraction = defineModel<Fraction>();

const fractionStr = computed<string>({
  get() {
    if (!fraction.value) {
        return ''
    }
    if(fraction.value.denominator == 1)
      return fraction.value.numerator.toString();
    else
      return `${fraction.value.numerator}/${fraction.value.denominator}`;
  },
  set(frac){
    let a = parseInt(frac)

    if(isNaN(a)){
        return;
    }

    let sp: string;
    if (frac.indexOf('/') !== -1) {
        sp = '/'
    }
    else if (frac.indexOf('\\') !== -1) {
        sp = '\\'
    }
    else
    {
        fraction.value = new Fraction(a);
        return;
    }
    
    let arr = frac.split(sp);
    if (arr.length != 2) {
        return;
    }
    let b = parseInt(arr[1]!);
    if (isNaN(b)) {
        return;
    }
    fraction.value = new Fraction(a, b);
  }});
</script>

<template>
  <UInput v-model.lazy="fractionStr"/>
</template>