<template>
  <v-app>
    <template v-if="isAuthenticated && !isLoginPage">
      <v-layout class="rounded rounded-md border">
        <v-navigation-drawer permanent v-model="drawer">
          <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="user?.nome">
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list nav>
            <v-list-item v-for="(item, i) in linksNav" :title="item.title" :prepend-icon="item.icon" :to="item.to"
              :key="i" :value="item" color="primary" rounded="shaped">
            </v-list-item>

            <v-list-group value="Users">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-cogs" title="Users" color="primary"
                  rounded="shaped"></v-list-item>
              </template>
              <v-list-item v-for="(admin, i) in admins" :key="i" :prepend-icon="admin.icon" :title="admin.title"
                :to="admin.to" :value="admin.title" color="primary" rounded="shaped"></v-list-item>
            </v-list-group>

            <v-divider />
            <v-list-item title="Sair" prepend-icon="mdi-logout" @click="logout" link />
          </v-list>
        </v-navigation-drawer>

        <v-app-bar title="Gerencimento de Estoque " prepend-icon="mdi-warehouse">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </template>
        </v-app-bar>

        <v-main>
          <v-container>
            <router-view />
          </v-container>
        </v-main>
      </v-layout>
      <Toaster position="top-right" />
    </template>
    <template v-else>
      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "./composables/auth";
import 'vue-sonner/style.css'

const route = useRoute();
const drawer = ref(true)

const { isAuthenticated, user, logout } = useAuth();
const isLoginPage = computed(() => route.path === "/login");

const admins = [
  {
    title: 'Marcas',
    to: '/marcas',
    icon: 'mdi-tag-check-outline',
  },
  {
    title: 'Categorias',
    to: '/categorias',
    icon: 'mdi-umbrella-beach',
  },
]

const linksNav = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'mdi-view-dashboard',
  },
  {
    title: 'Produtos',
    to: '/produtos',
    icon: 'mdi-package-variant',
  },
  {
    title: 'Fornecedores',
    to: '/fornecedores',
    icon: 'mdi-truck',
  },

]

</script>
