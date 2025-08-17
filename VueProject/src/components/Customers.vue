<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ICustomer } from '../models/interfaces';
import ApiServices from '@/services/ApiServices';

const props = defineProps({
  api: {
    type: ApiServices,
    required: true
  }
});

const api = props.api;
const list = ref<ICustomer[]>([]);

async function fetchData() {
    try { 
        api.getToken()
        .then(response => response.json())
        .then(token =>  {
            //console.log(`getToken: ${token.access_token}`);                
            return token.access_token;
        })
        .then(access_token => {                  
            const requestOptions = api.getRequestOptions(access_token, 'GET', null);                
            api.fetchTyped<ICustomer[]>(api.apiURL_Customers, requestOptions)                                
            .then(data => {
                //console.log(`getCustomer: data=${JSON.stringify(data)}`);
                list.value = data;
            })
            .catch(error => { 
                console.error('Error:', error);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });        
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
        [{{ item.id }}] | {{ item.name }}
      </li>
    </ul>
  </div>
  <div v-else>Loading data...</div>
</template>