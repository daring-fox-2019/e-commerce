<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img src="https://www.flaticon.com/premium-icon/icons/svg/1770/1770739.svg" width="300" height="300">
    <p>
     Launched in 2012, Tocopedia is the number-one online shopping and selling destination in Southeast Asia <br>present in Indonesia, Malaysia, the Philippines, Singapore, Thailand and Vietnam. <br> With 300 million SKUs available, Tocopedia offers the widest range of products <br> in categories from beauty, fashion and consumer electronics to household goods, toys, sports equipment and groceries.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><router-link to="/login">login</router-link></li>
      <li><router-link to="/register">register</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  text-align: center
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
