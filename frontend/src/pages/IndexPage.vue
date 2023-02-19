<template>
  <q-page class="row items-center justify-evenly">
    <url-form-component></url-form-component>
  </q-page>
</template>

<script lang="ts">
import UrlFormComponent from 'src/components/UrlFormComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { UrlFormComponent },
});
</script>
