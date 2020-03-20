import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import './index.scss'

export default class News extends Component {

    state = {
        newslist: [],
        current: 1,
        pageSize: 10,
        total: 0,
    }

    componentWillMount() {
        this.getNews(this.state.current);
    }

    config = {
        navigationBarTitleText: '新闻中心',
    }

    onReachBottom() {
        if (this.state.current * this.state.pageSize < this.state.total) {
            this.setState({ current: this.state.current + 1 })
            this.getNews(this.state.current + 1);
        }
    }

    getNews(page) {
        Taro.request({ url: `${Taro.requestUrl}getNews`, data: { current: page, pageSize: this.state.pageSize } }).then(res => {
            if (res.statusCode == 200) {
                const newnewslist = res.data.result;
                const newslist = newnewslist.concat(this.state.newslist);
                const total = res.data.pagination.total;
                this.setState({
                    newslist,
                    total
                })
            }
        }
        )
    }

    appendZero (obj) {
        if (obj < 10) {
           return '0' + obj
         } else {
           return obj
         }
      }

    render() {
        const { newslist } = this.state;
        return (
            <View className='index'>
                <View className='warp'>
                    {
                        newslist && newslist.length ?
                            newslist.map(item => {
                                var time = new Date(item.createdAt);
                                var yy=time.getFullYear();
                                var mm=this.appendZero(time.getMonth()+1);
                                var dd=this.appendZero(time.getDate());
                                var hh=this.appendZero(time.getHours());
                                var ff=this.appendZero(time.getMinutes());
                                var ss=this.appendZero(time.getSeconds());
                                var date =`${yy}-${mm}-${dd} ${hh}:${ff}:${ss}`
                                const url = `../../pages/newsdetail/index?id=${item.id}`
                                return (
                                    <Navigator url={url} className='item' key={item.id}>
                                        <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View>
                                        <View className='body'>
                                            <View className='title'>{item.title}</View>
                                            <View className='time'>{date}</View>
                                            <View className='text'>{item.text}</View>
                                        </View>
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
