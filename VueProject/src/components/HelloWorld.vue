<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  is_api_running: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ title }}</h1>
    <div v-if="is_api_running">
      <i>Connected to Orestes.Simulator API services...🎉</i>
    </div>
    <div v-else>
      <p>No access to Orestes.Simulator API services</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
