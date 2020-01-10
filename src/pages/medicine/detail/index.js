import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    medicinedetail: {},
  }

  componentWillMount() {
    this.id = this.$router.params.id;
    this.getMedicine()
  }

  Config = {
    navigationBarTitleText: '中药'
  }

  getMedicine() {
    Taro.request({ url: `${Taro.requestUrl}getMedicine?id=${this.id}` }).then(res => {
      if (res.statusCode == 200) {
        console.log('res', res);
        const medicinedetail = res.data.result[0];
        console.log('medicinedetail', medicinedetail);
        this.setState({ medicinedetail })
      }
    }
    )
  }

  render() {
    const { medicinedetail } = this.state
    console.log('medicinedetail', medicinedetail);
    return (
      <View className='index'>
        <View className='warp'>
          <View className='banner'>
            <Image src={medicinedetail.image_path} mode='widthFix'></Image>
          </View>
          <View className='title'>{medicinedetail.title}</View>
          <View className='text'>{medicinedetail.text}</View>
        </View>
      </View>
    )
  }
}
