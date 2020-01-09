import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import Logo from '../../images/Logo.png'

export default class AuthPage extends Taro.Component{
    config={
        navigationBarTitleText: '登陆授权'
    }
    getUserInfo (e) {
        console.log(e,1313)
        if (e.detail.errMsg === 'getUserInfo:ok') {
               const user = e.detail.userInfo;
               console.log('user', user)
            Taro.login().then(res => {
                if (res.errMsg === 'login:ok') {
                    Taro.showLoading({
                        title: '登录中'
                    }).then(() => {
                            Taro.hideLoading();
                            Taro.setStorageSync('user', user);
                            setTimeout(() => {
                                Taro.reLaunch({url: '/pages/index/index'});
                        }, 1000)
                    })
                }
            })
        } else {
            this.refuseAuth();
        }
    }
    refuseAuth () {
        Taro.showToast({
            title: '授权失败，请重试',
            icon: 'none'
        })
        this.setting();
    }
    setting () {
        const that =this;
        Taro.getSetting().then(res => {
            if (!res.authSetting['scope.userInfo']) {
                Taro.showModal({
                    content: '系统检测到您并没有打开用户权限，是否去设置打开',
                    success: function() {
                        if (1) {
                            that.openSetting();
                        }
                    }
                })
            } else {
                // this.loginx(e);
            }
        })
    }
    openSetting () {
        Taro.openSetting().then(res => {
            if (res.authSetting['scope.userInfo']) {
                Taro.showToast({title: '授权成功，请重新登录！'});
            } else {
                Taro.showToast({
                    title: '授权失败！',
                    icon: 'none'
                });
            }
        })
    }
    render(){
        return (
            <View>
                <View className='auth-wrap'>
                    <Image className='auth-logo widthFix' src={Logo} mode='widthFix'></Image>
                    <View className='auth-name'>我家养身</View>
                    <View className='auth-title'>我家养身将请求使用以下信息：</View>
                    <View className='auth-subt'>你的公开信息（昵称、头像等）</View>
                    {
                        Taro.canIUse('button.open-type.getUserInfo') ?
                        <View>
                            <Button className='auth-ok' open-type='getUserInfo' onGetUserInfo={this.getUserInfo.bind(this)}>允许使用</Button>
                            {/* <Button className='auth-no' onClick={this.refuseAuth.bind(this)}>取消</Button> */}
                        </View> :
                        <View className='auth-tip'>您的微信基础库版本过低，请升级后重试</View>
                    }
                </View>
            </View>
        )
    }
}