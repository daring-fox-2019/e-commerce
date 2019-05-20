<template>
    <div>
        <h3>Your Order List</h3>
        <div>
            {{convertToRupiah(transaction[0].totalPayment)}} - 
            {{transaction[0].status}}
        </div>
        <button class="btn btn-danger" @click="delivered">
            Delivered Confirmation
        </button>
    </div>
</template>

<script>
import {convertToRupiah} from '@/helpers/convertToRupiah.js'
import api from '@/api/localapi'

export default {
    props: ['transaction'],
    methods: {
        convertToRupiah,
        delivered() {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .patch('/transactions/delivered')
            .catch(trans => {
                Swal.fire(
                    'Thank you!',
                    'success'
                )
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>
