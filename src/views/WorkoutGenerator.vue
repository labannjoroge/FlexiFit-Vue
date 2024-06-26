/* eslint-disable */
<template>
  <section id="generate" class="min-h-screen flex flex-col gap-10">
    <div class="bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center p-4">
      <p class="uppercase font-medium">generate your workout</p>
      <h2 class="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        It's <span class="uppercase text-blue-400">Huge</span> o'clock
      </h2>
    </div>
    <div class="max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4">
      <CustomHeader index="01" title="Pick your poison" description="Select the workout you wish to endure." />
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          v-for="(type, typeIndex) in Object.keys(WORKOUTS)"
          :key="typeIndex"
          @click="setPoison(type)"
          :class="{'border-blue-600': type === poison, 'border-blue-400': type !== poison}"
          class="bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg"
        >
          <p class="capitalize">{{ type.replaceAll('_', " ") }}</p>
        </button>
      </div>
      <CustomHeader index="02" title="Lock on targets" description="Select the muscles judged for annihilation." />
      <div class="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button @click="toggleModal" class="relative p-3 flex items-center justify-center">
          <p class="capitalize">{{ muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ') }}</p>
          <i class="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        <div v-if="showModal" class="flex flex-col px-3 pb-3">
          <button
            v-for="(muscleGroup, muscleGroupIndex) in getWorkoutGroups"
            :key="muscleGroupIndex"
            @click="updateMuscles(muscleGroup)"
            :class="{'text-blue-400': muscles.includes(muscleGroup), 'hover:text-blue-400 duration-200': true}"
          >
            <p class="uppercase">{{ muscleGroup.replaceAll('_', ' ') }}</p>
          </button>
        </div>
      </div>
      <Header index="03" title="Become Juggernaut" description="Select your ultimate objective." />
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          v-for="(scheme, schemeIndex) in Object.keys(SCHEMES)"
          :key="schemeIndex"
          @click="setGoalType(scheme)"
          :class="{'border-blue-600': scheme === goal, 'border-blue-400': scheme !== goal}"
          class="bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg px-4"
        >
          <p class="capitalize">{{ scheme.replaceAll('_', " ") }}</p>
        </button>
      </div>
      <button @click="updateWorkout" class="px-8 mx-auto py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200">
        <p>Formulate</p>
      </button>
    </div>
  </section>
  <!-- Render WorkoutSection conditionally -->
  <WorkoutSection ref="workoutSection" :workout="workout" header="Welcome To" :title="['The', 'Danger', 'Zone']" id="workout"/>
</template>

<script>
import { ref, computed } from 'vue'
import { SCHEMES, WORKOUTS } from '../utils/swoldier' // Ensure this path is correct
import CustomHeader from '@/components/CustomHeader.vue'
import WorkoutSection from '@/components/WorkoutSection.vue'
import { generateWorkout } from '../utils/functions'

export default {
  name: 'WorkoutGenerator',
  components: {
    CustomHeader,
    WorkoutSection
  },
  setup () {
    const muscles = ref([])
    const workoutSection = ref(null)
    const poison = ref('')
    const goal = ref('')
    const showModal = ref(false)
    const workoutGenerated = ref(false) // Flag to track if workout is generated
    const generatedWorkout = ref(null)
    const workout = ref(null)

    const setMuscles = (value) => {
      if (!value) {
        return
      }
      muscles.value = value
    }

    const setPoison = (value) => {
      poison.value = value
    }

    const setGoalType = (scheme) => {
      goal.value = scheme
    }

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const updateMuscles = (muscleGroup) => {
      if (muscles.value.includes(muscleGroup)) {
        muscles.value = muscles.value.filter((val) => val !== muscleGroup)
        return
      }

      if (muscles.value.length >= 3) { // Adjusted condition to allow for 3 muscles
        return
      }

      if (poison.value !== 'individual') {
        muscles.value = [muscleGroup] // Set muscles.value as an array with one muscleGroup
        showModal.value = false
        return
      }

      muscles.value.push(muscleGroup) // Push the muscleGroup into the array
      console.log('Muscles push:', muscles.value, 9)
      if (muscles.value.length === 3) {
        showModal.value = false
      }
    }

    const getWorkoutGroups = computed(() => {
      return poison.value === 'individual' ? WORKOUTS[poison.value] : Object.keys(WORKOUTS[poison.value])
    })

    const getSomeMuscleGroups = computed(() => {
      return muscles.value.slice(0, 3) // Slice to get up to the first 3 muscle groups
    })

    const updateWorkout = () => {
      const someMuscleGroups = getSomeMuscleGroups.value
      if (someMuscleGroups.length < 1) {
        return
      }

      const newWorkout = generateWorkout({ poison: poison.value, muscles: muscles.value, goal: goal.value })
      generatedWorkout.value = newWorkout
      console.log('No muscle groups selected.', generatedWorkout)
      workoutGenerated.value = true // Set flag to true once workout is generated
      workout.value = generatedWorkout.value

      // Check if workout data is generated
      if (!workout.value || workout.value.length === 0) {
        console.log(5) // Log 5 if no workout data is generated
      } else {
        // Console log the generated workout data
        console.log('Generated Workout Data:', workout.value)
      }

      // Scroll to workout section
      workoutSection.value.$el.scrollIntoView({ behavior: 'smooth' })
    }

    return {
      muscles,
      poison,
      goal,
      showModal,
      setMuscles,
      setPoison,
      setGoalType,
      toggleModal,
      updateMuscles,
      getWorkoutGroups,
      updateWorkout,
      workoutGenerated,
      generatedWorkout,
      SCHEMES,
      WORKOUTS,
      workoutSection,
      workout,
      getSomeMuscleGroups
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
