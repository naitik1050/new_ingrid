import React, {Component} from 'react';
import {Animated,
    Image,
    Easing, Dimensions} from 'react-native';
const g = require('../vars');
const s = require('../style');

export default class ExpandSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            init: false
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
                duration: 750,
                easing: Easing.cubic().inOut,
                delay: 0
            }).start(() => {
                this.setState({visible: nextProps.visible});
            });

        }
    }

    render() {
        const { visible, style, children, ...rest } = this.props;

        const containerStyle = {
            flex: 1,
            position: 'absolute',
            left:0,
            top:0,
            right:0,
            zIndex: 5,
            justifyContent: 'flex-start',
            backgroundColor: g.primary,
            bottom: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').height, 0],
            })
        };

        const combinedStyle = [containerStyle, style];

        let showChildren = children;
        return (
            <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
                { showChildren}
            </Animated.View>
        );
    }
}