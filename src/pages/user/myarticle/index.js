import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import './index.scss'

export default class Myarticle extends Component {

  state = {
    myArticlelist: [],
    openid:'',
  }
  componentWillMount(){
    const data =Taro.getStorageSync('data');
    const openid = data.openid;
    this.setState({openid})
  }
  componentDidMount(){
    this.getMyArticle();
  }

  config = {
    navigationBarTitleText: '我的文章',
  }

  getMyArticle() {
    Taro.request({ url: `${Taro.requestUrl}getMyArticle`,data:{openid:this.state.openid} }).then(res => {
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
                const url=`../../article/detail/index?id=${item.id}`
                return (
                  <Navigator url={url} className='item' key={item.id} hoverClass='none'>
                    {/* <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View> */}
                    <View className='content'>
                      <View className='title'>{item.title}</View>
                      <View className='subtitle'>{item.subtitle}</View>
                      <View className='createtime'>{item.createdAt}</View>
                    </View>
                  </Navigator>
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
