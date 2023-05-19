import React from 'react';
import {Animated} from 'react-native';
import {DangerZone} from "expo";

import LottieView from "lottie-react-native";
const Lottie = LottieView;

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(props.navigateIn),
            animate: props.animate,
        };
    }

    componentDidMount() {

    }

    render() {

        let progress = new Animated.Value(0);
        if (this.props.animate === 1) {
            progress = new Animated.Value(this.props.navigateIn === 0 ? 1 : 0);
            Animated.timing(progress, {
                toValue: this.props.navigateIn, // <-- Animate to the beginning of animation
                duration: 1000,
            }).start();
        }

        return (
            <Lottie
                style={{
                    width: 32,
                    height: 32,
                }}
                source={require('../assets/data2.json')}
                progress={progress}
            />
        );
    }
}
