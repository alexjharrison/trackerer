<template>
  <div class="flex">
    <form @submit.prevent="save('Ally')" class="w-sm p-4">
      <h2 class="text-center p-4">Ally</h2>
      <input step=".1" class="border border-black p-1 rounded-lg w-full" v-model="allyWeight" type="number"
        name="weight" id="weight-ally">
      <div class="flex justify-center">
        <button :disabled="hasAllyPostedToday" type="submit"
          class="bg-pink-500 text-gray-950 p-1 my-1 rounded disabled:bg-pink-300 cursor-pointer disabled:cursor-default">Save
          for Ally</button>
      </div>
      <div v-for="weight in allyWeights" :key="weight.id">
        <pre>{{ weight }}</pre>
      </div>
    </form>
    <form @submit.prevent="save('Alex')" class="w-sm p-4">
      <h2 class="text-center p-4">Alex</h2>
      <input step=".1" class="border border-black p-1 rounded-lg w-full" v-model="alexWeight" type="number"
        name="weight" id="weight-alex">
      <div class="flex justify-center">
        <button :disabled="hasAlexPostedToday" type="submit"
          class="bg-pink-500 text-gray-950 p-1 my-1 rounded disabled:bg-pink-300 cursor-pointer disabled:cursor-default">Save
          for Alex</button>
      </div>
      <div v-for="weight in alexWeights" :key="weight.id">
        <pre>{{ weight }}</pre>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">
import type { User } from './types';

const { alexWeights, allyWeights, postWeight, hasAlexPostedToday, hasAllyPostedToday } = useWeights()
const alexWeight = ref<number | null>(null)
const allyWeight = ref<number | null>(null)

function save(user: User) {
  if (user === 'Alex' && !hasAlexPostedToday) return
  if (user === 'Ally' && !hasAllyPostedToday) return
  const weight = user === 'Alex' ? alexWeight.value : allyWeight.value
  if (!weight) return
  postWeight({
    user, reading: weight, date: new Date().toUTCString()
  })
  alexWeight.value = null
  allyWeight.value = null
}
</script>