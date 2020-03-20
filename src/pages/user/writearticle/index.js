import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtTextarea, AtButton } from 'taro-ui'
import './index.scss'

export default class Writearticle extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      title: '',
      subtitle: '',
      name: '',
      text: '',
      // eslint-disable-next-line react/no-unused-state
      openid: '',
    }
  }

  componentWillMount() {
    const data = Taro.getStorageSync('data');
    const openid = data.openid;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ openid })
  }

  handleChange(name, value) {
    this.setState({ [name]: value })
  }
  textChange(name, e) {
    this.setState({ [name]: e.target.value })
  }
  onSubmit() {
    const data = this.state;
        if (!data.title) {
          Taro.showToast({
            title: '请输入文章标题',
            icon: 'none'
          })
          return;
        }
        if (!data.subtitle) {
          Taro.showToast({
            title: '请输入文章副标题',
            icon: 'none'
          })
          return;
        }
        if (!data.name) {
          Taro.showToast({
            title: '请输入作者姓名',
            icon: 'none'
          })
          return;
        }
        if (!data.text) {
          Taro.showToast({
            title: '请输入文章内容',
            icon: 'none'
          })
          return;
        }
    Taro.showModal({
      content: '确认提交文章？',
    }).then(dat => {
      if(dat.confirm){
        Taro.request({ url: `${Taro.requestUrl}createArticle`, method: 'POST', data }).then(res => {
          if (res.statusCode == 200) {
            Taro.showToast({ title: '发表成功' })
            setTimeout(() => {
              Taro.navigateBack({
                delta:1
              });
            }, 2000)
          }
        })
      }else{
        //
      }
    })
  }
  onReset() {
    Taro.showModal({
      content:'确认重置？',
    }).then(det =>{
      if(det.confirm){
        this.setState({
          title: '',
          subtitle: '',
          name: '',
          text: '',
        })
      }else{
        //
      }
    })
  }

  config = {
    navigationBarTitleText: '写文章',
  }

  render() {
    return (
      <View className='Writearticle'>
        <View className='warp'>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtInput
              clear
              name='title'
              title='标题'
              type='text'
              placeholder='请输入标题'
              value={this.state.title}
              onChange={this.handleChange.bind(this, 'title')}
            />
            <AtInput
              clear
              name='subtitle'
              title='副标题'
              type='text'
              placeholder='请输入副标题'
              value={this.state.subtitle}
              onChange={this.handleChange.bind(this, 'subtitle')}
            />
            <AtInput
              clear
              name='name'
              title='作者姓名'
              type='text'
              placeholder='请输入作者姓名'
              value={this.state.name}
              onChange={this.handleChange.bind(this, 'name')}
            />
            <AtTextarea
              clear
              value={this.state.text}
              onChange={this.textChange.bind(this, 'text')}
              maxLength={10000}
              placeholder='请在此书写文章正文内容'
            />
            <AtButton type='primary' formType='submit'>提交</AtButton>
            <AtButton formType='reset'>重置</AtButton>
          </AtForm>
        </View>
      </View>
    )
  }
}
