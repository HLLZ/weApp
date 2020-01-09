import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class News extends Component {

 Config = {
    navigationBarTitleText: '资讯'
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello News!</Text>
      </View>
    )
  }
}
