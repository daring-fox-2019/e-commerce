import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin : '',
        cart : []
    },
    mutations : {
        setIsLogin(state, data){
            state.isLogin = data
            console.log('is login', state.isLogin);
            
        }
    },
    actions: {
        login(context,data){
            console.log('ini data store',data);
            axios({
                method : 'post',
                url : "http://localhost:3000/login",
                data : data
            })
            .then(({data}) =>{
                console.log('ini data di setelah login',data);
                context.commit('setIsLogin',true)
                localStorage.setItem('token',data.token),
                localStorage.setItem('userId',data.id),
                localStorage.setItem('fullName',`${data.firstName} ${data.lastName}`)
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
})