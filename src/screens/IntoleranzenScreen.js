import React, {Component} from 'react';
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
    BackHandler, Easing
} from 'react-native';

import IngridSwitch from '../components/IngridSwitch';
import IngridButton from '../components/IngridButton';
import IngridIcon from '../components/IngridIcon';

import {Container, Content} from 'native-base';
import HeaderNormal from "../components/HeaderNormal";

import TextTicker from 'react-native-text-ticker'

const s = require('../style');
const g = require('../vars');
let t = {};

const styles = g.HEADER_STYLES;

import {connect} from 'react-redux';
import {intolChanged, saveSettings, copySettings} from '../actions';


class IntoleranzenScreen extends Component {


    wHeight = Dimensions.get('window').height;

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -g.HEADER_MAX_HEIGHT+1 : 0,
            ),

            refreshing: false,
            visible: true, delay: 50, animateIn: 0, animate: 0, isFavorite: false, animate2: 0, isTransitioning: 0

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    enableScroll = () => this.setState({scrollEnabled: true});
    disableScroll = () => this.setState({scrollEnabled: false});

    valueChanged(value, key) {
        this.props.intolChanged({key: key, value: value});

        if(key === 'fructoseDE' && value){
            this.props.intolChanged({key: 'fructoseKP', value: false});
        }

        if(key === 'fructoseKP' && value){
            this.props.intolChanged({key: 'fructoseDE', value: false});
        }

        if(key === 'histaminDE' && value){
            this.props.intolChanged({key: 'histaminKP', value: false});
        }

        if(key === 'histaminKP' && value){
            this.props.intolChanged({key: 'histaminDE', value: false});
        }

    };

    ButtonFirst() {

        if (this.props.settings.isFirstLaunch) {

            const viewStyle = {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 50,
                maxHeight: 50,
                marginTop: 0,
                marginBottom: 40,
            };

            return <View style={viewStyle}><IngridButton onPress={() => {
                this._savetoDB(true);
            }} text={t.saveAndContinue} type="small" icon="ArrowSmallRight"/></View>;
        }
        return false;
    }

    ButtonBottom() {

        if (this.props.settings.isFirstLaunch) {

            const viewStyle = {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 30,
            };

            return <View style={viewStyle}><IngridButton onPress={() => {

                this._savetoDB(true);

            }} text={t.saveAndContinue} type="small" icon="ArrowSmallRight"/></View>;
        }
        return false;
    }

    saveAndBack = () => {
        this._savetoDB(false);
    };


    _savetoDB = async (afterIntro) => {

        try {
            let response = await  fetch(g.apiUrl + 'intol/new?token=' + g.token, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    settings: this.props.settings,
                }),
            });
            let responseJson = await response.json();

            if (responseJson.id) {
                this.props.settings.uid = responseJson.id;
            }
            if(!afterIntro) {
                this.props.saveSettings(this.props.settings);
                this.props.navigation.navigate('Home');
            }else {
                this.props.settings.isFirstLaunch = false;
                this.props.copySettings(this.props.settings);
                this.props.saveSettings(this.props.settings);
                this.props.navigation.navigate('Home', {afterIntro: true});
            }

        } catch (error) {
            return;
        }
    };

    _renderScrollViewContent = () => {
        const containerStyle = {
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50,
            maxHeight: 50,
            marginBottom: 10
        };


        const button = this.ButtonFirst();

        return (
            <View>
                <View style={[styles.scrollViewContent, s.padding]}>
                    <Text style={[s.textContent, s.m40]}>
                        {t.intoleranzentext}
                    </Text>
                    <View style={containerStyle}>
                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.lactoseint}</TextTicker>
                        <IngridSwitch value={this.props.settings.lactose == true} callback={value => {
                            this.valueChanged(value, 'lactose')
                        }}></IngridSwitch>
                    </View>
                    <View style={containerStyle}>

                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.fructoseintDE}</TextTicker>
                        <IngridSwitch value={this.props.settings.fructoseDE == true} callback={value => {
                            this.valueChanged(value, 'fructoseDE')
                        }}></IngridSwitch>
                    </View>
                    <View style={containerStyle}>

                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.fructoseintKP}</TextTicker>
                        <IngridSwitch value={this.props.settings.fructoseKP == true} callback={value => {
                            this.valueChanged(value, 'fructoseKP')
                        }}></IngridSwitch>
                    </View>
                    <View style={containerStyle}>
                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.histaminintDE}</TextTicker>
                        <IngridSwitch value={this.props.settings.histaminDE == true} callback={value => {
                            this.valueChanged(value, 'histaminDE')
                        }}></IngridSwitch>
                    </View>
                    <View style={containerStyle}>
                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.histaminintKP}</TextTicker>
                        <IngridSwitch value={this.props.settings.histaminKP == true} callback={value => {
                            this.valueChanged(value, 'histaminKP')
                        }}></IngridSwitch>
                    </View>
                    <View style={containerStyle}>
                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.sorbitint}</TextTicker>
                        <IngridSwitch value={this.props.settings.sorbit == true} callback={value => {
                            this.valueChanged(value, 'sorbit')
                        }}></IngridSwitch>
                    </View>
                    <View style={containerStyle}>

                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.glutenint}</TextTicker>
                        <IngridSwitch value={this.props.settings.gluten == true} callback={value => {
                            this.valueChanged(value, 'gluten')
                        }}></IngridSwitch>
                    </View>
                    <View style={[containerStyle, s.m40]}>
                        <TextTicker style={[s.h3, s.text, {width: Dimensions.get('window').width - 125} ]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={1000}
                                    loop={true}
                                    bounce>{t.fodmapint}</TextTicker>
                        <IngridSwitch value={this.props.settings.fodmap == true} callback={value => {
                            this.valueChanged(value, 'fodmap')
                        }}></IngridSwitch>
                    </View>

                    {button}
                </View>
            </View>

        );
    }


    render() {
        t = this.props.strings;
        const buttonBottom = this.wHeight > 600 ? this.ButtonBottom() : false;

        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? g.HEADER_MAX_HEIGHT : 0,
        );
        this.headerTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -g.HEADER_SCROLL_DISTANCE],
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
                        top: g.HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -g.HEADER_MAX_HEIGHT,
                    }}
                >
                    {this._renderScrollViewContent()}
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header, {backgroundColor: g.primary},
                        {transform: [{translateY: this.headerTranslate}]},
                    ]}
                ></Animated.View>
                {!(typeof this.props.navigation.state.params.afterIntro !== 'undefined' && this.props.navigation.state.params.afterIntro === true) &&
                <View style={[styles.bar]}><TouchableOpacity onPress={() => this.saveAndBack()}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>}

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
                    <Text style={[s.h1, {flex: 1}]} numberOfLines={1}>{t.intol}</Text>
                </Animated.View>



            </View>
        );


    }

    componentDidMount(){
        this.headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -g.HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.enableScroll();



    }
}

const mapStateToProps = state => {
    return {settings: state.tmp, strings: state.strings};
};

export default connect(mapStateToProps, {intolChanged, saveSettings, copySettings})(IntoleranzenScreen);