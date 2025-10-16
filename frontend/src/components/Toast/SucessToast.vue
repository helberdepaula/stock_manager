<template>
    <div class="customer-toast-sucesso d-flex ga-2">
        <v-icon size="25" icon="mdi-check-circle-outline" color="#aaf766" class="ccustomer-toast-sucesso-icon success " /> 
        <span>{{ message }}</span>
    </div>
</template>
<script setup lang="ts">
defineProps({
    message: {
        type: String,
        required: true
    }
});
</script>