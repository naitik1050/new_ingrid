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
    BackHandler,
    Image,
    Alert,
    Webr
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import IngridIcon from "../components/IngridIcon";
import IngridButton from "../components/IngridButton";
import * as RNIap from 'react-native-iap';
import {setScreen, updateAdState} from '../actions';


const s = require('../style');
const g = require('../vars');
let t = {};
import {connect} from 'react-redux';

const styles = g.HEADER_STYLES;
const itemSkus = g.itemSkus;


const mapStateToProps = (state, ownProps) => {


    return {settings: state.tmp, ingtexts: state.ingridTexts, adfree: state.adfree, strings: state.strings};

};


const classesStyles = {'last-paragraph': {textAlign: 'right', color: 'teal', fontWeight: '800'}};
const tagStyles = {
    strong: {...s.bold, fontSize: 14, lineHeight: 25},
    span: {...s.normal, fontSize: 14, lineHeight: 25},
    a: {...s.normal, fontSize: 14, lineHeight: 25}
};


export default connect(mapStateToProps, {setScreen, updateAdState})(class AdfreeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -g.HEADER_MAX_HEIGHT : 0,
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
            <View>
                <View style={[s.paddingExtraSmall, s.m20, s.bgprimary]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.buySubscribeItem(itemSkus[0])}>
                        <Image style={s.adImage} source={(this.props.settings.lang != 'de' ? require('../assets/images/adfree_en.png') : require('../assets/images/adfree.png'))}/>
                    </TouchableOpacity>
                </View>
                <View style={[s.padding, s.m40, s.bgprimary]}>
                    <Text style={[s.h4, s.m20]}>{t.adFreeTitle}</Text>
                    <Text style={[s.h4, s.normal]}>{t.adFreeText}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: 0,
                        marginTop:20,

                    }}>
                    <IngridButton  style={ {opacity:1} } onPress={() => this.props.navigation.navigate('Privacy')} text={t.adFreeLink} type="extra-small" icon="ArrowSmallRight" />
                    </View>
                </View>
                <View style={[s.padding, s.m40]}>
                    <Text
                        style={[s.ingridLoves, s.text, {opacity: 0.6}]}>{this.getFooterText()}</Text>
                    <View style={s.homeFooter}>
                        <TouchableOpacity onPress={() => {
                            this._handlePressButtonAsync('https://www.facebook.com/fragingrid/')
                        }}><Text style={s.homeFooterText}>Facebook</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this._handlePressButtonAsync('https://www.facebook.com/groups/416763288803944/')
                        }}><Text style={s.homeFooterText}>Support</Text></TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }


    componentDidMount() {


    }

    getFooterText = () => {
        const d = new Date();
        const month = (d.getMonth() + 1).toString().length == 1 ? "0" + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString();
        const day = d.getDate().toString();
        const key = month + day;

        if (this.props.ingtexts.date[key]) {
            return this.props.ingtexts.date[key][Math.floor(Math.random() * this.props.ingtexts.date[key].length)]
        } else {
            return this.props.ingtexts.default[Math.floor(Math.random() * this.props.ingtexts.default.length)]
        }

    }
    _handlePressButtonAsync = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        this.setState({result});
    };

    render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.

        t = this.props.strings;
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? g.HEADER_MAX_HEIGHT : 0,
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
            <View style={[styles.fill2, s.bgprimary]}>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <Animated.ScrollView
                    ref={ref => this.listView = ref}
                    style={[styles.fill2, s.bgprimary]}
                    scrollEventThrottle={1}
                    scrollEnabled={this.state.scrollEnabled}
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: g.HEADER_MIN_HEIGHT,
                    }}
                    contentOffset={{
                        y: -g.HEADER_MIN_HEIGHT,
                    }}
                >
                    {this._renderScrollViewContent()}
                </Animated.ScrollView>

                <View style={[styles.bar]}><TouchableOpacity onPress={() => this.props.navigation.goBack()}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>


            </View>
        );
    }

    handleBackButtonClick() {

        const {goBack} = this.props.navigation;
        goBack();

        return true;
    }

    componentWillUnmount() {
        RNIap.endConnection();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    buySubscribeItem = async (sku) => {

        try {
            RNIap.endConnection();
            let result = await RNIap.initConnection();
            const purchase = await RNIap.buySubscription(sku);
            this.setState({receipt: purchase.transactionReceipt}, () => {
                this.props.updateAdState(true);
            });
            RNIap.endConnection();
        } catch (err) {
            switch (err.code) {
                case 'E_ALREADY_OWNED':
                    this.props.updateAdState(true);
                    Alert.alert('Hinweis', t.restoreAbo);
                    break;
                case 'E_USER_CANCELLED':
                    break;
                case 'E_NOT_PREPARED':
                    try {

                        let result = await RNIap.initConnection();
                        await this.buySubscribeItem(sku);
                    } catch (err) {

                    }
                    break;
                default:

                    Alert.alert('Hinweis', err.message);
                    break;
            }

        }


    };

    getSubscriptions = async () => {
        try {
            const products = await RNIap.getSubscriptions(itemSkus);
            this.setState({productList: products});
        } catch (err) {

        }
    };


    async componentWillMount() {


        if (typeof t == 'function') {
            t = t();
        }

        this.faq = this.props.faq;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        try {
            let result = await RNIap.initConnection();
            await this.getSubscriptions();
            const purchases = await RNIap.getAvailablePurchases();
            RNIap.endConnection();
            if (purchases.length && purchases[0].productId == itemSkus[0]) {
                this.props.updateAdState(true);
            } else {
                this.props.updateAdState(false);
            }

        } catch (err) {
            this.props.updateAdState(false);
        }


    }
})

