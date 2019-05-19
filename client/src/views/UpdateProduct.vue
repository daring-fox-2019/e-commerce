<template>
    <v-layout>
    <ProductForm v-if="!$store.state.isLoading" type="update" @onupdate="updateProduct" :data="formData"></ProductForm>
        <v-container v-if="$store.state.isLoading" full-height fluid>
            <v-layout mb-5 align-center justify-center>
                <v-flex>
                    <Circle2 :size="'120px'"></Circle2>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
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
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            api.get('/products/' + this.$route.params.id, { headers: {'Authorization': localStorage.ecomm_token}})
            .then(({data}) => {
                this.formData = data
                console.log('updateproduct: fetch done..', this.formData);
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
            this.formData = data;
            let formData = this.getFormData(this.formData)

            const config = {
                headers: {
                    'Authorization': localStorage.ecomm_token
                }
            };
            
            this.$store.commit('setIsLoading', true);
            if(typeof(this.formData.image) === 'string') {
                console.log('normal upload...');
                formData = this.formData;
                
                api.put('/products/' + this.formData._id, formData, config)
                    .then(({data}) => {
                        swal.fire('Success', "Product updated successfully!", 'success')
                        this.$router.push('/products/' + this.formData._id)
                        this.$store.commit('setIsLoading', false);
                    })
                    .catch(err => {
                        this.$store.commit('setIsLoading', false);
                        swal.fire('Error', err.response.data, 'error')
                    })
            }
            else {
                console.log('upload with pic change...');
                api.put('/products/' + this.formData._id + '/pic', formData, config)
                    .then(({data}) => {
                        swal.fire('Success', "Product updated successfully!", 'success')
                        this.$router.push('/products/' + this.formData._id)
                        this.$store.commit('setIsLoading', false);
                    })
                    .catch(err => {
                        this.$store.commit('setIsLoading', false);
                        swal.fire('Error', err.response.data, 'error')
                    })
            }

        }
    },
}
</script>