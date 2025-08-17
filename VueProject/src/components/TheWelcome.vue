<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import WeatherForecast from './WeatherForecast.vue'
import ApiServices from '@/services/ApiServices'
import Customers from './Customers.vue'
import PictureMaker from './PictureMaker.vue'

const props = defineProps({
  api: {
    type: ApiServices,
    required: true
  }
});

const api = props.api;

</script>

<template>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Weather Forecast</template>
    <WeatherForecast v-bind:api="api"></WeatherForecast>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Customers</template>
    <Customers v-bind:api="api"></Customers>    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Picture Maker</template>
    <PictureMaker v-bind:api="api"></PictureMaker>    
  </WelcomeItem>

</template>
