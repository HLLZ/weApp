import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    newsdetail: {},
  }

  componentWillMount() {
    this.id = this.$router.params.id;
    this.getNews()
  }

  config = {
    navigationBarTitleText: '新闻详情',
  }

  getNews() {
    Taro.request({ url: `${Taro.requestUrl}getNews?id=${this.id}` }).then(res => {
      if (res.statusCode == 200) {
        const newsdetail = res.data.result[0];
        this.setState({ newsdetail })
      }
    }
    )
  }

  render() {
    const { newsdetail } = this.state
    return (
      <View className='index'>
        <View className='warp'>
          <View className='title'>{newsdetail.title}</View>
          <View className='subtitle'>{newsdetail.subtitle}</View>
          <View className='banner'>
            <Image src={newsdetail.image} mode='widthFix'></Image>
          </View>
          <View className='text'>{newsdetail.text}</View>
        </View>
      </View>
    )
  }
}
