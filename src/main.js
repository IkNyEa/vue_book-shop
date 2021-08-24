import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入Vant
import 'vant/lib/index.css'
import {
    Grid,
    GridItem,
    Popup,
    List,
    PullRefresh,
    AddressEdit,
    AddressList,
    Icon,
    Stepper,
    SwipeCell,
    CheckboxGroup,
    SubmitBar,
    Checkbox,
    Form,
    Field,
    Swipe,
    SwipeItem,
    Lazyload,
    Badge,
    Sidebar,
    SidebarItem,
    Collapse,
    CollapseItem,
    Tab,
    Tabs,
    Card,
    Image as VanImage,
    Button,
    Tag,
    Search
} from 'vant';
import { request } from "@/network/request";

createApp(App).use(store).use(router)
    .use(Grid).use(GridItem).use(Popup).use(List).use(PullRefresh)
    .use(Swipe).use(SwipeItem).use(Lazyload, { loading: require('./assets/images/tag/loading-3.svg') })
    .use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(Card).use(VanImage).use(Button).use(Tag)
    .use(Form).use(Field).use(Checkbox).use(Stepper).use(SwipeCell).use(CheckboxGroup).use(SubmitBar).use(Icon).use(AddressEdit).use(AddressList)
    .use(Search)
    .mount('#app')