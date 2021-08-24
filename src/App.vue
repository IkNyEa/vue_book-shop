<template>

<!--  <router-view/>用于路由跳转缓存遗留问题 重新加载  待解决 -->
  <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div  class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div  class="icon">
        <van-badge :content="$store.state.cartCount" max="10">
          <img alt=""  src="./assets/images/trolley.svg"/>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div  class="icon"><i class="iconfont icon-yonghu"></i></div>
      <div>个人中心</div>
    </router-link>

  </div>
</template>

<script>
import {onMounted} from 'vue';
import {useStore} from 'vuex';
export default {
  setup() {
    const store = useStore();
    onMounted(()=>{
    store.dispatch("updateCart")

    })
  }
}
</script>

<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/alicon/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color:#F6F6F6;
  display: flex;
  position: fixed;
  left:0;
  right:0;
  bottom:0;
  box-shadow: 0 -3px 1px  rgba(131, 131, 131, 0.2);
  z-index: 11;

  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }

  .tab-bar-item {
    flex:1 ;
    justify-content: center;
    height:50px;
    font-size:var(--font-size);
    img{
      z-index: 11;
    }
  }
  .tab-bar-item .icon {
    width:24px;
    height:24px;
    margin-top: 5px;
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
