const mutations = {
    setIsLogin(state, payload){
        this.state.user.isLogin = payload;
    },
    addCart(state, payload){
        this.state.cartCount = payload.count
    }
}
export default mutations