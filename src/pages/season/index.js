import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    seasonlist: {}
  }

  componentWillMount() {
    this.id = this.$router.params.id;
    this.getSeason()
  }


  Config = {
    navigationBarTitleText: '季节养生'
  }

  getSeason() {
    Taro.request({ url: `${Taro.requestUrl}getSeason`, data: { id: this.id } }).then(res => {
      if (res.statusCode == 200) {
        const seasonlist = res.data.result[0];
        this.setState({ seasonlist })
      }
    }
    )
  }

  render() {
    const { seasonlist } = this.state;
    return (
      <View class='season'>
        <View className='warp'>
          <View className='banner'><Image src={seasonlist.image_path}></Image></View>
          <View className='title'>{seasonlist.season}养生</View>
          <View className='subtitle'>一.养生食谱</View>
          <View className='text'>{seasonlist.text}</View>
          <View className='subtitle'>二.季节常识</View>
          <View className='text'>{seasonlist.text1}</View>
        </View>
      </View>
    )
  }

}