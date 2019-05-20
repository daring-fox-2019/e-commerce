<template>
    <div class="container">
        <div class="mt-5">
            <h2 style="text-align:center">Shipping Address</h2>
        </div>
        <div>
            <form>
  <div class="form-row mt-3">
    <div class="form-group col-md-6">
      <label for="inputEmail4">First Name</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="First Name">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Last Name</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Last Name">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 1</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
  </div>
  <div class="d-flex justify-content-end">
  <button type="submit" class="btn btn-primary">Confirm</button>
  </div>
</form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'inputAddress'
}
</script>

<style>

</style>
