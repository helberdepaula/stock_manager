<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row align="center" justify="space-between">
          <v-col>
            <div class="d-flex align-center">
              <v-icon class="me-2">mdi-truck</v-icon>
              Fornecedores
            </div>
          </v-col>
          <v-col cols="auto">
            <v-btn 
              color="primary" 
              prepend-icon="mdi-plus"
              @click="showCreateDialog = true"
            >
              Novo Fornecedor
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      
      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Buscar fornecedores..."
              hide-details
              clearable
              @input="debouncedSearch"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="statusFilter"
              :items="statusOptions"
              label="Status"
              hide-details
              clearable
              @update:model-value="fetchData"
            />
          </v-col>
        </v-row>

        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="fornecedores"
          :items-length="totalItems"
          :loading="loading"
          item-value="id"
          @update:options="loadItems"
        >
          <template #item.cnpj="{ item }">
            {{ formatCnpj(item.cnpj) }}
          </template>
          
          <template #item.endereco="{ item }">
            {{ item.endereco?.municipio?.nome }}/{{ item.endereco?.municipio?.estado?.uf }}
          </template>
          
          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'ACTIVE' ? 'success' : 'error'"
              size="small"
            >
              {{ item.status === 'ACTIVE' ? 'Ativo' : 'Inativo' }}
            </v-chip>
          </template>
          
          <template #item.actions="{ item }">
            <v-btn
              icon="mdi-eye"
              size="small"
              variant="text"
              @click="viewFornecedor(item.id)"
            />
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="editFornecedor(item.id)"
            />
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click="confirmDelete(item)"
            />
          </template>
          
          <template #no-data>
            <div class="text-center py-4">
              <v-icon size="64" color="grey">mdi-truck-outline</v-icon>
              <p class="text-h6 mt-2">Nenhum fornecedor encontrado</p>
              <p class="text-body-2 text-medium-emphasis">
                {{ search ? 'Tente ajustar os filtros de busca' : 'Comece adicionando um novo fornecedor' }}
              </p>
            </div>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
    
    <!-- Diálogo de confirmação de exclusão -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o fornecedor <strong>{{ selectedFornecedor?.nome }}</strong>?
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

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useFornecedores } from "@/composables/useFornecedores"
import type { Fornecedor } from "@/types/fornecedor"

// Composables
const {
  fornecedores,
  loading,
  error,
  totalItems,
  currentPage,
  itemsPerPage,
  fetchFornecedores,
  removeFornecedor
} = useFornecedores()

// Estado local
const search = ref("")
const statusFilter = ref<string>()
const showCreateDialog = ref(false)
const deleteDialog = ref(false)
const selectedFornecedor = ref<Fornecedor | null>(null)

// Opções
const statusOptions = [
  { title: 'Ativo', value: 'ACTIVE' },
  { title: 'Inativo', value: 'INACTIVE' }
]

// Headers da tabela
const headers = ref([
  {
    title: "CNPJ",
    align: "start",
    sortable: false,
    key: "cnpj",
  },
  { title: "Nome", key: "nome", align: "start" },
  { title: "Localização", key: "endereco", align: "start", sortable: false },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "Ações", key: "actions", align: "center", sortable: false },
] as const)

// Debounce para busca
let searchTimeout: ReturnType<typeof setTimeout>
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchData()
  }, 500)
}

// Métodos
const loadItems = ({ page, itemsPerPage: perPage }: { page: number, itemsPerPage: number }) => {
  itemsPerPage.value = perPage
  currentPage.value = page
  fetchData()
}

const fetchData = async () => {
  await fetchFornecedores({
    page: currentPage.value,
    limit: itemsPerPage.value,
    search: search.value || undefined,
    status: statusFilter.value as 'ACTIVE' | 'INACTIVE' | undefined
  })
}

const formatCnpj = (cnpj: string) => {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

const viewFornecedor = (id: number) => {
  // Implementar visualização
  console.log('Visualizar fornecedor:', id)
}

const editFornecedor = (id: number) => {
  // Implementar edição
  console.log('Editar fornecedor:', id)
}

const confirmDelete = (fornecedor: Fornecedor) => {
  selectedFornecedor.value = fornecedor
  deleteDialog.value = true
}

const deleteFornecedor = async () => {
  if (!selectedFornecedor.value) return
  
  try {
    await removeFornecedor(selectedFornecedor.value.id)
    deleteDialog.value = false
    selectedFornecedor.value = null
  } catch (error) {
    console.error('Erro ao excluir fornecedor:', error)
  }
}

// Watchers
watch(error, (newError) => {
  if (newError) {
    console.error('Erro:', newError)
    // Aqui você pode mostrar um toast ou notificação
  }
})

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>
