<template>
    <div id="header">
        <b-navbar toggleable="lg" variant="light">
            <router-link to="/"><b-navbar-brand class="ml-5"> E-Commerce</b-navbar-brand></router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
            </b-navbar-nav>

            <!-- Right aligned nav items -->

            <b-navbar-nav class="ml-auto">
                <div  class="d-flex align-items-center mr-2">
                    <b-button size="sm" variant="success"> <i class="fas fa-shopping-cart"></i> | <span class="badge badge-light">4 items</span> </b-button>
                </div>
                <div  class="d-flex align-items-center">
                    <b-button size="sm" variant="success"> <i class="fas fa-exchange-alt"></i> Transaction </b-button>
                </div>
                <div  class="d-flex align-items-center ml-2">
                    <b-button size="sm" variant="success" @click="back"> <i class="fas fa-arrow-left"></i> </b-button>
                </div>
                <div class="d-flex">
                    <b-nav-item-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template slot="button-content"> <b-button size="sm" variant="outline-success"> <i class="fas fa-cog"></i> </b-button> </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">My Product</b-dropdown-item>
                        <b-dropdown-item href="#">Sell Product</b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
                <div class="d-flex align-items-center">
                    <div>
                        <router-link to="/login">
                            <b-button size="sm" class="mr-2"> <i class="fas fa-torii-gate"></i> sign in </b-button>
                        </router-link>
                    </div>
                    <div>
                        <b-button size="sm" class="4 mr-5" variant="outline-secondary" @click.prevent="signOut"> <i class="fas fa-snowboarding"></i> sign out </b-button>
                    </div>
                </div>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
</template>

<script>
export default {
    methods: {
        signOut(){
            localStorage.clear()
        },
        back(){
            this.$router.go(-1)
        }
    }
};
</script>


<style scoped>
    #header {
        color : black;
    }
</style>
