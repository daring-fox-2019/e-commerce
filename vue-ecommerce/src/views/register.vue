<template>
  <div class="ecommerce mt-3" style="color : green">
    <div class='d-flex col-12 justify-content-center'>
      <div class="row card col-6" style="background-color: antiqueWhite">
        <h1 class="card-header" style="font-family : 'Fugaz One',serif; color : green">JajanMas</h1>
        <div class="card-body">
          <b><h5> Register Here</h5></b>
          <hr>
          <div>
            <b-form @submit.prevent="register">
              <b-form-group
                id="input-group-1"
                label="First Name:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  type="text"
                  required
                  v-model="form.firstName"
                  placeholder="your first name.."
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Last Name:"
                label-for="input-1"
                >
                <b-form-input
                  id="input-1"
                  type="text"
                  required
                  v-model="form.lastName"
                  placeholder="your last name.."
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  v-model="form.email"
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="password"
                  required
                  v-model="form.password"
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="success">register</b-button>
            </b-form>
              <br>
              <h4>already have an account? login below!</h4>
              <router-link to="/login" class="btn btn-success" variant="primary">login</router-link>
          </div>
        </div>
      </div>
    </div>
    <br>
      <div class="card col-2 offset-5" style="background-color: antiqueWhite">
        <h4>Back to Homepage?</h4>              
        <router-link to="/" class="btn btn-success" variant="primary">homepage</router-link>
      </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            form : {
                firstName : '',
                lastName : '',
                email : '',
                password : ''
            }
        }
    },
    methods : {
        register(){
            let user;
            axios({
                method : 'post',
                url : 'http://localhost:3000/register',
                data : {
                    firstName : this.form.firstName,
                    lastName : this.form.lastName,
                    email : this.form.email,
                    password: this.form.password
                }
            })
            .then(({data}) =>{
                console.log('masuk register client success');
                
                user = data
                return axios({
                    method : 'post',
                    url : 'http://localhost:3000/carts',
                    data : {
                        userId : data._id
                    }
                })
            })
            .then(cart =>{
                Swal.fire('user successfully registered' ,'Please Login','success')
                this.$router.push('/login')
                // res.status(201).json(user)
            })
            .catch(err=>{
                console.log(err);
                // res.status(500).json({
                //     msg: `internal server error`
                // })
            })
        }
    },
    components : {

    },
    computed : {

    },
    created(){

    }
}
</script>
