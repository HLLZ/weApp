import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Myarticle extends Component {

  state = {
    myArticlelist: [],
  }
  componentWillMount(){
    this.getMyArticle();
  }

  config = {
    navigationBarTitleText: '我的文章',
  }

  getMyArticle() {
    Taro.request({ url: `${Taro.requestUrl}getMyArticle` }).then(res => {
      if (res.statusCode == 200) {
        const myArticlelist = res.data.result;
        this.setState({ myArticlelist })
      }
    }
    )
  }

  render() {
    const { myArticlelist } = this.state;
    return (
      <View className='Myarticle'>
        <View className='warp'>
          {
            myArticlelist && myArticlelist.length ?
              myArticlelist.map(item => {
                return (
                  <View className='item' key={item.id}>
                    {/* <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View> */}
                    <View className='content'>
                      <View className='title'>{item.title}</View>
                      <View className='subtitle'>{item.subtitle}</View>
                      <View className='createtime'>{item.createdAt}</View>
                    </View>
                  </View>
                )
              })
              :
              ''
          }
        </View>
      </View>
    )
  }
}
