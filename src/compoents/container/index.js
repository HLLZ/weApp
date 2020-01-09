import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import pic1 from '../../images/contain1.png'
import view from '../../images/view.jpg'
import next from '../../images/next.png'

export default class Container extends Component {

    render() {
        return (
            <View className='index'>
                <View className='section1'>
                    <View>
                        <Image src={pic1} style={{width:'75px',height:'75px'}}></Image>
                        <View className='s1-a'>食材</View>
                    </View>
                    <View>
                        <Image src={pic1} style={{width:'75px',height:'75px'}}></Image>
                        <View className='s1-a'>食材</View>
                    </View>
                    <View>
                        <Image src={pic1} style={{width:'75px',height:'75px'}}></Image>
                        <View className='s1-a'>食材</View>
                    </View>
                    <View>
                        <Image src={pic1} style={{width:'75px',height:'75px'}}></Image>
                        <View className='s1-a'>食材</View>
                    </View>
                </View>
                <View className='section2'>
                    <View className='s2-a'>
                        <Image src={view} style={{width:'100%',height:'90px'}}></Image>
                    </View>
                </View>
                <View className='section3'>
                    <View className='head'>
                        <View>养生推荐</View>
                        <Image src={next} style={{width:'30px',height:'30px'}}></Image>
                    </View>
                </View>
            </View>
        )
    }
}
