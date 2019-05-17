<template>
    <div class="container">
        <div class="row">
            <div class="col xs-12">
            <img class="py-2 img-fluid" src="../assets/landing3.jpg">
            </div>
        </div>

        <div class="row">
            <div class="col xs-2"><ImageBlock></ImageBlock></div>
            <div class="col xs-2"><ImageBlock></ImageBlock></div>
            <div class="col xs-2"><ImageBlock></ImageBlock></div>
            <div class="col xs-2"><ImageBlock></ImageBlock></div>
            <div class="col xs-2"><ImageBlock></ImageBlock></div>

        </div>

        <div class="row">
            <div class="col-sm-12 col-md-4"><ImageBlock ></ImageBlock></div>
            <div class="col-sm-12 col-md-4"><ImageBlock></ImageBlock></div>
            <div class="col-sm-12 col-md-4"><ImageBlock></ImageBlock></div>

        </div>

    </div>
</template>

<script>
import ImageBlock from '@/components/ImageBlock'
export default {
    components : {
        ImageBlock
    }
};
</script>

<style scoped>
.coba {
    max-width: 200vh;
    position: relative;
    z-index: -99999;
}

</style>
