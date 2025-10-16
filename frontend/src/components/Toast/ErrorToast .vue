<template>
    <div class="customer-toast-error d-flex ga-2">
        <v-icon size="25" icon="mdi-alert-remove" color="#FFF" class="ccustomer-toast-error-icon error " />
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