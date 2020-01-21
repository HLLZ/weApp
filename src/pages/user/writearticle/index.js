import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtForm, AtInput, AtButton } from 'taro-ui'
import './index.scss'

export default class Writearticle extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      // value: ''
    }
  }
  // handleChange(value) {
  //   this.setState({
  //     value
  //   })
  // }
  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }

  config = {
    navigationBarTitleText: '写文章',
  }

  render() {
    return (
      <View className='Writearticle'>
        <View className='warp'>
          {/* <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtInput
              name='value'
              title='文本'
              type='text'
              placeholder='单行文本'
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton formType='submit'>提交</AtButton>
            <AtButton formType='reset'>重置</AtButton>
          </AtForm> */}
          123
        </View>
      </View>
    )
  }
}
