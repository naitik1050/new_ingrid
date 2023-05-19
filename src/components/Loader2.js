import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {DangerZone} from "expo";
import {Modal, Dimensions, View, Text} from "react-native";
import { Container} from "native-base";

import LottieView from "lottie-react-native";
const Lottie = LottieView;
const s = require('../style');


export default class Loader2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible ? props.visible : true,
            init: false,
            hidden: false,
        };
    };

    componentWillMount() {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    }

    componentWillUpdate(nextProps) {
        if(this.props.visible !== nextProps.visible) {
            this._visibility = new Animated.Value(nextProps.visible ? 0 : 1);
            Animated.timing(this._visibility, {
                toValue: nextProps.visible ? 1 : 0,
                duration: 300,
                easing: Easing.cubic().inOut,
                delay: this.props.delay ? this.props.delay : 0
            }).start(() => {
                this.setState({visible: nextProps.visible});
            });
        }
    }


    render() {
        const { visible, style, children, ...rest } = this.props;

        const containerStyle = {
            opacity: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
        };

        const combinedStyle = [containerStyle, style];

        if(this.props.visible === false){
            setTimeout(()=> {
                this.setState({hidden: true});
            }, 500)
        }
        return (this.state.hidden === false ?
            <Animated.View style={[combinedStyle, this.props.white ? {backgroundColor: '#ffffff'} : s.bgprimary, {flex:1, position : 'absolute', top:0, left:0, right:0, bottom:0, zIndex: 999, flexDirection: 'column', justifyContent:'center', alignItems: 'center'}]} >
                <View><Lottie
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{width: 70, height: 70}}
                    source={require('../assets/animations/0-loading-circle.json')}
                    speed={1}
                    loop={true}
                /></View>

            </Animated.View> : false

        );
    }

    componentDidMount() {
        this.animation.play();
    }
}