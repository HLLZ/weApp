import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    newsdetail: {},
    date:'',
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
        var time = new Date(newsdetail.createdAt);
        var yy=time.getFullYear();
        var mm=this.appendZero(time.getMonth()+1);
        var dd=this.appendZero(time.getDate());
        var hh=this.appendZero(time.getHours());
        var ff=this.appendZero(time.getMinutes());
        var ss=this.appendZero(time.getSeconds());
        var date =`${yy}-${mm}-${dd} ${hh}:${ff}:${ss}`
        this.setState({ newsdetail,date})
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
    const { newsdetail, date } = this.state
    return (
      <View className='index'>
        <View className='warp'>
          <View className='title'>{newsdetail.title}</View>
          <View className='subtitle'>{newsdetail.subtitle}</View>
          <View className='createdAt'>{date}</View>
          <View className='banner'>
            <Image src={newsdetail.image} mode='widthFix'></Image>
          </View>
          <View className='text'>{newsdetail.text}</View>
        </View>
      </View>
    )
  }
}
