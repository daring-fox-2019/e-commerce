<template>
    <v-container column>
        <h1>Add Product</h1>
        <ProductForm type="add"></ProductForm>
    </v-container>
</template>
<script>
import ProductForm from '@/components/ProductForm.vue'
export default {
    components: {
        ProductForm,
    },
    data() {
        return {

        }
    },
}
</script>