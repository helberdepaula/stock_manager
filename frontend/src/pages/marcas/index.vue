<template>
    <div>
        <v-card>
            <v-card-title>
                <v-row align="center" justify="space-between">
                    <v-col>
                        <div class="d-flex align-center">
                            <v-icon class="me-2">mdi-tag-check-outline</v-icon>
                            <v-breadcrumbs :items="breadcrumps"></v-breadcrumbs>
                        </div>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn href="/marcas/new" color="primary" prepend-icon="mdi-plus-circle-outline">
                            Novo Marca
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-row class="mb-4">
                    <v-col cols="12" md="4">
                        <v-text-field input-class="input-controll" v-model="search" prepend-inner-icon="mdi-magnify"
                            label="Buscar marcas..." hide-details @input="debouncedSearch" />
                    </v-col>
                </v-row>

                <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="marcas"
                    :items-length="totalItems" :loading="loading" item-value="id" @update:options="loadItems">
                    <template #item.createdAt="{ item }">
                        {{ formatDate(item.createdAt) }}
                    </template>
                    <template #item.updatedAt="{ item }">
                        {{ formatDate(item.updatedAt) }}
                    </template>
                    <template #item.actions="{ item }">
                        <v-btn icon="mdi-eye" size="small" variant="text" @click="viewFornecedor(item.id)" />
                        <v-btn icon="mdi-pencil" size="small" variant="text" @click="editFornecedor(item.id)" />
                        <v-btn icon="mdi-delete" size="small" variant="text" color="error"
                            @click="confirmDelete(item)" />
                    </template>

                    <template #no-data>
                        <div class="text-center py-4">
                            <v-icon size="64" color="grey">mdi-tag-check-outline</v-icon>
                            <p class="text-h6 mt-2">Nenhum marca encontrado</p>
                        </div>
                    </template>
                </v-data-table-server>
            </v-card-text>
        </v-card>

        <!-- Confirma a exclusão antes de excluir -->
        <v-dialog v-model="deleteDialog" max-width="400">
            <v-card>
                <v-card-title>Confirmar Exclusão</v-card-title>
                <v-card-text>
                    Tem certeza que deseja excluir o marca <strong>{{ serlectMarca?.nome }}</strong>?
                    Esta ação não pode ser desfeita.
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="deleteDialog = false">Cancelar</v-btn>
                    <v-btn color="error" @click="deleteFornecedor">Excluir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue"
import { format } from "date-fns";
import useToastCustom from "@/composables/toastCustom";
import { useRouter } from "vue-router";
import { useMarcas } from "@/composables/marcas";
import type { Marca } from "@/types/marcas.type";
const router = useRouter();
const toast = new useToastCustom()

const breadcrumps = [
    { title: 'Marcas', href: '/marcas' },
]

const {
    marcas,
    loading,
    errorMarca,
    totalItems,
    currentPage,
    itemsPerPage,
    fetchMarca,
    removerMarca
} = useMarcas()

// Estado local
const search = ref("")
const cnpj = ref("")
const cnpjMask = {
    mask: '##.###.###/####-##',
    tokens: {
        '#': { pattern: /[0-9]/ }
    }
};

const deleteDialog = ref(false)
const serlectMarca = ref<Marca | null>(null)

// Headers da tabela
const headers = ref([
    { title: "Nome", key: "nome", align: "start" },
    { title: "Criado em", key: "createdAt", align: "start", sortable: false },
    { title: "Atualizado em", key: "updatedAt", align: "start", sortable: false },
    { title: "Ações", key: "actions", align: "center", sortable: false },
] as const)

let searchTimeout: ReturnType<typeof setTimeout>
const debouncedSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        fetchData()
    }, 500)
}

const loadItems = ({ page, itemsPerPage: perPage }: { page: number, itemsPerPage: number }) => {
    itemsPerPage.value = perPage
    currentPage.value = page
    fetchData()
}

const fetchData = async () => {
    await fetchMarca({
        page: currentPage.value,
        limit: itemsPerPage.value,
        nome: search.value || undefined,
    })
}

const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy')
}
const formatCnpj = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

const viewFornecedor = (id: number) => {
    console.log('Visualizar fornecedor:', id)
}

const editFornecedor = (id: number) => {
    router.push('/marcas/edit/' + id)
}

const confirmDelete = (fornecedor: Marca) => {
    serlectMarca.value = fornecedor
    deleteDialog.value = true
}

const deleteFornecedor = async () => {
    if (!serlectMarca.value) return

    try {
        await removerMarca(serlectMarca.value.id)
        deleteDialog.value = false
        serlectMarca.value = null
    } catch (error) {
        console.error('Erro ao excluir fornecedor:', error)
    }
}

watch(errorMarca, (newError) => {
    if (newError) {
        toast.error(newError);
    }
})
//equivalente ao useeffect no react
onMounted(() => {
    fetchData()
})
</script>
