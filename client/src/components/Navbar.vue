<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <router-link class="navbar-brand" to="/">
            <img src="../assets/icon/lennon.png" alt="" style="width: 15%;"> Beatlestuff
        
        </router-link>

        <div v-if="token" class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            
            <div class="mr-auto">
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Cart <span class="sr-only">(current)</span></a>
            </li>
            
            <li class="nav-item dropdown">
                <span 
                    class="nav-link dropdown-toggle cursor-pointer"
                    role="button" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                Dashboard
                </span>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link class="dropdown-item" :to="{ name : 'admin-list-product' }">Product List</router-link>
                    <router-link class="dropdown-item" :to="{ name : 'admin-create-product' }">Create Product</router-link>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Logout</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="left: -6em;">
                    
                <a class="dropdown-item" href="#">Edit Profile</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Logout</a>
                </div>
            </li>
            
            </ul>
        </div>

        <div v-else class="d-flex justify-content-end" style="width: 75%;">
            <div style="margin-right: 15px;">
                <router-link to="/signin">Sign In</router-link>
            </div>
            <div>
                <router-link to="/signup">Sign Up</router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
