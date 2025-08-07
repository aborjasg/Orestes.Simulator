<template>
  <div onload="mounted();">
    <button @click="mounted">Invoke</button>
    <!-- <p>{{ data }}</p> -->
  </div>
</template>

<script>
export default {    
    methods: { 
        data() {
            return {
                data: []
            };
        },
        async mounted() {
            try {
                const apiURL = 'http://localhost:5062/api/WeatherForecast';
                const response = await fetch(apiURL);
                console.log(`apiURL: ${apiURL}`);
                let json = await response.json();
                this.data = JSON.stringify(json, null, 2);
                console.log(`data: ${ this.data }`);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>
