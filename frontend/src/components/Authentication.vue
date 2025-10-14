<template>
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-img 
            class="mx-auto my-6" 
            max-width="228"
            src="https://norven.com.br/wp-content/uploads/2023/08/logo-top.svg"
          />
        </v-col>
      </v-row>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="500" rounded="lg">
        <v-alert
          v-if="error"
          type="error"
          closable
          @click:close="clearError()"
          class="mb-4"
        >
          {{ error.message }}
        </v-alert>

        <v-row>
          <v-col cols="12" md="12">
            <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>
            <v-text-field 
              density="compact" 
              placeholder="Email address" 
              :error-messages="email.errorMessage.value"
              v-model="email.value.value" 
              prepend-inner-icon="mdi-email-outline" 
              variant="outlined"
              :disabled="isLoading"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <div class="text-subtitle-1 text-medium-emphasis">Senha</div>
            <v-text-field 
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
              :type="visible ? 'text' : 'password'"
              density="compact" 
              placeholder="Enter your password" 
              prepend-inner-icon="mdi-lock-outline"
              v-model="password.value.value" 
              :error-messages="password.errorMessage.value" 
              variant="outlined"
              :disabled="isLoading"
              @click:append-inner="visible = !visible"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <v-btn 
              class="mb-8" 
              color="blue" 
              size="large" 
              variant="tonal" 
              block 
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
            >
              Entrar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuth } from '@/composables/useAuth'

const visible = ref(false)
const { login, isLoading, error, clearError } = useAuth()

const { handleSubmit } = useForm({
  validationSchema: {
    password(value: string) {
      if (value?.length >= 6) return true
      return 'Senha deve ter pelo menos 6 caracteres'
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Email deve ser válido'
    }
  }
})

const password = useField('password')
const email = useField('email')

const submitForm = handleSubmit(async (values) => {
  await login({
    email: values.email,
    password: values.password
  })
})
</script>
