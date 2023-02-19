<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-input
        v-model="name"
        label="Name"
        type="text"
        :rules="[(val) => !!val || 'Name is required']"
      />
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
      <q-btn color="primary" label="Register" type="submit" />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';
export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/register`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        );
        if (response.status == 201) {
          Notify.create({
            color: 'positive',
            message: 'User registered successfully',
          });
          this.$router.push('/login');
        } else {
          throw new Error('Unable to register user');
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
