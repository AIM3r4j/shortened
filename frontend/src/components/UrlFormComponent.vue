<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-input
        v-model="url"
        label="URL"
        type="text"
        hint="ex: https://www.google.com"
        :rules="[
          (val) => !!val || 'URL is required',
          (val) => pattern.test(val) || 'Please enter a valid URL',
        ]"
      />
      <q-btn color="primary" label="Shorten" type="submit" />
    </q-form>
    <q-card v-if="shortenedUrl" class="text-center">
      <q-card-section>
        <h3>Shortened URL:</h3>
        <a :href="shortenedUrl">{{ shortenedUrl }}</a>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Notify } from 'quasar';
import axios from 'axios';

import Cookies from 'js-cookie';
export default defineComponent({
  name: 'UrlFormComponent',
  data() {
    let pattern =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return {
      url: '',
      shortenedUrl: '',
      pattern,
    };
  },
  methods: {
    async submit() {
      try {
        const token = `Bearer ${Cookies.get('jwt')}`;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/urls`,
          {
            originalUrl: this.url,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status == 201) {
          this.shortenedUrl = `${import.meta.env.VITE_FRONTEND_URL}/${
            response.data.url.urlId
          }`;
          Notify.create({
            color: 'positive',
            message: 'Url shortened successfully',
          });
        } else {
          throw new Error('Unable to shorten url');
        }
      } catch (error: typeof error) {
        Notify.create({
          color: 'negative',
          message: error.response.data.errors
            ? error.response.data.errors[0]
            : error.response.data.message,
        });
      }
    },
  },
});
</script>
<style scoped>
q-form {
  max-width: 400px;
  margin: 40px auto;
}

q-input {
  margin-bottom: 20px;
}

q-btn {
  width: 100%;
}

q-card {
  margin-top: 40px;
}

h3 {
  margin-bottom: 20px;
}

a {
  font-size: 18px;
}
</style>
