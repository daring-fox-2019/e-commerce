<template>
        <tr>
        <td><img v-bind:src="image" class="img-thumbnail" style="width : 70px; height : 70px"> {{title}}</td>
        <td>{{price}}</td>
        <td> <input v-model= "quantity" value="1" type="number" style="width:60px" min="1" v-bind:max= "item.stock"></td>
        <td>{{ totalCount }}</td>
        <td><a v-on:click.prevent = "deleteCart" href="#">delete</a></td>
        </tr>
</template>

<script>
export default {
    props : ['item','cartId'],
    data () {
        return {
            title : '',
            price : null,
            quantity : 1,
            image : ''
        }
    },
    methods : {
        deleteCart() {
            // console.log(this.cartId)
            this.$emit('deleteCart',this.cartId)
        }
    },
    mounted () {
        this.image = this.item.image
        this.title = this.item.title
        this.price = this.item.price
        // this.$emit('cart')
    },
    computed : {
        totalCount () {
            return this.quantity * this.price
        }
    },
    watch : {
        quantity () {
            this.$emit('newCart',this.quantity,this.cartId)
        }
    }
}
</script>

<style>

</style>
