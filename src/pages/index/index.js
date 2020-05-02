import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import Container from '../../compoents/container'

export default class Index extends Component {

  state = {
    bannerlist: [],
    swiperHeight: ''
  }

  componentWillMount() {
    const systemInfo = Taro.getSystemInfoSync();
    const { width, height } = { width: 750, height: 480 };
    const swiperHeight = systemInfo.windowWidth * 0.94 * height / width;
    this.setState({ swiperHeight })
    this.getBanner()
  }

  config = {
    navigationBarTitleText: '我家养生',
  }

  getBanner() {
    Taro.request({ url: `${Taro.requestUrl}getBanner` }).then(res => {
      if (res.statusCode == 200) {
        const bannerlist = res.data.result;
        this.setState({ bannerlist })
      }
    }
    )
  }

  render() {
    const { swiperHeight, bannerlist } = this.state;
    return (
      <View className='index'>
        <View className='warp'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            autoplay
            style={`height: ${swiperHeight}px`}
          >
            {
              bannerlist && bannerlist.map(item => {
                return (
                  <SwiperItem className='swiperitem' key={item.id}>
                    <View className='demo-text-1'>
                      <Image className='img' src={item.image_path} style={{ width: '100%',height:'100%' }}></Image>
                    </View>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <Container />
        </View>
      </View>
    )
  }
}
