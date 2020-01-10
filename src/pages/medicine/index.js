import Taro, { Component } from '@tarojs/taro'
import { View,Image,Navigator } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    medicinelist: [],
  }

  componentWillMount() {
    this.getMedicine()
  }

  Config = {
    navigationBarTitleText: '中药'
  }

  getMedicine() {
    Taro.request({ url: `${Taro.requestUrl}getMedicine` }).then(res => {
      if (res.statusCode == 200) {
        const medicinelist = res.data.result;
        this.setState({ medicinelist })
      }
    }
    )
  }

  render() {
    const { medicinelist } = this.state
    return (
      <View className='index'>
        <View className='warp'>
          {
            medicinelist && medicinelist.length ?
              medicinelist.map(item => {
                const url=`./detail/index?id=${item.id}`
                return (
                  <Navigator url={url} className='item' key={item.id}  hoverClass='none'>
                    <View className='img'><Image src={item.image_path} mode='widthFix'></Image></View>
                    <View className='title'>{item.title}</View>
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
