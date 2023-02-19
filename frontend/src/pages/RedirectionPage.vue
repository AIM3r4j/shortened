<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';
import Cookies from 'js-cookie';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'RedirectionPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(async () => {
      try {
        const urlId = route.params.urlId;
        const token = `Bearer ${Cookies.get('jwt')}`;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/urls/${urlId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status == 200) {
          window.location.href = response.data.url.originalUrl;
          return;
        } else {
          throw new Error('Unable to fetch url');
        }
      } catch (error: typeof error | object) {
        router.push('/');
        Notify.create({
          color: 'negative',
          message: error.response.data.errors
            ? error.response.data.errors[0]
            : error.response.data.message,
        });
      }
    });

    return {};
  },
});
</script>
