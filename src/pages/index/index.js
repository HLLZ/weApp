import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import ban1 from '../../images/banner1.jpg'
import ban2 from '../../images/banner2.jpg'
import ban3 from '../../images/banner3.jpg'
import Container from '../../compoents/container'

export default class Index extends Component {

  state={
    swiperHeight:''
  }

  componentWillMount(){
    const systemInfo = Taro.getSystemInfoSync();
    const { width, height } = { width: 750, height: 480 };
    const swiperHeight = systemInfo.windowWidth * 0.94 * height / width;
    this.setState({swiperHeight})
  }
  
  Config = {
    navigationBarTitleText: '我家养身'
  }

  render() {
    const { swiperHeight } = this.state;
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
            <SwiperItem className='swiperitem'>
              <View className='demo-text-1'>
                <Image className='img' src={ban1} style={{width:'100%'}}></Image>
              </View>
            </SwiperItem>
            <SwiperItem className='swiperitem'>
              <View className='demo-text-2'>
                <Image src={ban2} style={{width:'100%'}}></Image>
              </View>
            </SwiperItem>
            <SwiperItem className='swiperitem'>
              <View className='demo-text-3'>
                <Image src={ban3} style={{width:'100%'}}></Image>
              </View>
            </SwiperItem>
          </Swiper>
          <Container />
        </View>
      </View>
    )
  }
}
