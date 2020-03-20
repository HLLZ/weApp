import Taro, { Component } from '@tarojs/taro'
import { AtForm, AtTextarea, AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    text: '',
  }

  componentWillMount() {
    this.id = this.$router.params.id;
    this.nickName = Taro.getStorageSync('user').nickName;
  }

  config = {
    navigationBarTitleText: '发表评论',
  }

  textChange(name, e) {
    this.setState({ [name]: e.target.value })
  }

  onReset() { 
    this.setState({text:''})
  }

  onSubmit() {
    const data = this.state;
    if (!data.text) {
      Taro.showToast({
        title: '您还未发表评论！',
        icon: 'none'
      })
      return;
    }
    Taro.showModal({
      content: '确认提交评论？',
    }).then(dat => {
      if (dat.confirm) {
        Taro.request({ url: `${Taro.requestUrl}setCommit`, method: 'POST', data: { text: this.state.text, parent_id: this.id,nickName:this.nickName } }).then(res => {
          if (res.statusCode == 200) {
            Taro.showToast({ title: '评论成功' })
            Taro.navigateTo({
              url:`../detail/index?id=${this.id}`
              });
          }
        })
      } else {
        //
      }
    })
  }

  render() {
    return (
      <View className='article'>
        <View className='warp'>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtTextarea
              clear
              value={this.state.text}
              onChange={this.textChange.bind(this, 'text')}
              maxLength={10000}
              placeholder='请在此书写评论内容'
            />
            <AtButton type='primary' formType='submit'>提交</AtButton>
            <AtButton formType='reset'>取消</AtButton>
          </AtForm>
        </View>
      </View>
    )
  }
}
