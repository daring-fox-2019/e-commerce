<template>
    <v-container fluid fill-height>
        <v-layout column align-start>
            <div class="headline mb-3">Homepage for user: <span class="headline font-weight-bold yellow--text">{{user.firstname}} {{user.lastname}}</span></div>
            <router-view />
        </v-layout>
    </v-container>
</template>
<script>
export default {
    props: ['user'],
    mounted() {
        if(!this.$props.user) {
            this.$router.push('/login')
        }
    },
}
</script>

