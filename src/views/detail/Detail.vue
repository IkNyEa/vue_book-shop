<template>
  <div>
    <div>
    <nav-bar>
      <template v-slot:default>商品详情:{{id}}</template>
    </nav-bar>
  </div>
  <div style="margin-top: 50px">
    <van-image
        width=100%
        :src="detail.cover_url"
    />

    <van-card style="text-align: left"
        :num="detail.stock"
        :price="detail.price+'.00'"
        :desc="detail.description"
        :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button size="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button size="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">内容 2</van-tab>
      <van-tab title="相关读书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import {onMounted, reactive, ref,toRefs,onBeforeMount} from 'vue';
import {useRoute,useRouter}  from 'vue-router'
import {getDetail} from "network/detail";
import GoodsList from "components/content/goods/GoodsList";
import {addCart} from "network/cart";
import {Toast} from "vant";
import {useStore} from 'vuex';

export default {
  name: 'Detail',
  setup () {
    const route = useRoute();
    const router = useRouter()
    const store = useStore()
    let id =ref(0);
    let active = ref(0)
    let book = reactive({
      detail:{},
      like_goods:[]
    })
    const init=()=>{
      id.value =route.query.id;
      getDetail(id.value).then(res=>{
        console.log('********'+id.value)
        book.detail = res.goods;
        book.like_goods = res.like_goods;
      })
    }
    onMounted(()=>{
      init();
      console.log('******** mounted事件触发');
    })
    id.value = route.query.id;
    console.log('---------'+id.value)
    //添加购物车
    const handleAddCart = ()=>{
      addCart({goods_id:book.detail.id, num:1}).then(res=>{
        if(res.status === 204|| res.status === 201){
          Toast.success('添加成功')
          store.dispatch('updateCart')
        }
      })
    }

    const goToCart = ()=>{
      addCart({goods_id:book.detail.id, num:1}).then(res=>{
        if(res.status === 204|| res.status === 201){
          Toast.success('添加成功,显示购物车')
          store.dispatch('updateCart')
          router.push({path:'/shopcart'})
        }
      })
    }

    return{
      id,
      ...toRefs(book),
      active,
      handleAddCart,
      goToCart,
      init
    }
  },
  components: {
    GoodsList,
    NavBar,
  }
}
</script>
