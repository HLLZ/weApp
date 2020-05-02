import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import './index.scss'
import banner from '../../images/view.png'
import item1 from '../../images/user_2.png'
import item2 from '../../images/user_1.png'
import item3 from '../../images/user_3.png'
import item4 from '../../images/user_4.png'
import next from '../../images/next_1.png'

export default class User extends Component {

  componentWillMount() {
    this.user = Taro.getStorageSync('user');

  }

  config = {
    navigationBarTitleText: '个人中心',
    navigationBarBackgroundColor:'#2b7d7b',
    navigationBarTextStyle:'white'
  }

  phoneCall(){
    Taro.showModal({
      title: '确定联系客服？',
    })
      .then(res =>{
        if(res.confirm){
          Taro.makePhoneCall({ phoneNumber: '15395041061'})
        }else if(res.cancel){
          //
        }
      })
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
              <View className='sex'>性别 : {this.user.gender == 1 ? '男' : '女'}</View>
            </View>
          </View>
          <View className='body'>
            <Image src={banner} mode='widthFix'></Image>
          </View>
          <View className='footer'>
            <Navigator url='./myarticle/index' className='item'>
              <View className='item_top'>
                <View className='icon'><Image src={item1}></Image></View>
                <View className='title'>我的发表</View>
              </View>
              <View className='next'><Image src={next}></Image></View>
            </Navigator>
            <Navigator className='item' url='./writearticle/index'>
              <View className='item_top'>
                <View className='icon'><Image src={item2}></Image></View>
                <View className='title'>发表文章</View>
              </View>
              <View className='next'><Image src={next}></Image></View>
            </Navigator>
            <View className='item' onClick={this.phoneCall.bind(this)}>
              <View className='item_top'>
                <View className='icon'><Image src={item3}></Image></View>
                <View className='title'>联系客服</View>
              </View>
              <View className='next'><Image src={next}></Image></View>
            </View>
            <Navigator url='./about/index' hoverClass='none' className='item'>
              <View className='item_top'>
                <View className='icon'><Image src={item4}></Image></View>
                <View className='title'>关于我们</View>
              </View>
              <View className='next'><Image src={next}></Image></View>
            </Navigator>
          </View>
        </View>
      </View>
    )
  }
}
