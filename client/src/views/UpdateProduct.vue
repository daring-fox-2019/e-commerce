<template>
    <ProductForm type="update" @onupdate="updateProduct" :data="formData"></ProductForm>
</template>
<script>
import ProductForm from '@/components/ProductForm.vue'
import api from'@/api/backend.js'

export default {
    components: {
        ProductForm,
    },
    data() {
        return {
            formData: null,
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            api.get('/products/' + this.$route.params.id, { headers: {'Authorization': localStorage.ecomm_token}})
            .then(({data}) => {
                console.log(this.internalProduct);
                this.formData = data
            })
            .catch(err => {
                swal.fire('Error', err.response.data,'error')
            })
        },
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
        updateProduct(data) {
            console.log(data, ' <---- update fired');
            this.formData = data
            const formData = this.getFormData(this.formData)

            const config = {
                headers: {
                    'Authorization': localStorage.ecomm_token
                }
            };

            api.put('/products', formData, config)
                .then(({data}) => {
                    swal.fire('Success', "Product updated successfully!", 'success')
                    this.$router.push('/products/' + this.$props.product._id)
                })
                .catch(err => {
                    swal.fire('Error', err.response.data, 'error')
                })
        }
    },
}
</script>