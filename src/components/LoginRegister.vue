<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <AppHeader />
    <q-page-container>
      <q-page class="q-pa-md flex flex-center">
        <q-card class="bg-dark text-white q-pa-md card-container">
          <form @submit.prevent="handleSubmit">
            <div class="q-mb-sm">
              <label for="email" class="block text-xs font-medium text-grey-4">Email</label>
              <input v-model="email" type="email" id="email" required class="input-style" />
            </div>
            <div class="q-mb-sm">
              <label for="password" class="block text-xs font-medium text-grey-4">Password</label>
              <input v-model="password" type="password" id="password" class="input-style" required />
            </div>
            <div v-if="!isLogin" class="q-mb-sm">
              <label for="confirmPassword" class="block text-xs font-medium text-grey-4">Confirm Password</label>
              <input v-model="confirmPassword" type="password" id="confirmPassword" class="input-style" required />
            </div>
            <div class="text-center">
              <q-btn type="submit" :label="isLogin ? 'Sign In' : 'Register'" class="btn-style lod-background text-black" />
              <p @click="toggleAuthMode" class="q-mt-sm text-xs cursor-pointer hover:underline text-lod-custom">
                {{ isLogin ? "Don't have an account? Register" : "Already have an account? Sign In" }}
              </p>
            </div>
          </form>
          <q-banner v-if="errorMessage" dense class="bg-red text-white q-mt-sm text-center">
            {{ errorMessage }}
          </q-banner>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AppHeader from "@/components/AppHeader.vue";
import { useRoute } from 'vue-router';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

export default defineComponent({
  components: { AppHeader },
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');
    const isLogin = ref<boolean>(true);
    const errorMessage = ref<string>('');
    const route = useRoute();

    const resetForm = () => {
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      errorMessage.value = '';
    };

    const toggleAuthMode = () => {
      isLogin.value = !isLogin.value;
      errorMessage.value = '';
    };

    const handleSubmit = () => {
      isLogin.value ? signIn() : register();
    };

    const signIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        Cookies.set('user', JSON.stringify(userCredential.user), { path: '/', secure: true, sameSite: 'Strict' });
        window.location.href = '/main';
      } catch (error: any) {
        handleAuthError(error);
      }
    };

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match';
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        Cookies.set('user', JSON.stringify(userCredential.user), { path: '/', secure: true, sameSite: 'Strict' });
        window.location.href = '/main';
      } catch (error: any) {
        handleAuthError(error);
      }
    };

    const handleAuthError = (error: any) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email address. Please check and try again.';
          break;
        case 'auth/user-disabled':
          errorMessage.value = 'This user account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage.value = 'No user found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage.value = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-credential':
          errorMessage.value = 'Invalid login credentials. Please check your email and password.';
          break;
        case 'auth/email-already-in-use':
          errorMessage.value = 'This email is already in use. Please use a different email or log in.';
          break;
        case 'auth/weak-password':
          errorMessage.value = 'The password is too weak. Please use a stronger password.';
          break;
        default:
          errorMessage.value = `Firebase Error: ${error.message}`;
          break;
      }
    };

    onMounted(() => {
      resetForm();
    });

    watch(route, () => {
      resetForm();
    });

    return {
      email,
      password,
      confirmPassword,
      isLogin,
      errorMessage,
      toggleAuthMode,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.q-layout, .q-page, .q-card, .row, .col, .q-banner, span, div {
  font-size: 12px;
}

.card-container {
  border-radius: 16px;
  width: 340px;
  padding: 16px;
  background-color: #2C2C2E;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12);
}

.input-style {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #1E1E1E;
  color: white;
}

.input-style:focus {
  border-color: #BFF589;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
  outline: none;
}

.btn-style {
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
}
</style>
