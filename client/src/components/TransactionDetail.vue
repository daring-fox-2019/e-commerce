<template>
  <b-col>
    <b-row>
        Transaction Detail
    </b-row>
    <b-row>
        <b-col cols=1 class="border">
            1
        </b-col>
        <b-col cols=6 class="border">
            {Item name}
        </b-col>
        <b-col cols=2 class="border">
            {Qty}
        </b-col>
        <b-col cols=3 class="border">
            {Total}
        </b-col>
    </b-row>
    <b-row>
        <b-col cols=9 class="border d-flex justify-content-end">
            Total Price :
        </b-col>
        <b-col cols=3 class="border">
            {Sum Total}
        </b-col>
    </b-row>

    <b-row class="border">
        Status: {Status}
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: 'transaction-detail',
};
</script>

<style>
</style>
