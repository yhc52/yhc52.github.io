<script lang="ts" setup>
import 'katex/dist/katex.css'
import katex from 'katex';

var container = useTemplateRef('container')
const{latex = ''} = defineProps<{latex:string}>();
var isLoaded = false;

onMounted(()=>{
  katex.render(latex, container.value!, {
      throwOnError: false,
      displayMode: true
    });
  isLoaded = true;
  });
watch<string>(
  ()=>latex,
  (newLatex)=>{
    if (isLoaded) {
      katex.render(newLatex, container.value!, {
          throwOnError: false,
          displayMode: true
        });
    }
  });
</script>

<template>
  <div ref="container"/>
</template>