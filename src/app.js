import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import baseUrl from './utils/baseUrl'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

Taro.requestUrl=baseUrl.basePath

class App extends Component {

  componentDidMount() {
    Taro.checkSession().then(res => {
      console.log('checkSession', res);
      const user = Taro.getStorageSync('user');
      if (!user) {
        Taro.redirectTo({
          url: '/pages/auth/index'
        });
      }
    }).catch(() => {
      // console.log('checkSession', err);
      Taro.showToast({
        title: '授权过期，请重新登录',
        icon: 'none'
      })
      setTimeout(() => {
        Taro.redirectTo({
          url: '/pages/auth/index'
        });
      }, 1000)
    })
  }


  config = {
    pages: [
      'pages/index/index',
      'pages/news/index',
      'pages/newsdetail/index',
      'pages/auth/index',
      'pages/auth/getphone/index',
      'pages/user/index',
      'pages/user/about/index',
      'pages/user/myarticle/index',
      'pages/user/writearticle/index',
      'pages/medicine/index',
      'pages/medicine/detail/index',
      'pages/article/index',
      'pages/article/detail/index',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '我家养身',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: '#fff',
      color: '#000',
      selectedColor: 'green',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'images/shouye.png',
          selectedIconPath: 'images/shouye.png',
          text: '首页'
        },
        {
          pagePath: 'pages/medicine/index',
          iconPath: 'images/zhongyao.png',
          selectedIconPath: 'images/zhongyao.png',
          text: '中药'
        },
        {
          pagePath: 'pages/article/index',
          iconPath: 'images/tongzhi.png',
          selectedIconPath: 'images/tongzhi.png',
          text: '社区'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'images/wode.png',
          selectedIconPath: 'images/wode.png',
          text: '我的'
        },
      ]
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
