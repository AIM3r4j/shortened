<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-input
        v-model="email"
        label="Email"
        type="email"
        :rules="[(val) => !!val || 'Email is required']"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        :rules="[(val) => !!val || 'Password is required']"
      />
      <q-btn color="primary" label="Login" type="submit" />
    </q-form>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Notify } from 'quasar';
import axios from 'axios';

import Cookies from 'js-cookie';
export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/login`,
          {
            email: this.email,
            password: this.password,
          }
        );
        if (response.status == 200) {
          Cookies.set('jwt', response.data.token, { expires: 7 });
          Notify.create({
            color: 'positive',
            message: 'User logged in successfully',
          });
          this.$router.push('/');
        } else {
          throw new Error('Unable to log in user');
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
  margin: 0 auto;
}

q-input {
  margin-bottom: 20px;
}

q-btn {
  width: 100%;
}
</style>
