<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import ApiServices from '@/services/ApiServices'

const api = new ApiServices();
const title = 'Orestes.Simulator';
const isAPIrunning = ref<Boolean>(false);

async function fetchData() {
    try { 
         api.getToken()
        .then(response =>  {
          let state = response.ok && response.status === 200;          
          console.log(`App|isAPIrunning=${state}`);       
          isAPIrunning.value = state;
        })
        .catch(() => {
          isAPIrunning.value = false;
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
    
    <header>
      <div class="wrapper">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />        
        <HelloWorld v-bind:title="title" :is_api_running="isAPIrunning" />
      </div>
    </header>

  <main>
    
  </main>

  <footer>
    <div v-if="isAPIrunning">
      <TheWelcome v-bind:api="api" />
    </div>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    align-items: center;
    align-content: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
