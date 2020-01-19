import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import './index.scss'

export default class Article extends Component {

  state = {
    articlelist: [],
    current:1,
    total:0,
    pageSize:10
  }
  componentWillMount() {
    this.getArticle(this.state.current);
  }

  onReachBottom(){
    if(this.state.current * 10 < this.state.total){
      this.setState({ current: this.state.current+1 })
      this.getArticle(this.state.current+1);
    }
  }

  config = {
    navigationBarTitleText: '养生社区',
  }

  getArticle(page) {
    Taro.request({ url: `${Taro.requestUrl}getArticle`,data: {current: page,pageSize: this.state.pageSize}}).then(res => {
      if (res.statusCode == 200) {
        const articlelist = res.data.result;
        const newarticlelist=this.state.articlelist.concat(articlelist)
        const total = res.data.pagination.total;
        console.log('newarticlelist', newarticlelist);
        this.setState({ 
          articlelist: newarticlelist,
          total })
      }
    }
    )
  }

  render() {
    const { articlelist } = this.state;
    return (
      <View className='article'>
        <View className='warp'>
          {
            articlelist && articlelist.length ?
              articlelist.map(item => {
                const url=`./detail/index?id=${item.id}`
                return (
                  <Navigator url={url} className='item' key={item.id}>
                    {/* <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View> */}
                    <View className='content'>
                      <View className='title'>{item.title}</View>
                      <View className='name'>作者:  {item.name}</View>
                      <View className='createtime'>{item.subtitle} {item.createdAt}</View>
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
