<template>
    <v-container>
        <v-layout column>
            <v-flex mb-3>
                <h2 class="headline">Product Home</h2>
            </v-flex>
            <router-view :product="product" />
        </v-layout>
    </v-container>
</template>
<script>
import api from'@/api/backend.js'

export default {
    data() {
        return {
            product: null,
        }
    },
    mounted() {
        api.get('/products/' + this.$route.params.id, { headers: {'Authorization': localStorage.ecomm_token}})
            .then(({data}) => {
                this.product = data
            })
            .catch(err => {
                swal.fire('Error', err.response.data,'error')
            })
    }
}
</script>

