import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import avatar from '../../images/wode.png'

export default class User extends Component {

  componentWillMount(){
    this.user = Taro.getStorageInfoSync('user')
    console.log(this.user,111)
  }

  Config = {
    navigationBarTitleText: '用户'
  }

  render() {
    return (
      <View className='User'>
        <View className='warp'>
          <View className='head'>
            <View className='avatar'>
              <Image src={avatar} mode='widthFix'></Image>
            </View>
            <View className='info'>
              <View className='nickname'>乐乐</View>
              <View className='phone'>15395041061</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
