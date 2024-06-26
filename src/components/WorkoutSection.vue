<template>
  <section :id="workoutId" class="min-h-screen flex flex-col gap-10">
    <div class="bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center p-4">
      <p class="uppercase font-medium">{{ header }}</p>
      <h2 class="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        {{ title[0] }} <span class="uppercase text-blue-400">{{ title[1] }}</span> {{ title[2] }}
      </h2>
    </div>
    <div class="max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4">
      <div v-if="workout && workout.length > 0" class="flex flex-col gap-4">
        <div v-for="(exercise, index) in workout" :key="index">
          <div class="p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap">
            <CustomHeader
              :index="`0${index + 1}`"
              :title="exercise.name.replaceAll('_', ' ')"
              :description="exercise.type"
            />
            <div class="flex flex-col">
              <h3 class="text-slate-400 text-sm">Muscle Groups</h3>
              <p class="capitalize">{{ exercise.muscles.join(' & ') }}</p>
            </div>
            <div class="flex flex-col bg-slate-950 rounded gap-2">
              <div v-for="(val, idx) in exercise.description.split('___')" :key="idx" class="text-sm">{{ val }}</div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2">
              <div
                v-for="info in ['reps', 'rest', 'tempo']"
                :key="info"
                class="flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full"
              >
                <h3 class="capitalize text-slate-400 text-sm">{{ info === 'reps' ? exercise.unit : info }}</h3>
                <p class="font-medium">{{ exercise[info] }}</p>
              </div>
              <button @click="handleSetIncrement" class="flex flex-col p-2 rounded border-[1.5px] duration-200 border-solid border-blue-900 hover:border-blue-600 w-full">
                <h3 class="text-slate-400 text-sm capitalize">Sets completed</h3>
                <p class="font-medium">{{ setsCompleted }} / 5</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>plz go through the above procedure.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue'
import CustomHeader from './CustomHeader.vue'

export default {
  name: 'WorkoutSection',
  components: {
    CustomHeader
  },
  props: {
    workout: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    title: {
      type: Array,
      required: true
    },
    workoutId: {
      type: String,
      default: 'workout'
    }
  },
  setup (props) {
    const setsCompleted = ref(0)

    function handleSetIncrement () {
      setsCompleted.value = (setsCompleted.value + 1) % 6
      console.log('Sets completed incremented:', setsCompleted.value)
    }

    // Watch for changes in the workout prop
    watch(() => props.workout, (newVal, oldVal) => {
      console.log('Workout prop changed:', newVal)
    }, { immediate: true })

    // Log props to check if data is passed correctly
    console.log('Props received:', props)

    return {
      setsCompleted,
      handleSetIncrement
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
