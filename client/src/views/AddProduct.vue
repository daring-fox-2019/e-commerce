<template>
    <v-container column>
        <h1>Add Product</h1>
        <ProductForm v-if="!$store.state.isLoading" type="add" @onadd="createProduct"></ProductForm>
        <v-container full-height fluid>
            <v-layout mb-5 align-center justify-center>
                <v-flex>
                    <Circle2 v-if="$store.state.isLoading" :size="'120px'"></Circle2>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>
<script>
import ProductForm from '@/components/ProductForm.vue'
import api from'@/api/backend.js'
import {Circle2} from 'vue-loading-spinner';

export default {
    components: {
        ProductForm,
        Circle2,
    },
    data() {
        return {
            formData: null,
        }
    },
    methods: {
        getFormData(object) {
            const formData = new FormData();
            Object.keys(object).forEach(key => { 
                if(key === 'image') {
                    formData.append('image', object[key].data, object[key].name)
                }
                else formData.append(key, object[key])
            });

            return formData;
        },
        createProduct(data) {
            this.formData = data
            const formData = this.getFormData(this.formData)

            const config = {
                headers: {
                    'Authorization': localStorage.ecomm_token
                }
            };

            this.$store.commit('setIsLoading', true)
            api.post('/products', formData, config)
                .then(({data}) => {
                    this.$store.commit('setIsLoading', false);
                    this.$router.push('/products')
                })
                .catch(err => {
                    this.$store.commit('setIsLoading', false);
                    swal.fire('Error', err.response.data, 'error')
                })
        }
    },
}
</script>