<template>
    <v-container column>
        <h1>Add Product</h1>
        <ProductForm type="add" @onadd="createProduct"></ProductForm>
    </v-container>
</template>
<script>
import ProductForm from '@/components/ProductForm.vue'
import api from'@/api/backend.js'
import { close } from 'fs';

export default {
    components: {
        ProductForm,
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
            console.log(data, ' <---- create fire');
            this.formData = data
            const formData = this.getFormData(this.formData)

            const config = {
                headers: {
                    'Authorization': localStorage.ecomm_token
                }
            };

            api.post('/products', formData, config)
                .then(({data}) => {
                    console.log(`created successfully...${data}`);
                    this.$router.push('/products')
                })
                .catch(err => {
                    swal.fire('Error', err.response.data, 'error')
                })
        }
    },
}
</script>