<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex><h1>USER PAGE for {{user.firstname}} {{user.lastname}}</h1></v-flex>
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

