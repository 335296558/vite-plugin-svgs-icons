<script setup>
import { ref } from 'vue'
import svgIcon from 'virtual:svg-icon';
defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="svgssss">
    
  </div>
</template>

<style>
.svgssss svg {
    width: 38px;
    height: 38px; 
}
.test-photo {
    --photo-svg-color-0: #f00;
    --photo-svg-color-1: rgb(81, 255, 0);
    --photo-svg-color-2: #fff;
}
</style>
