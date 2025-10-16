<template>
    <div>
        <v-card>
            <v-card-title>
                <v-row align="center" justify="space-between">
                    <v-col>
                        <div class="d-flex align-center">
                            <v-icon class="me-2">mdi-truck</v-icon>
                            <v-breadcrumbs :items="breadcrumps"></v-breadcrumbs>
                        </div>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-tabs v-model="tab" bg-color="gost">
                    <v-tab value="one">Dados</v-tab>
                </v-tabs>
                <v-divider class="mb-5"></v-divider>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one">
                        <Cadastro />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import Cadastro from '@/components/fornecedores/Cadastro.vue';
import { ref } from 'vue';

const tab = ref(null)
const breadcrumps = [
    { title: 'Fornecedores', href: '/fornecedores' },
    { title: 'Cadastrar', href: 'fornecedores' }
];

</script>
