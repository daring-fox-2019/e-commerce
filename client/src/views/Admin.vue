<template>
  <div>
    <v-layout>
      <v-flex xs2 offset-sm1>
        <v-layout row>
          <v-flex>
            <v-list>
              <v-list-tile to="/admin/addProduct">
                <v-list-tile-content>
                  <v-list-tile-title>Add Product</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile to="/admin/listProduct">
                <v-list-tile-content>
                  <v-list-tile-title>Products</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile to="/admin/listTransaction">
                <v-list-tile-content>
                  <v-list-tile-title>List Transaction</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs10>
        <router-view/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
