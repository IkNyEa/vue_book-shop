import { createRouter, createWebHistory } from 'vue-router'
import { Notify, Dialog } from "vant";
import store from "../store"

const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Detail = () =>
    import ('../views/detail/Detail')
const Profile = () =>
    import ('../views/profile/Profile')
const ShopCart = () =>
    import ('../views/shopcart/ShopCart')
const Register = () =>
    import ('../views/profile/Register')
const Login = () =>
    import ('../views/profile/Login')
const Address = () =>
    import ('../views/profile/Address')
const AddressEdit = () =>
    import ('../views/profile/AddressEdit')
const Order = () =>
    import ('../views/order/Order');
const OrderDetail = () =>
    import ('../views/order/OrderDetail');
const CreateOrder = () =>
    import ('../views/order/CreateOrder');
const routes = [{
        path: '',
        name: 'DefaultHome',
        component: Home,
        meta: {
            title: 'first-book'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: 'first-book'
        }
    }, {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {
            title: '分类'
        }
    }, {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            title: '商品详情'
        }
    }, {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: '个人中心',
            isAuthRequired: true
        }
    }, {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '用户注册'
        }
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '用户登录'
        }
    }, {
        path: '/address',
        name: 'Address',
        component: Address,
        meta: {
            title: '地址管理',
            isAuthRequired: true
        }
    }, {
        path: '/addressedit',
        name: 'AddressEdit',
        component: AddressEdit,
        meta: {
            title: '地址管理',
            isAuthRequired: true
        }
    }, {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
            title: 'first-book-生成订单',
            isAuthRequired: true
        }
    },
    {
        path: '/createorder',
        name: 'CreateOrder',
        component: CreateOrder,
        meta: {
            title: 'first-book-订单预览',
            isAuthRequired: true
        }
    },
    {
        path: '/orderdetail',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: {
            title: 'first-book-订单详情',
            isAuthRequired: true
        }
    }, {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {
            title: '购物车',
            isAuthRequired: true
        }
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    //  如果没有登录，在这里login
    if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
        Dialog.alert({
            message: '请先登录后再查看',
        }).then(() => {
            // on close
        });
        //Notify('请先登录后查看~');
        return next('/login');
    } else {
        next()
    }
    document.title = to.meta.title;
})

export default router