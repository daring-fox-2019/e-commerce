<template>
    <div class="card">
        <div class="row">
            <div class="col-md-12">
                <h5>User Profile</h5>
            </div>
            <div class="col-md-3">
                <div class="card-title">{{user.name}}</div>
                <router-link :to="/user/+($route.params.id)+'/profile'">Profile</router-link>
                <router-link :to="/user/+($route.params.id)+'/transaction'">Transaction</router-link>
                <div class="card-body">
                    <router-view
                        :user="user"
                        :transaction="transaction"
                    ></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/localapi'
import UserProfile from '@/components/UserProfile.vue'
import UserTransaction from '@/components/UserTransaction.vue'

export default {
    data() {
        return {
            user: {},
            transaction: {}
        }
    },
    components: {
        UserProfile,
        UserTransaction
    },
    methods: {
        getUser() {
            api
            .get(`/users/${this.$route.params.id}`)
            .then(({data}) => {
                this.user = data
            })
            .catch(err => {
                console.log(err);
            })
        },
        getUserTransaction() {
            api
            .get(`/transactions`)
            .then(({data}) => {
                this.transaction=data
            })
            .catch(err=> {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getUser()
        this.getUserTransaction()
    },
}
</script>

<style>

</style>
