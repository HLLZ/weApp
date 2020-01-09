import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

 Config = {
    navigationBarTitleText: '中药'
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello Medicine!</Text>
      </View>
    )
  }
}
