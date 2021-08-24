<template>
  <div class="address-edit-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        {{title}}
      </template>
    </nav-bar>

    <van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import { reactive, onMounted, toRefs, computed } from 'vue'
  import { Toast } from 'vant'
  import {addAddress, EditAddress, DeleteAddress, getAddressDetail} from 'network/address';
  import {tdist} from 'utils/address';
  import { useRoute, useRouter } from 'vue-router'


  export default {
    components: {
      NavBar
    },
    setup() {
      const route = useRoute()
      const router = useRouter()

      const state = reactive({
        areaList: {
          province_list: {},
          city_list: {},
          county_list: {}
        },
        searchResult: [],
        addressInfo:{},
        type:'add',
        addressId: '',
        title:''
      })

      onMounted(() => {
          // 省市区 列表 构造出来
          let _province_list = {};
          let _city_list = {};
          let _county_list = {};

          tdist.getLev1().forEach(p=>{
            _province_list[p.id] = p.text;
            tdist.getLev2(p.id).forEach(c=>{
              _city_list[c.id] = c.text;
              tdist.getLev3(c.id).forEach(q => {
                _county_list[q.id] = q.text;
              })
            })
          })

          state.areaList.province_list = _province_list;
          state.areaList.city_list = _city_list;
          state.areaList.county_list = _county_list;
          // 接收参数
          const {type, addressId} = route.query;

          state.type = type;
          state.addressId = addressId;



          if(type == 'edit') {
             getAddressDetail(addressId).then(res=>{
                const addressDetail = res;

                let _areaCode = ''
                const province = tdist.getLev1();


               Object.entries(state.areaList.county_list).forEach(([id, text]) => {
                 // 先找出当前对应的区
                 if (text == addressDetail.county) {
                   // 找到区对应的几个省份
                   const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
                   // 找到区对应的几个市区
                   // eslint-disable-next-line no-unused-vars
                   const cityItem = Object.entries(state.areaList.city_list).filter(([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
                   // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
                   if (province[provinceIndex].text == addressDetail.province && cityItem[1] == addressDetail.city) {
                     _areaCode = id
                   }
                 }
               })

                state.addressInfo = {
                  name:addressDetail.name,
                  tel:addressDetail.phone,
                  province: addressDetail.province,
                  city:addressDetail.city,
                  county:addressDetail.county,
                  areaCode:_areaCode,
                  addressDetail:addressDetail.address,
                  isDefault: !!addressDetail.is_default
                }
             })
          }


      })

      const title = computed(()=>{
        return state.type == 'add' ? '新增地址' : '编辑地址';
      })

      const onSave = (content) => {
          const params = {
              name:content.name,
              phone:content.tel,
              province:content.province,
              city:content.city,
              county:content.county,
              address:content.addressDetail,
              is_default:content.isDefault ? 1 : 0
          }

          if(state.type == 'edit') {
            // 修改数据
            EditAddress(state.addressId, params)
          }else if(state.type == 'add') {
            // 调用接口添加数据
            addAddress(params);
          }



          Toast('保存成功');
          setTimeout(()=>{
            router.back();
          }, 1000)
      }

      const onDelete = () => {
          DeleteAddress(state.addressId).then(res=>{
            Toast('删除成功');
            setTimeout(()=>{
              router.back();
            }, 1000)
          })

      }

      return {
        ...toRefs(state),
        onSave,
        onDelete,
        title
      }
    }
  }
</script>

<style lang="scss">
  .edit {
    .van-field__body {
      textarea {
        height: 26px!important;
      }
    }
  }
  .address-edit-box {
    margin-top: 44px;
    .van-address-edit {
      .van-button--danger {
        background: var(--color-tint);
        border-color: var(--color-tint);
      }
      .van-switch--on {
        background:var(--color-tint);
      }
    }
  }

</style>
