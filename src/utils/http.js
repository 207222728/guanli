/**
 * http.js Created by SmallFour on 2019/10/22/14:11
 */

// 第一个文件 - Axios封装
// import config from '../config'
import Axios from 'axios'
import Qs from 'qs'
// 定义HTTP类
class HTTP {
  // HTTP下面的方法
  request (params) {
    // console.log(params.data)
    return new Promise((resolve, reject) => {
      Axios({
        method: params.type || 'get',
        url: params.url,
        data: Qs.stringify(params.data),
        headers: {
          Authorization: params.data.token
        }
      }).then(res => {
        // console.log(res)
        resolve(res)
      })
    })
  }
}
export default HTTP
