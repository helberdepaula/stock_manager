<template>
    <form @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="3">
                <v-btn type="button" @click="addField" prepend-icon="mdi-plus-circle-outline">
                    Add novo contato
                </v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn type="submit" color="primary" prepend-icon="mdi-content-save-outline" :loading="loading">
                    Salvar contatos
                </v-btn>
            </v-col>
        </v-row>

        <div v-for="field in formFields" :key="field.id" class="form-field-group">
            <v-row>
                <v-col cols="8">
                    <v-text-field 
                        v-model="field.value" 
                        :label="`Telefone ${field.id}`"
                        placeholder="+55 (00) 0 0000-0000"
                        hint="Digite o telefone completo com código do país"
                        persistent-hint
                        :error-messages="field.error"
                        @input="validatePhone(field)"
                    ></v-text-field>
                </v-col>
                <v-col cols="4" class="d-flex align-center">
                    <v-btn 
                        v-if="formFields.length > 1"
                        type="button" 
                        @click="removeField(field.id)" 
                        color="error" 
                        variant="outlined"
                        size="small"
                    >
                        <v-icon icon="mdi-trash-can-outline"></v-icon>
                        Remover
                    </v-btn>
                </v-col>
            </v-row>
            <v-divider class="mb-5"></v-divider>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { useFornecedores } from '@/composables/fornecedores';
import useToastCustom from '@/composables/toastCustom';
import type { CreateContatoDto } from '@/types/fornecedores-type';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const toast = new useToastCustom();
const { id } = route.params as { id: string };
const { createContatoFornecedor, contatosFornecedo, getContatoFornecedor, loading } = useFornecedores()

// Interface para os campos do formulário
interface FormFieldWithError {
    id: number;
    value: string;
    error?: string;
}

const formFields = ref<FormFieldWithError[]>([
    { id: 1, value: '', error: '' }
]);

let nextId = 2;

const addField = () => {
    formFields.value.push({
        id: nextId++,
        value: '',
        error: ''
    });
};

const removeField = (idToRemove: number) => {
    if (formFields.value.length > 1) {
        formFields.value = formFields.value.filter(field => field.id !== idToRemove);
    }
};

// Função para validar telefone
const validatePhone = (field: FormFieldWithError) => {
    field.error = '';
    
    if (!field.value) {
        field.error = 'Telefone é obrigatório';
        return false;
    }

    // Remove todos os caracteres não numéricos
    const cleanPhone = field.value.replace(/\D/g, '');
    
    // Verifica se tem pelo menos 10 dígitos (DDD + número)
    if (cleanPhone.length < 10) {
        field.error = 'Telefone deve ter pelo menos 10 dígitos';
        return false;
    }

    return true;
};

// Função para extrair código, DDD e número do telefone
const parsePhone = (phoneValue: string): CreateContatoDto | null => {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phoneValue.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) {
        return null;
    }

    let codigo = '55'; // Código padrão do Brasil
    let ddd = '';
    let numero = '';

    if (cleanPhone.startsWith('55') && cleanPhone.length >= 12) {
        // Formato com código do país: 5511999999999
        codigo = cleanPhone.substring(0, 2);
        ddd = cleanPhone.substring(2, 4);
        numero = cleanPhone.substring(4);
    } else if (cleanPhone.length === 11) {
        // Formato sem código do país: 11999999999
        ddd = cleanPhone.substring(0, 2);
        numero = cleanPhone.substring(2);
    } else if (cleanPhone.length === 10) {
        // Formato antigo sem o 9: 1199999999
        ddd = cleanPhone.substring(0, 2);
        numero = cleanPhone.substring(2);
    } else {
        // Tentar extrair baseado no tamanho
        const phoneLength = cleanPhone.length;
        if (phoneLength >= 13) {
            // Assumir que tem código do país
            codigo = cleanPhone.substring(0, 2);
            ddd = cleanPhone.substring(2, 4);
            numero = cleanPhone.substring(4);
        } else {
            // Assumir que não tem código do país
            ddd = cleanPhone.substring(0, 2);
            numero = cleanPhone.substring(2);
        }
    }

    return {
        codigo,
        ddd,
        numero
    };
};

const handleSubmit = async () => {
    // Validar todos os campos
    let isValid = true;
    const validatedFields = formFields.value.map(field => {
        const fieldValid = validatePhone(field);
        if (!fieldValid) {
            isValid = false;
        }
        return field;
    });

    if (!isValid) {
        toast.error('Por favor, corrija os erros nos telefones');
        return;
    }

    // Converter para o formato CreateContatoDto[]
    const contatosData: CreateContatoDto[] = [];
    
    for (const field of formFields.value) {
        if (field.value.trim()) {
            const parsedPhone = parsePhone(field.value);
            if (parsedPhone) {
                contatosData.push(parsedPhone);
            } else {
                toast.error(`Erro ao processar o telefone: ${field.value}`);
                return;
            }
        }
    }

    if (contatosData.length === 0) {
        toast.error('Adicione pelo menos um telefone válido');
        return;
    }

    try {
        console.log('Dados a serem enviados:', contatosData);
        
        const response = await createContatoFornecedor(Number(id), contatosData);
        
        if (response) {
            toast.success('Contatos salvos com sucesso!');
            
            // Recarregar os contatos após salvar
            await getContatoFornecedor(Number(id));
            
            // Limpar o formulário
            formFields.value = [{ id: 1, value: '', error: '' }];
            nextId = 2;
        }
    } catch (error) {
        console.error('Erro ao salvar contatos:', error);
        toast.error('Erro ao salvar contatos');
    }
};

// Carregar contatos existentes e popular o formulário
watch(contatosFornecedo, (data) => {
    if (data && data.length > 0) {
        // Limpar campos atuais
        formFields.value = [];
        
        // Adicionar campos baseados nos contatos existentes
        data.forEach((contato, index) => {
            const phoneFormatted = `+${contato.codigo} (${contato.ddd}) ${contato.numero}`;
            formFields.value.push({
                id: index + 1,
                value: phoneFormatted,
                error: ''
            });
        });
        
        nextId = data.length + 1;
        
        // Se não há contatos, manter pelo menos um campo vazio
        if (formFields.value.length === 0) {
            formFields.value = [{ id: 1, value: '', error: '' }];
            nextId = 2;
        }
    }
});

onMounted(() => {
    getContatoFornecedor(Number(id));
});
</script>


<style scoped>
.form-field-group {
    margin-bottom: 10px;
}

input {
    margin-right: 5px;
}
</style>