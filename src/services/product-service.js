/**
 * product-service.js Created by SmallFour on 2019/10/22/14:16
 */

// 第二个文件：M层

/*
* M : 数据
* V： 视图
* C： 业务逻辑层
* */

import HTTP from '../utils/http'
const _http = new HTTP()
class Product {
  // list方法 用户列表
  // user(data) {
  //   return _http.request({
  //     url: `http://www.wyunfei.com:7001/api/private/v1/users`,
  //     data: {
  //     }
  //   })
  // }
  //权限角色列表
  list(data) {
    // console.log(data)
    return _http.request({
      url: 'http://www.wyunfei.com:7001/api/private/v1/roles',
      data: {
        token: data.token
      }
    })
  }
  //权限列表
  tree(data) {
    return _http.request({
      url: 'http://www.wyunfei.com:7001/api/private/v1/rights/list',
      data: {
        token: data.token
      }
    })
  }
  // 商品列表
  goods(data) {
    // console.log(data)
    return _http.request({
      url: 'http://www.wyunfei.com:7001/api/private/v1/goods',
      data: {
        pagenum: data.pagenum,
        pagesize: data.pagesize,
        token: data.token
      }
    })
  }
  //添加用户
  users(data) {
    return _http.request({
      type: "post",
      url: 'http://www.wyunfei.com:7001/api/private/v1/users',
      data: {
        username: data.name.username,
        password: data.name.password,
        email: data.name.email,
        mobile: data.name.mobile,
        token: data.token
      }
    })
  }
  //编辑用户
  Confirm(data) {
    // console.log(data.name.id)
    return _http.request({
      type: "PUT",
      url: `http://www.wyunfei.com:7001/api/private/v1/users/${data.name.id}`,
      data: {
        username: data.name.username,
        email: data.name.email,
        mobile: data.name.mobile,
        token: data.token
      }
    })
  }
  //改变状态
  state(data) {
    console.log(data.name.id)
    return _http.request({
      type: "PUT",
      url: `http://www.wyunfei.com:7001/api/private/v1/users/${data.name.id}/state/${data.name.mg_state}`,
      data: {
        token: data.token
      }
    })
  }
  //删除
  del(data) {
    // console.log(data.name.id)
    return _http.request({
      type: "post",
      url: `http://www.wyunfei.com:7001/api/private/v1/users/${data.name.id}`,
      data: {
        token: data.token
      }
    })
  }
  //搜索
  suo(data) {
    return _http.request({
      url: `http://www.wyunfei.com:7001/api/private/v1/users?query=${data.query}&pagenum=${data.pagenum}&pagesize=${data.pagesize}`,
      data: {
        token: data.token
      }
    })
  }
  // 权限角色添加
  addroles(data) {
    return _http.request({
      type: "POST",
      url: `http://www.wyunfei.com:7001/api/private/v1/roles`,
      data: {
        roleName: data.roleName,
        roleDesc: data.roleDesc,
        token: data.token
      }
    })
  }
  //权限角色编辑
  addroles1(data) {
    return _http.request({
      type: "PUT",
      url: `http://www.wyunfei.com:7001/api/private/v1/roles/${data.id}`,
      data: {
        roleName: data.roleName,
        roleDesc: data.roleDesc,
        token: data.token
      }
    })
  }
  //角色删除
  addroles2(data) {
    return _http.request({
      type: "DELETE",
      url: `http://www.wyunfei.com:7001/api/private/v1/roles/${data.id}`,
      data: {
        token: data.token
      }
    })
  }
  //商品分类
  categories(data) {
    return _http.request({
      url: `http://www.wyunfei.com:7001/api/private/v1/roles/categories`,
      data: {
        type: data.id,
        token: data.token
      }
    })
  }
  //添加商品
  classifi(data) {
    return _http.request({
      type: 'POST',
      url: `http://www.wyunfei.com:7001/api/private/v1/categories`,
      data: {
        cat_pid: data.cat_pid,
        cat_name: data.cat_name,
        cat_level: data.cat_level,
        token: data.token
      }
    })
  }
  //修改商品
  classifi1(data) {
    return _http.request({
      type: 'PUT',
      url: `http://www.wyunfei.com:7001/api/private/v1/categories/${data.cat_id}`,
      data: {
        cat_name: data.cat_name,
        token: data.token
      }
    })
  }
  //删除商品
  del1(data) {
    return _http.request({
      type: 'DELETE',
      url: `http://www.wyunfei.com:7001/api/private/v1/categories/${data.cat_id}`,
      data: {
        token: data.token
      }
    })
  }
  //商品分类静态属性
  // categories/6/attributes?sel=only
  dee(data){
    return _http.request({
      url: `http://www.wyunfei.com:7001/api/private/v1/categories/${data.id}/attributes?sel=only`,
      data: {
        token: data.token
      }
    })
  }
  //商品分类动态属性
  // categories/23/attributes?sel=many
  dee1(data){
    return _http.request({
      url: `http://www.wyunfei.com:7001/api/private/v1/categories/${data.id}/attributes?sel=many`,
      data: {
        token: data.token
      }
    })
  }
  //添加商品
  sptc(data){
    return _http.request({
      type:"post",
      url: `http://www.wyunfei.com:7001/api/private/v1/goods`,
      data: {
        goods_name:data.goods_name,
        goods_price:data.goods_price,
        goods_weight:data.goods_weight,
        goods_number:data.goods_number,
        goods_cat:data.goods_cat,
        goods_introduce:data.goods_introduce,
        pics:data.pics,
        attrs:data.attrs,
        token: data.token
      }
    })
  }
  //删除商品
  scsp(data){
    return _http.request({
      type:"DELETE",
      url: `http://www.wyunfei.com:7001/api/private/v1/goods/${data.goods_id}`,
      data: {
        token: data.token
      }
    })
  }
  //动态参数添加
  dtcs(data){
    return _http.request({
      type:"POST",
      url: `http://www.wyunfei.com:7001/api/private/v1/categories/${data.id}/attributes`,
      data: {
        attr_name:data.attr_name,
        attr_sel:data.attr_sel,
        token: data.token
      }
    })
  }
  //删除动态
  sctd(data){
    return _http.request({
      type:"DELETE",
      url: `http://www.wyunfei.com:7001/api/private/v1/categories/${data.id}/attributes/${data.attr_id}`,
      data: {
        token: data.token
      }
    })
  }
  //静态
}

export default Product
