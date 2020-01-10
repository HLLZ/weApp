import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import banner from '../../images/view.jpg'

export default class User extends Component {

  componentWillMount() {
    // this.user = Taro.getStorage('user')
    // console.log(this.user,111)
    this.user = Taro.getStorageSync('user');
    console.log("User componentWillMount user", this.user);

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
              <Image src={this.user.avatarUrl} mode='widthFix'></Image>
            </View>
            <View className='info'>
              <View className='nickname'>{this.user.nickName}</View>
              <View className='sex'>性别 : {this.user.gender==1 ? '男' : '女'}</View>
            </View>
          </View>
          <View className='body'>
            <Image src={banner} mode='scaleToFill'></Image>
          </View>
          <View className='footer'>
            <View className='item'>我的发表</View>
            <View className='item'>绑定手机</View>
            <View className='item'>联系客服</View>
            <View className='item'>关于我们</View>
          </View>
        </View>
      </View>
    )
  }
}
