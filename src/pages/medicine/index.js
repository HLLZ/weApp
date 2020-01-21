import Taro, { Component } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import { View, Image, Navigator } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    medicinelist: [],
    current: 1,
    total: 0,
    pageSize: 15,
    keyword: '',
  }

  componentWillMount() {
    this.getMedicine(this.state.current)
  }

  config = {
    navigationBarTitleText: '中药大全',
  }

  onReachBottom() {
    if (this.state.current * 10 < this.state.total) {
      this.setState({ current: this.state.current + 1 })
      this.getMedicine(this.state.current + 1);
    }
  }

  getMedicine(page) {
    Taro.request({ url: `${Taro.requestUrl}getMedicine`, data: { current: page, pageSize: this.state.pageSize,keyword:this.state.keyword } }).then(res => {
      if (res.statusCode == 200) {
        const medicinelist = res.data.result;
        const newmedicinelist = this.state.medicinelist.concat(medicinelist)
        console.log('newmedicinelist',newmedicinelist);
        const total = res.data.pagination.total;
        this.setState({
          medicinelist: newmedicinelist,
          total
        })
      }
    }
    )
  }

  keywordChange (value) {
    this.setState({
      keyword: value
    })
  }

  onActionClick(){
    this.setState({medicinelist:[],current:1})
    this.getMedicine(1)
  }

  render() {
    const { medicinelist } = this.state
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.keyword}
          onChange={this.keywordChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <View className='warp'>
          {
            medicinelist && medicinelist.length ?
              medicinelist.map(item => {
                const url = `./detail/index?id=${item.id}`
                return (
                  <Navigator url={url} className='item' key={item.id} hoverClass='none'>
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
