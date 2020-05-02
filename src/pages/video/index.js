import Taro, { Component } from '@tarojs/taro'
import { AtTabs } from 'taro-ui'
import { View, Video, Image } from '@tarojs/components'
import './index.scss'
import video from '../../images/video.png'

export default class Index extends Component {
  state = {
    tabid: 1,
    tablist: [],
    tabpanslist: [],
    current: 1,
    total: 0,
    pageSize: 3
  }

  componentWillMount() {
    this.getTabs()
    this.getTabpans(this.state.current, this.state.tabid)
  }

  config = {
    navigationBarTitleText: '养生学习',
    navigationBarBackgroundColor:'#2b7d7b',
    navigationBarTextStyle:'white'
  }

  handleClick(value) {
    console.log('value', value)
    this.setState({
      tabid: value + 1,
      current: 1,
      total: 0
    })
    this.getTabpans(1, value + 1)
  }


  getTabs() {
    Taro.request({ url: `${Taro.requestUrl}getTabs` }).then(res => {
      if (res.statusCode == '200') {
        const tablist = res.data.result;
        this.setState({ tablist })
      }
    }
    )
  }

  getTabpans(current, val) {
    this.tabpanslist=[];
    Taro.request({ url: `${Taro.requestUrl}getTabpans`, data: { tabid: val, current, pageSize: this.state.pageSize } }).then(res => {
      if (res.statusCode == '200') {
        const tabpanslist = res.data.result;
        const total = res.data.pagination.total;
        this.setState({ tabpanslist, total })
      }
    }
    )
  }

  getTabpans1(current, val) {
    Taro.request({ url: `${Taro.requestUrl}getTabpans`, data: { tabid: val, current, pageSize: this.state.pageSize } }).then(res => {
      if (res.statusCode == '200') {
        const tabpanslist = res.data.result;
        const newtabpanslist = this.state.tabpanslist.concat(tabpanslist)
        const total = res.data.pagination.total;
        this.setState({ tabpanslist: newtabpanslist, total })
        Taro.hideLoading()
      }
    }
    )
  }

  onReachBottom() {
    if (this.state.current * this.state.pageSize < this.state.total) {
      Taro.showLoading()
      this.setState({ current: this.state.current + 1 })
      this.getTabpans1(this.state.current + 1, this.state.tabid);
    }
  }

  render() {
    const { tablist, tabpanslist } = this.state;
    return (
      <View className='ibody'>
        {/* <AtTabs
          current={this.state.tabid-1}
          scroll
          height='100%'
          tabDirection='vertical'
          tabList={tablist}
          onClick={this.handleClick.bind(this)}
        >
        </AtTabs>
        <scroll-view style='width:570px;' className='ban' scroll-y='true' bindscrolltolower={this.onReachBottom}>
          {
            tabpanslist && tabpanslist.length ?
              tabpanslist.map(item => {
                return (
                  <View className='ban_item' key={item.id}>
                    <Video
                      src={item.video_path}
                      controls
                      autoplay={false}
                      // poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                      initialTime='0'
                      id='video'
                      loop={false}
                      muted={false}
                    />
                    <View className='foot'>
                      <View className='img'><Image src='../../images/shipin.png' mode='scaleToFill'></Image></View>
                      <View className='title'>{item.title}</View>
                    </View>
                    
                  </View>
                )
              })
              :
              ''
          }
        </scroll-view> */}
        {/* 第二版 */}
        <AtTabs
          current={this.state.tabid-1}
          scroll
          tabList={tablist}
          onClick={this.handleClick.bind(this)}
        >
        </AtTabs>
        <scroll-view  style='width:100%;position: absolute;top:40px;left:0;' className='ban' scroll-y='true' bindscrolltolower={this.onReachBottom}>
          {
            tabpanslist && tabpanslist.length ?
              tabpanslist.map(item => {
                return (
                  <View className='ban_item' key={item.id}>
                    <Video
                      src={item.video_path}
                      controls
                      autoplay={false}
                      // poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                      initialTime='0'
                      id='video'
                      loop={false}
                      muted={false}
                    />
                    <View className='foot'>
                      <View className='img'><Image src={video} mode='scaleToFill'></Image></View>
                      <View className='title'>{item.title}</View>
                    </View>
                    
                  </View>
                )
              })
              :
              ''
          }
        </scroll-view>
      </View>
    )
  }
}
