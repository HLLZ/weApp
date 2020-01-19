import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class User extends Component {

  componentWillMount() {
    // this.user = Taro.getStorage('user')
    // console.log(this.user,111)
    this.user = Taro.getStorageSync('user');
    console.log("User componentWillMount user", this.user);

  }

  config = {
    navigationBarTitleText: '关于我们',
  }

  render() {
    return (
      <View className='About'>
        <View className='warp'>
            <View className='title'>养生保健小知识微信小程序</View>
            <View className='name'>设计者:胡乐乐</View>
            <View className='introduce'>本课题预期实现的是一个中医养生知识宣传小程序，小程序可供用户登录及其管理、中药自主查询、在线发帖，评论等基本功能。特色与创新在养生小程序主要实现几大功能:其一，自主查询。根据自己想要了解的中药，进行在线搜索，可了解中药功效，食用方法等知识。其二，在线发帖询问。可以通过发帖的方式与大家交流养生心得，咨询养生相关问题。此外，还区分了春夏秋冬四季养生，不同的季节会推荐不同的养生方法。 本平台收录中医养生方面实时信息，让用户足不出户就可以了解养生。现如今的网上养生小程序很多，但是都不是很完善，存在很多的不足，通过对现下这些小程序的研究，能够改善不足，并将其他养生小程序的优点收录其中，更好的服务大众，节省不必要的精力和时间。</View>
        </View>
      </View>
    )
  }
}
