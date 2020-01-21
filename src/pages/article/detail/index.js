import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    articledetail: {},
  }

  componentWillMount() {
    this.id = this.$router.params.id;
    this.getArticle()
  }

  config = {
    navigationBarTitleText: '养生文选',
  }

  getArticle() {
    Taro.request({ url: `${Taro.requestUrl}getArticle?id=${this.id}` }).then(res => {
      if (res.statusCode == 200) {
        const articledetail = res.data.result[0];
        this.setState({ articledetail })
      }
    }
    )
  }

  render() {
    const { articledetail } = this.state
    return (
      <View className='index'>
        <View className='warp'>
          {/* <View className='banner'>
            <Image src={medicinedetail.image_path} mode='widthFix'></Image>
          </View> */}
          <View className='title'>{articledetail.title}</View>
          <View className='content'>
            <View className='name'>作者:{articledetail.name}</View>
            <View className='time'>{articledetail.createdAt}</View>
          </View>
          <View className='subtitle'>{articledetail.subtitle}</View>
          <View className='text'>{articledetail.text}</View>
        </View>
      </View>
    )
  }
}
