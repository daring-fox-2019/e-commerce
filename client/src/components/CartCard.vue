<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="1" class="px-0 border flex-center">
          <!-- <input type="checkbox"> -->
          <b-form-checkbox></b-form-checkbox>
        </b-col>
        <b-col cols="2" class="px-0 border flex-center">
          <div style="max-height: 80px; max-width:80px;">
            <img
              src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2018/9/18/29000392/29000392_2b37cf84-3c5a-40c9-8620-5f13fcf08e83_1280_1280.jpg"
              alt
              style="background:cover;width:100%"
            >
          </div>
        </b-col>
        <b-col cols="6" class="px-0 border">
          <b-row>
            <b-col>{Item Name}</b-col>
          </b-row>
          <b-row>
            <b-col>{Item Desc}</b-col>
          </b-row>
          <b-row>
            <b-col>{Item Seller}</b-col>
          </b-row>
        </b-col>
        <b-col cols="3" class="px-0 border d-flex justify-content-between align-items-center">
          <div>{quantity}</div>
          <div class="col px-0">
              <div class="d-flex justify-content-end">
                <div class="m-1"><i class="fas fa-heart"></i></div>
                <div class="m-1"><i class="far fa-trash-alt"></i></div>
              </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
};
</script>

<style>
</style>
