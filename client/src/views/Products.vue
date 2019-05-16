<template>
    <v-container fluid fill-height>
        <v-layout row wrap>
            <v-flex xs12 sm4 md4 lg3 v-for="n in 9" :key="n" pa-3>
                <ProductCard />
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
    components: {
        ProductCard,
    },
    data() {
        return {

        }
    },
}
</script>

