import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class GetPhone extends Taro.Component {

  componentDidMount(){
    this.data = Taro.getStorageSync('data');
  }

  config = {
    navigationBarTitleText: '获取手机号',
}

getPhoneNumber (e) {
  console.log(e.detail.errMsg == "getPhoneNumber:ok");
  if (e.detail.errMsg == "getPhoneNumber:ok") {
    Taro.request({
      url: 'https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html',
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: this.data.session_key,
        uid: "",
      },
      method: "post",
      success: function (res) {
        console.log(res);
      }
    })
  }
}

render(){
  return(
    <View>
      <Button open-type='getPhoneNumber' bindgetphonenumber='getPhoneNumber'>获取手机号</Button>
    </View>
  )
}
}