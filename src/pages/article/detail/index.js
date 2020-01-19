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

  Config = {
    navigationBarTitleText: '文章',
  }

  getArticle() {
    Taro.request({ url: `${Taro.requestUrl}getArticle?id=${this.id}`}).then(res => {
      if (res.statusCode == 200) {
        console.log('res', res);
        const articledetail = res.data.result[0];
        console.log('articledetail', articledetail);
        this.setState({ articledetail })
      }
    }
    )
  }

  render() {
    const { articledetail } = this.state
    console.log('articledetail', articledetail);
    return (
      <View className='index'>
        <View className='warp'>
          {/* <View className='banner'>
            <Image src={medicinedetail.image_path} mode='widthFix'></Image>
          </View> */}
          <View className='title'>{articledetail.title}</View>
          <View className='text'>{articledetail.text}</View>
        </View>
      </View>
    )
  }
}
