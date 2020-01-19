import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import pic1 from '../../images/index_1.png'
import pic2 from '../../images/index_2.png'
import pic3 from '../../images/index_3.png'
import pic4 from '../../images/index_4.png'
import view from '../../images/view.jpg'
import next from '../../images/next.png'

export default class Container extends Component {

    state = {
        newslist: [],
    }
    componentWillMount() {
        this.getNews();
    }

    getNews() {
        Taro.request({ url: `${Taro.requestUrl}getNews` }).then(res => {
            if (res.statusCode == 200) {
                console.log('res', res);
                const newslist = res.data.result;
                console.log('newslist', newslist);
                this.setState({ newslist })
            }
        }
        )
    }

    render() {
        const { newslist } = this.state;
        return (
            <View className='index'>
                <View className='section1'>
                    <View>
                        <Image src={pic1} style={{ width: '50px', height: '50px' }}></Image>
                        <View className='s1-a'>春季</View>
                    </View>
                    <View>
                        <Image src={pic2} style={{ width: '50px', height: '50px' }}></Image>
                        <View className='s1-a'>夏季</View>
                    </View>
                    <View>
                        <Image src={pic3} style={{ width: '50px', height: '50px' }}></Image>
                        <View className='s1-a'>秋季</View>
                    </View>
                    <View>
                        <Image src={pic4} style={{ width: '50px', height: '50px' }}></Image>
                        <View className='s1-a'>冬季</View>
                    </View>
                </View>
                <View className='section2'>
                    <View className='s2-a'>
                        <Image src={view} style={{ width: '100%', height: '90px' }}></Image>
                    </View>
                </View>
                <View className='section3'>
                    <View className='head'>
                        <View>新闻资讯</View>
                        <Image src={next} style={{ width: '30px', height: '30px' }}></Image>
                    </View>
                    <View className='body'>
                        {
                            newslist && newslist.length ?
                                newslist.map(item => {
                                    return (
                                        <View className='item' key={item.id}>
                                            <View className='image'><Image src={item.image} mode='scaleToFill'></Image></View>
                                            <View className='title'>{item.title}</View>
                                        </View>
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
