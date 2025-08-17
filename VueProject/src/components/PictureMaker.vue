<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IActionResponse, ICustomer, IDerivedDataFilter } from '../models/interfaces';
import ApiServices from '@/services/ApiServices';

const props = defineProps({
  api: {
    type: ApiServices,
    required: true
  }
});

const api = props.api;
const sourceData = ref<IActionResponse>(null);
const processData = ref<IActionResponse>(null);

async function fetchData() {
    try { 
        let filter: IDerivedDataFilter = { 
            name: "Combined NCP (Miniature)", 
            compressedData: ""
        };
        api.getToken()
        .then(response => response.json())
        .then(token =>  {
            //console.log(`getToken: ${token.access_token}`);                
            return token.access_token;
        })
        .then(access_token => {                  
            const requestOptions = api.getRequestOptions(access_token, 'POST', filter);                
            api.fetchTyped<IActionResponse>(api.apiURL_PictureMaker_getSourceData, requestOptions)                                
            .then(data => {
                sourceData.value = data;
                filter.compressedData = data.content;

                const requestOptions2 = api.getRequestOptions(access_token, 'POST', filter);                
                api.fetchTyped<IActionResponse>(api.apiURL_PictureMaker_processData, requestOptions2)                                
                .then(data2 => {
                    processData.value = data2;
                })
                .catch(error => { 
                    console.error('Error:', error);
                });
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
  <div v-if="sourceData && processData">
    <p>time={{ processData.duration }}</p><p>length={{ processData.contentLenght }}</p>
    <img :src= "processData.content"></img>
  </div>
  <div v-else>Loading data...</div>
</template>

