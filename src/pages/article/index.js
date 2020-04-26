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
      Taro.showLoading()
      this.setState({ current: this.state.current+1 })
      this.getArticle(this.state.current+1);
    }
  }

  config = {
    navigationBarTitleText: '养生社区',
  }

  getArticle(page) {
    Taro.request({ url: `${Taro.requestUrl}getArticle`,data: {current: page,pageSize: this.state.pageSize,status:1}}).then(res => {
      if (res.statusCode == 200) {
        const articlelist = res.data.result;
        const newarticlelist=this.state.articlelist.concat(articlelist)
        const total = res.data.pagination.total;
        this.setState({ 
          articlelist: newarticlelist,
          total })
          Taro.hideLoading()
      }
    }
    )
  }

  appendZero (obj) {
    if (obj < 10) {
       return '0' + obj
     } else {
       return obj
     }
  }

  render() {
    const { articlelist } = this.state;
    return (
      <View className='article'>
        <View className='warp'>
          {
            articlelist && articlelist.length ?
              articlelist.map(item => {
                var time = new Date(item.createdAt);
                var yy=time.getFullYear();
                var mm=this.appendZero(time.getMonth()+1);
                var dd=this.appendZero(time.getDate());
                var hh=this.appendZero(time.getHours());
                var ff=this.appendZero(time.getMinutes());
                var ss=this.appendZero(time.getSeconds());
                var date =`${yy}-${mm}-${dd} ${hh}:${ff}:${ss}`
                const url=`./detail/index?id=${item.id}`
                return (
                  <Navigator url={url} className='item' key={item.id} hoverClass='none'>
                    {/* <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View> */}
                    <View className='content'>
                      <View className='title'>{item.title}</View>
                      <View className='name'>作者:  {item.name}</View>
                      <View className='createtime'>{item.subtitle}    {date}</View>
                    </View>
                  </Navigator>
                )
              })
              :
              <View className='none'>没有文章发布，快来成为第一个作者吧....</View>
          }
        </View>
      </View>
    )
  }
}
