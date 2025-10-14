<template>
  <v-app>
    <!-- Layout para páginas internas (usuário logado) -->
    <template v-if="isAuthenticated && !isLoginPage">
      <v-layout class="rounded rounded-md border">
        <v-navigation-drawer>
          <v-list nav>
            <v-list-item
              title="Dashboard"
              prepend-icon="mdi-view-dashboard"
              to="/"
              link
            />
            <v-list-item
              title="Produtos"
              prepend-icon="mdi-package-variant"
              to="/produtos"
              link
            />
            <v-list-item
              title="Estoque"
              prepend-icon="mdi-warehouse"
              to="/estoque"
              link
            />
            <v-list-item
              title="Fornecedores"
              prepend-icon="mdi-truck"
              to="/fornecedores"
              link
            />
            <v-divider />
            <v-list-item title="Sair" prepend-icon="mdi-logout" @click="logout" link />
          </v-list>
        </v-navigation-drawer>

        <v-app-bar title="Stock Manager">
          <template #append>
            <v-chip v-if="user" color="primary" variant="outlined">
              {{ user.nome }}
            </v-chip>
          </template>
        </v-app-bar>

        <v-main class="d-flex justify-center">
          <v-container class="pt-350" fluid>
            <router-view />
          </v-container>
        </v-main>
      </v-layout>
    </template>

    <!-- Layout para páginas públicas (login, etc.) -->
    <template v-else>
      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const route = useRoute();
const { isAuthenticated, user, logout } = useAuth();
const isLoginPage = computed(() => route.path === "/login");
</script>
