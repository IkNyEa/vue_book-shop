import { request } from "@/network/request";

export function getCategory() {
    return request({
        url: '/api/goods'
    })
}

export function getCategoryGoods(order = 'sales', cid = 0, page = 1) {
    return request({
        url: '/api/goods?category_id=' + cid + '&page=' + page + '&order=' + order
    })
}

export function getSearchGoods(order = 'sales', cid = 0, title = '', page = 1) {
    return request({
        url: '/api/goods?category_id=' + cid + '&title=' + title + '&order=' + order + '&page=' + page
    })
}