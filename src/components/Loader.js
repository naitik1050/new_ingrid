import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {Modal, Dimensions, View, Text} from "react-native";
import { Container} from "native-base";
import {connect} from "react-redux";
import LottieView from "lottie-react-native";
const Lottie = LottieView;
const s = require('../style');
let t = {};

const mapStateToProps = (state, ownProps) => {


    return {settings: state.settings, strings: state.strings};
};

export default connect(mapStateToProps)(  class Loader extends Component {
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
        t = this.props.strings;
        const { visible, style, children, ...rest } = this.props;


        const combinedStyle = [ style];

        if(this.props.visible === false){
            setTimeout(()=> {
                this.setState({hidden: true});
            }, 500)
        }
        let text = false;

        let updateNotice = {
            'de': "Hi! Ich hole mir noch die aktuellsten Daten. Das kann einen Augenblick dauern.",
            'en': "Hey there! Relax, while I'm grabbing the latest data. This may take a moment."
        };
        if(this.props.updating === true){
            text = <View style={s.padding}><Text style={[s.h2, s.mt30, {textAlign: 'center'}]}>{updateNotice[this.props.settings.lang]}</Text></View>
        }
        return (this.state.hidden === false ?
            <View style={[combinedStyle, this.props.white ? {backgroundColor: '#ffffff'} : s.bgprimary, {flex:1, position : 'absolute', top:0, left:0, right:0, bottom:0, zIndex: 999, flexDirection: 'column', justifyContent:'center', alignItems: 'center'}]} >
                <View><Lottie
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{width: 150, height: 150}}
                    source={require('../assets/animations/0-loading.json')}
                    speed={1}
                    loop={true}
                /></View>
                {text}


            </View> : false

        );
    }


    componentDidMount() {
        this.animation.play();
    }
})