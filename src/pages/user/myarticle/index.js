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
    Taro.request({ url: `${Taro.requestUrl}getArticle`,data:{openid:this.state.openid,status:1} }).then(res => {
      if (res.statusCode == 200) {
        const myArticlelist = res.data.result;
        this.setState({ myArticlelist })
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
    const { myArticlelist } = this.state;
    return (
      <View className='Myarticle'>
        <View className='warp'>
          {
            myArticlelist && myArticlelist.length ?
              myArticlelist.map(item => {
                var time = new Date(item.createdAt);
                var yy=time.getFullYear();
                var mm=this.appendZero(time.getMonth()+1);
                var dd=this.appendZero(time.getDate());
                var hh=this.appendZero(time.getHours());
                var ff=this.appendZero(time.getMinutes());
                var ss=this.appendZero(time.getSeconds());
                var date =`${yy}-${mm}-${dd} ${hh}:${ff}:${ss}`
                const url=`../../article/detail/index?id=${item.id}`
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
              <View className='none'>没有文章发布，快去发表文章吧....</View>
          }
        </View>
      </View>
    )
  }
}
