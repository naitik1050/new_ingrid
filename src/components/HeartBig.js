import React from 'react';
import {Animated, Platform} from 'react-native';
import {DangerZone} from "expo";

import LottieView from "lottie-react-native";
const Lottie = LottieView;
const heart = Platform.OS === 'ios' ? require('../assets/heart.json') : require('../assets/heartandroid.json');

export default class HeartBig extends React.Component {

    animate = 0;
    constructor(props) {
        super(props);
        this.state = {
            progress:Platform.OS === 'ios' ? new Animated.Value(props.navigateIn == 0.7 ? 0.3 : 0.7) : new Animated.Value(props.navigateIn == 0.7 ? 0 : 1),
            animate: props.animate,
            animateIn: props.animateIn,
        };
    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }

    render() {
        let progress = new Animated.Value(this.props.isActive ? 0.7 : 0);
        if(Platform.OS === 'ios') {


            const animate = this.props.animate;


            if (animate === 1) {

                if (this.props.navigateIn != 1) {
                    progress = new Animated.Value(this.props.navigateIn);
                } else {
                    progress = new Animated.Value(0.9);

                }

                Animated.timing(progress, {
                    toValue: this.props.navigateIn == 1 ? 1 : (this.props.navigateIn == 0.35 ? 0.7 : 0.35), // <-- Animate to the beginning of animation
                    duration: this.props.navigateIn == 1 ? 450 : 850,
                }).start();
            }
        }else{
             progress = new Animated.Value(this.props.isActive ? 1 : 0);

            const animate = this.props.animate;


            if (animate === 1) {

                if (this.props.navigateIn != 1) {
                    progress = new Animated.Value(this.props.navigateIn == 0.35 ? 0 : 1);
                } else {
                    progress = new Animated.Value(0);

                }

                Animated.timing(progress, {
                    toValue: this.props.navigateIn == 1 ? 0 : (this.props.navigateIn == 0.35 ? 1 : 0), // <-- Animate to the beginning of animation
                    duration: 850,
                }).start();
            }
        }

        return (
            <Lottie
                style={{

                    width: Platform.OS === 'ios' ? 180 : 120,
                    height: Platform.OS === 'ios' ? 180 : 120,


                }}
                source={heart}
                progress={progress}
            />
        );
    }
}
