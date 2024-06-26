
<template>
  <div class="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
    <div class="flex flex-col gap-4">
      <p>READY TO GET</p>
      <h1 class="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        Absolutely<span class="text-blue-400">Ripped</span>
      </h1>
    </div>
    <p class="text-sm md:text-base font-light">
       Prepare yourself to become
      <span class="text-blue-400 font-medium">unbelievably fit</span> as you embark on this epic journey. Embrace the challenge of transforming into a
      <span class="text-blue-400 font-medium">mass monstrosity</span>,  ready to conquer every obstacle and push your limits beyond the imaginable.
    </p>
    <router-link to="/WorkoutGenerator">
      <button class="px-8 mx-auto py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200">
        <p>Accept & Begin</p>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created () {
    // Load state from local storage when the component is created
    this.$store.commit('loadState')
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
