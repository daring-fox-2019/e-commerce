<template>
  <b-col class="pl-5">
    <b-row>
        Transaction Detail
    </b-row>
    <b-row>
        <b-col cols=1 class="border py-1 text-center px-1">
            No
        </b-col>
        <b-col cols=6 class="border py-1 text-center">
           Item Name
        </b-col>
        <b-col cols=2 class="border py-1 text-center">
            Qty
        </b-col>
        <b-col cols=3 class="border py-1 px-0 text-center">
            Total
        </b-col>
    </b-row>
    <b-row>
        <b-col cols=1 class="border py-1">
            1
        </b-col>
        <b-col cols=6 class="border py-1">
            {Item name}
        </b-col>
        <b-col cols=2 class="border py-1">
            {Qty}
        </b-col>
        <b-col cols=3 class="border py-1 px-0">
            {Total}
        </b-col>
    </b-row>
    <b-row>
        <b-col cols=9 class="border py-1 d-flex justify-content-end">
            Total Price :
        </b-col>
        <b-col cols=3 class="border py-1 px-0">
            {Sum Total}
        </b-col>
    </b-row>

    <b-row class="border py-1 px-3">
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
