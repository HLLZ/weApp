import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import message from '../../../images/message.png'
import './index.scss'

export default class Index extends Component {

  state = {
    articledetail: {},
    commitlist: [],
    date:"",
  }

  componentWillMount() {
    this.id = this.$router.params.id;
    this.getArticle()
    this.getCommit()
  }
  componentDidShow(){
    this.getCommit()
  }

  config = {
    navigationBarTitleText: '养生文选',
  }

  getArticle() {
    Taro.request({ url: `${Taro.requestUrl}getArticle?id=${this.id}` }).then(res => {
      if (res.statusCode == 200) {
        const articledetail = res.data.result[0];
        var time = new Date(articledetail.createdAt);
        var yy=time.getFullYear();
        var mm=this.appendZero(time.getMonth()+1);
        var dd=this.appendZero(time.getDate());
        var hh=this.appendZero(time.getHours());
        var ff=this.appendZero(time.getMinutes());
        var ss=this.appendZero(time.getSeconds());
        var date =`${yy}-${mm}-${dd} ${hh}:${ff}:${ss}`
        this.setState({ articledetail,date })
      }
    }
    )
  }

  getCommit() {
    Taro.request({ url: `${Taro.requestUrl}getCommit?parent_id=${this.id}` }).then(res => {
      if (res.statusCode == 200) {
        const commitlist = res.data.result;
        this.setState({ commitlist })
        console.log('res.data.result',res.data.result);
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
    const { articledetail, commitlist,date } = this.state
    const url = `../commit/index?id=${this.id}`
    return (
      <View className='index'>
        <View className='warp'>
          {/* <View className='banner'>
            <Image src={medicinedetail.image_path} mode='widthFix'></Image>
          </View> */}
          <View className='article'>
            <View className='title'>{articledetail.title}</View>
            <View className='name'>作者:{articledetail.name}</View>
            <View className='time'>{date}</View>
            <View className='subtitle'>{articledetail.subtitle}</View>
            <View className='text'>{articledetail.text}</View>
          </View>
          <View  className='footer'>
            <Navigator url={url} className='foot'>
              <View className='message'><Image src={message} mode='widthFix'></Image></View>
              <View className='commit'>评论</View>
            </Navigator>
          </View>
          <View className='co'>
            {
              commitlist && commitlist.length ?
                commitlist.map(item => {
                  const url1 = `../commit/index?id=${this.id}&&tonickName=${item.nickName}`
                  var time = new Date(item.createdAt);
                  var mm=this.appendZero(time.getMonth()+1);
                  var dd=this.appendZero(time.getDate());
                  var hh=this.appendZero(time.getHours());
                  var ff=this.appendZero(time.getMinutes());
                  var ss=this.appendZero(time.getSeconds());
                  var comDate =`${mm}月${dd}日 ${hh}:${ff}:${ss}`
                  return (
                    <Navigator url={url1} className='com' key={item.id}>
                      {
                        item.tonickName == null?
                      <View><View style='display:inline-block'><View style='color:#21a8a5;display:inline-block'>{item.nickName}</View>:{item.text}</View><View style='display:inline-block;float:right;'>{comDate}</View></View>
                        :
                      <View><View style='color:#21a8a5;display:inline-block'>{item.nickName}</View>回复<View style='color:#21a8a5;display:inline-block'>{item.tonickName}</View>:{item.text}<View style='display:inline-block;float:right'>{comDate}</View></View>
                      }
                    </Navigator>
                  )
                })
                :
                <View className='none'>还没有评论，快来发表评论吧！！！</View>
            }
          </View>
        </View>
      </View>
    )
  }
}
