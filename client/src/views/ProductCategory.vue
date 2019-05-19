<template>
    <div>
        <h5>{{$route.query.category.charAt(0).toUpperCase() + $route.query.category.slice(1)}}</h5>
        <Card 
            :categories="categoryItems"
        >
        </Card>
    </div>
</template>

<script>
import api from '@/api/localapi'
import Card from '@/components/Card.vue'

export default {
    name: 'product-category',
    components: {
        Card,
    },
    data() {
        return {
            categoryItems : []
        }
    },
    methods: {
        fetchByCategory(query) { 
            api
            .get(`/products/category?category=${query}`)
            .then(({data}) => {
                this.categoryItems=data
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.fetchByCategory(this.$route.query.category)
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchByCategory(to.query.category)
        next()  
    }
}
</script>

<style>

</style>
