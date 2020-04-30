import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import './index.scss'
import view from '../../images/view.png'
import next from '../../images/next.png'

export default class Container extends Component {

    state = {
        newslist: [],
        seasonlist: [],
        current: 1,
        pageSize: 4,
    }
    componentWillMount() {
        this.getNews();
        this.getSeason();
    }

    getNews() {
        Taro.request({ url: `${Taro.requestUrl}getNews`, data: { current: this.state.current, pageSize: this.state.pageSize } }).then(res => {
            if (res.statusCode == 200) {
                const newslist = res.data.result;
                this.setState({ newslist })
            }
        }
        )
    }

    getSeason() {
        Taro.request({ url: `${Taro.requestUrl}getSeason` }).then(res => {
            if (res.statusCode == 200) {
                const seasonlist = res.data.result;
                this.setState({ seasonlist })
            }
        }
        )
    }

    render() {
        const { newslist, seasonlist } = this.state;
        return (
            <View className='index'>
                <View className='section1'>
                    {
                        seasonlist && seasonlist.length > 0 ?
                            seasonlist.map(item => {
                                const url=`../../pages/season/index?id=${item.id}`
                                return (
                                    <Navigator url={url} hoverClass='none' key={item.id}>
                                        <Image src={item.image} style={{ width: '50px', height: '50px' }}></Image>
                                        <View className='s1-a'>{item.season}</View>
                                    </Navigator>
                                )
                            })
                        :
                        ''
                    }
                </View>
                <View className='section2'>
                    <View className='s2-a'>
                        <Image src={view} style={{ width: '100%', height: '90px' }}></Image>
                    </View>
                </View>
                <View className='section3'>
                    <View className='head'>
                        <View>新闻资讯</View>
                        <Navigator url='../../pages/news/index' className='img' hoverClass='none'><Image src={next} style={{ width: '30px', height: '30px' }}></Image></Navigator>
                    </View>
                    <View className='body'>
                        {
                            newslist && newslist.length ?
                                newslist.map(item => {
                                    const url = `../../pages/newsdetail/index?id=${item.id}`
                                    return (
                                        <Navigator url={url} className='item' key={item.id} hoverClass='none'>
                                            <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View>
                                            <View className='title'>{item.title}</View>
                                        </Navigator>
                                    )
                                })
                                :
                                ''
                        }
                    </View>
                </View>
            </View>
        )
    }
}
