import React, {Component} from 'react';
import {isIphoneX} from 'react-native-iphone-x-helper'
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    BackHandler
} from 'react-native';
import IngridIcon from "../components/IngridIcon";
import HeartBig from "../components/HeartBig";
import {Toast} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


const s = require('../style');
const g = require('../vars');
let t = {};
import {connect} from 'react-redux';
const styles = g.HEADER_STYLES;

import HTML from 'react-native-render-html';

const mapStateToProps = (state, ownProps) => {


    return {privacy: state.privacy, strings: state.strings};
};



const  classesStyles= { 'last-paragraph': { textAlign: 'right', color: 'teal', fontWeight: '800' } };
const  tagStyles= { strong: {...s.bold,fontSize: 14, lineHeight: 25}, span:  {...s.normal,fontSize: 14, lineHeight: 25}, a:   {...s.normal, fontSize: 14, lineHeight: 25} };


export default connect(mapStateToProps)(class PrivacyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? - g.HEADER_MAX_HEIGHT : 0,
            ),
            sliderOneValue: [1],
            refreshing: false,
            visible: true, delay: 50, animateIn: 0, animate: 0, isFavorite: false, animate2: 0, isTransitioning: 0

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    enableScroll = () => this.setState({scrollEnabled: true});
    disableScroll = () => this.setState({scrollEnabled: false});



    _renderScrollViewContent() {

        return (
            <View style={[styles.scrollViewContent, s.paddingSmall, s.m40]}>
            <HTML classesStyles={classesStyles} tagsStyles={tagStyles} containerStyle={{ ...s.mt20, ...s.m40}} html={this.privacy} imagesMaxWidth={Dimensions.get('window').width} />
                <Text style={s.homeFooterText}>Version 241018-1039</Text>
            </View>


        );
    }


    componentDidMount(){


    }

    render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.

        t = this.props.strings;
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ?  g.HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -g.HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE / 2, g.HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -5],
            extrapolate: 'clamp',
        });
        const barTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, 500],
            extrapolate: 'clamp',
        });
        const titleTranslateY = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -116],
            extrapolate: 'clamp',
        });
        const heartTranslateY = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -95],
            extrapolate: 'clamp',
        });


        return (
            <View style={styles.fill}>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <Animated.ScrollView
                    ref={ref => this.listView = ref}
                    style={styles.fill}
                    scrollEventThrottle={1}
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                        {useNativeDriver: false},
                    )}
                    // iOS offset for RefreshControl
                    contentInset={{
                        top:  g.HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: - g.HEADER_MAX_HEIGHT,
                    }}
                >
                    {this._renderScrollViewContent()}
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header, {backgroundColor: g.primary},
                        {transform: [{translateY: headerTranslate}]},
                    ]}
                ></Animated.View>
                <View style={[styles.bar]}><TouchableOpacity onPress={() => this.props.navigation.goBack()}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>

                <Animated.View
                    style={[
                        s.paddingSmall, styles.titlebar,
                        {
                            transform: [
                                {scale: titleScale},
                                {translateY: titleTranslateY},
                                {translateX: titleTranslate},
                            ],
                        },
                    ]}
                >
                    <Text style={[s.h1, {flex: 1}]} numberOfLines={1}>{t.privacy}</Text>
                </Animated.View>



            </View>
        );
    }
    handleBackButtonClick() {

            const {goBack} = this.props.navigation; goBack();

        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillMount() {


        if (typeof t == 'function') {
            t = t();
        }

        this.privacy = this.props.privacy;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);


    }
})

