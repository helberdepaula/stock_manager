<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Dashboard
          </v-card-title>
          <v-card-text>
            <div v-if="user">
              <p>Bem-vindo, {{ user.nome }}!</p>
              <p>Email: {{ user.email }}</p>
              <p>Perfil: {{ user.perfil }}</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="logout">
              Sair
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'

const { user, logout } = useAuth()
</script>
