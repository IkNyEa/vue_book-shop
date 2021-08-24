<template>
    <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="#39a9ed">
        <van-swipe-item v-for="(item, index) in banners.slice(0,5)" :key="index">
            <img :src="item.img_url" alt="">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        name: "HomeSwiper",
        props: {
            banners: Array,
            default() {
                return []
            }
        }
    }
</script>

<style scoped>
img {
    width:100%;
    height:auto !important;
}
</style>