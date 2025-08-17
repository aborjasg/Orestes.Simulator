<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IWeatherForecast } from '../models/interfaces';
import ApiServices from '@/services/ApiServices';

const props = defineProps({
  api: {
    type: ApiServices,
    required: true
  }
});

const api = props.api;
const list = ref<IWeatherForecast[]>([]);

async function fetchData() {
  try { 
        const response = await fetch(api.apiURL_WeatherForecast);        
        console.log(`WeatherForecast|response: ${ response.status } - ${ response.statusText }`);
        list.value = await response.json() as IWeatherForecast[];    
        //console.log(`data: ${ JSON.stringify(list.value, null, 2) }`);
    } catch (error) {
        console.error(error);
    }
}

onMounted( async () => {
    fetchData();
});
</script>

<template>  
  <div v-if="list.length > 0">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item.date }} | {{ item.temperatureC }}°C | {{ item.summary }}
      </li>
    </ul>
  </div>
  <div v-else>Loading data...</div>
</template>