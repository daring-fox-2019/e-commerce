<template>
    <div class="container mt-5" >
        <div class="row " >
            <div class="col-2">
                <div class="row" style="height:80vh; overflow:scroll" >
                <router-link v-for= "(item,index) in items" :key = "index" v-bind:to= "'/item/' + params + '/' + item._id" class="mb-4" style="text-decoration:none;">
                    <div>
                        <img v-bind:src= "item.image" alt="item image" class="img-thumbnail"  />
                    </div>
                    <div style="height:60px; overflow:hidden">
                        <h4 style="color:grey">{{ item.title }}</h4>
                    </div>
                 <h6 class="card-subtitle mb-2 mt-1 text-muted">Rp.{{ item.price }}</h6>
                </router-link>
                </div>
            </div>
            <div class="col-10">
                    
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
    data () {
        return {
            items : [],
            params : ''
        }
    },
    methods : {
        fetchItem () {
            axios.get('/items')
            .then(({ data }) =>{
                this.items = data.filter (el =>{
                    return el.kategori == this.$route.params.kategori
                })
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },
    mounted () {
        this.params = this.$route.params.kategori
        this.fetchItem()
    },
    watch : {
        $route() {
            this.mounted()
        }
    }
}
</script>

<style>
.img-thumbnail {
    height: 200px;
    width: 200px
}
</style>
