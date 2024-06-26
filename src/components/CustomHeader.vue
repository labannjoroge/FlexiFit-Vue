<!-- src/components/CustomHeader.vue -->
<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-center gap-2">
      <p class="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">{{ index }}</p>
      <h4 class="text-xl sm:text-2xl md:text-3xl">{{ title }}</h4>
    </div>
    <p class="text-sm sm:text-base mx-auto">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomHeader',
  props: {
    index: String,
    title: String,
    description: String
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
