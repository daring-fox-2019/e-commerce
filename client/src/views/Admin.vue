<template>
  <b-row>
    <b-container fluid>
      <b-row class="border">
        <b-col class="px-0">test</b-col>
      </b-row>
      <b-row>
        <b-col class="px-0">
          <b-tabs content-class="mt-3" class="mx-0">
            <b-tab title="First" active>
              <p>I'm the first tab</p>
            </b-tab>
            <b-tab title="Second">
              <p>I'm the second tab</p>
            </b-tab>
            <b-tab title="Disabled" disabled>
              <p>I'm a disabled tab!</p>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row>
        <b-col>test lagi</b-col>
      </b-row>
    </b-container>
  </b-row>
  <!-- <div>

  </div>-->
</template>

<script>
export default {
  name: "Admin"
};
</script>

<style>
</style>
