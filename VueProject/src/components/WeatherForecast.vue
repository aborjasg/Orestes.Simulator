<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface WeatherForecast {
  date: String;
  temperatureC: Number;
  summary: String;
}

let list: WeatherForecast[] = [];
let data: string = "";

onMounted( async () => {
    try {
        console.log(`data: ${ data }`);
        const apiURL = 'http://localhost:5062/api/WeatherForecast';
        const response = await fetch(apiURL);
        console.log(`apiURL: ${apiURL}`);
        list = await response.json() as WeatherForecast[];    
        data = JSON.stringify(list, null, 2);
        console.log(`data: ${ data } - list: ${list.length}`);
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
  <div>
    <p v-if="list.length>0">{{ list[0].date }}</p>
    <p v-else>Loading data...</p>
  </div>
</template>