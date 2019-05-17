<template>
  <div style="border-radius:0px !important;" class="addproduct productpic producttext border-0 card bg-dark text-white">
    <img src="../assets/dummy2.jpg" class="card-img " alt="...">
    <div class=" px-3 py-3 card-img-overlay">
      <div class="row no-gutters">
        <div class="col-7">
        </div>
        <div class="col-3" style="display:flex; flex-direction: column; align-content: flex-end">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBlock"
};
</script>

<style>

#addproduct {
  width : 50%;
  border-style : 1px solid grey !important;
  border-radius : 30px;
}

.productpic:hover button{
  background-color: rgb(214, 208, 208);
}


.productpic:hover {
  transition: 0.4s all;
  opacity: 0.9;
}


.producttext {
    list-style: none;
    display: inline-block;
}

.producttext {
    text-decoration: none;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    overflow: hidden;
    transition: 0.4s all;
}

.producttext:before {
    content: '';
    width: 60px;
    position: absolute;
    border-bottom: 2px solid #313131;
    bottom: 0;
    right: 350px;
    transition: 0.4s all;
}

.producttext:hover:before {
    right: 0;
}
</style>
