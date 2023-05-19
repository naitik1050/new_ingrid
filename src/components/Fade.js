import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';

export default class Fade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            init: false
        };
    };

    componentWillMount() {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
        this._visibility2 = new Animated.Value(this.props.visible ? 0 : 1);
    }

    componentWillUpdate(nextProps) {

        if(this.props.visible !== nextProps.visible) {
            this._visibility = new Animated.Value(nextProps.visible ? 0 : 1);
            this._visibility2 = new Animated.Value(nextProps.visible ? 1 : 0);
            Animated.timing(this._visibility, {
                toValue: nextProps.visible ? 1 : 0,
                duration: 300,
                easing: Easing.cubic().inOut,
                delay: this.props.delay ? this.props.delay :0
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
            top: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
            })
        };

        const combinedStyle = [containerStyle, style];
        return (
            <Animated.View style={combinedStyle} {...rest}>
                {children}
            </Animated.View>
        );
    }
}