import React, {Component} from 'react';
import {

    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    NetInfo,
    BackHandler,
    Alert,
} from 'react-native';
import {Text, Container, ListItem, Content, Body, Right} from 'native-base';
import HeaderHome from '../components/HeaderHome';
import Expand from '../components/Expand';
import Fade from "../components/Fade";
import FadeLeft from "../components/FadeLeft";
import IngridIcon from '../components/IngridIcon';
import Label from '../components/Label';
import Loader from '../components/Loader';
import NewsCarousel from '../components/NewsCarousel';
import ModalSelector from 'react-native-modal-selector'


import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux';
import {
    saveSettings,
    setScreen,
    updateAdState,
    updateCats, updateFAQ, updateImprint,
    updateIng,
    updateLastUpdate, updatePrivacy,
    updateSortedIng, updateStrings, updateTexts
} from '../actions';

const s = require('../style');
const g = require('../vars');
let t = '';
import {isIphoneX} from 'react-native-iphone-x-helper'
import * as WebBrowser from 'expo-web-browser';
import * as RNIap from 'react-native-iap';
import * as Localization from 'expo-localization';

const itemSkus = g.itemSkus;

let isVisible = false;

let count = 0;


class HomeScreen extends Component {
    state = {visible: false, delay: 500, newsCarousel: false, newsCarouselText: false, changeLang: false, curLang: ''};

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    toggleExpand = () => {
        this.setState(prev => {
            prev.delay = this.state.visible ? 0 : 0;
            return {visible: !this.state.visible, delay: prev.delay}
        });
    };

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

    render() {
        t = this.props.strings;
        let newsCarousel = false;
        let footerEn = false;

        const data = [
            {key: 0, section: true, label: t.changeLanguage},
            {key: 'de', label: 'Deutsch'},
            {key: 'en', label: 'English'},
        ];

        let footer = <View
            style={[s.padding, s.mt40, s.m40, (!this.props.settings.lang || this.props.settings.lang != 'en') ? {} : {}]}>
            <TouchableWithoutFeedback onPress={() => {
                count++;
                if (count >= 5) {
                    Alert.alert('Dev-Mode', 'Sprache ändern freigeschalten. Sprache ändern auf:', [
                        {
                            text: 'English',
                            onPress: () => {
                                this.setState({changeLang: true});
                                this.props.settings.lang = 'en';
                                this.changeLanguage()
                            }
                        },
                        {
                            text: 'Deutsch',
                            onPress: () => {
                                this.setState({changeLang: true});
                                this.props.settings.lang = 'de';
                                this.changeLanguage()
                            },
                        },
                        {
                            text: 'Info',
                            onPress: () => {
                                Alert.alert('Dev-Mode', JSON.stringify(this.props.settings))
                            },
                        },
                        {text: 'Abbrechen', style: 'cancel'},

                    ],);
                }
            }}>
                <Text
                    style={s.ingridLoves}>{this.getFooterText()}</Text>
            </TouchableWithoutFeedback>
            <View style={s.homeFooter}>
                <TouchableOpacity onPress={() => {
                    this._handlePressButtonAsync('https://www.facebook.com/fragingrid/')
                }}><Text style={s.homeFooterText}>Facebook</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this._handlePressButtonAsync('https://www.facebook.com/groups/416763288803944/')
                }}><Text style={s.homeFooterText}>Supports</Text></TouchableOpacity>
            </View>

        </View>;

        if (!this.props.settings.lang || this.props.settings.lang != 'en') {
            footerEn = false;
        } else {
            if (this.props.adfree) {
                footerEn = footer;
                footer = false;
            }
        }

        let opacity = this.props.adfree ? {opacity: 0.3} : false;
        let tmpnewsCarousel = !this.props.settings.lang || this.props.settings.lang != 'en' ? <NewsCarousel/> : false;
        let tmpnewsCarouselText = !this.props.settings.lang || this.props.settings.lang != 'en' ?
            <View style={[s.padding]}>
                <Label style={s.m10}>{t.labels_news}</Label>
            </View> : false;



        if (this.state.changeLang) {
            return <Loader visible={true}/>
        } else {

            return (
                <Container style={{backgroundColor: '#ffff'}}>
                    <Expand visible={this.state.visible} delay={this.state.delay}>

                        <View style={[s.padding, s.settingsViewTop]}>
                            <FadeLeft visible={this.state.visible} delay={!this.state.visible ? 750 : 0}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Intoleranz', {
                                    afterIntro: false,
                                })} style={[s.settingsViewLink, s.m15]}><Text
                                    style={[s.h2]}>{t.setIntoleranzen}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                         fontSize={14}/></TouchableOpacity>
                            </FadeLeft>
                            <FadeLeft visible={this.state.visible} delay={!this.state.visible ? 900 : 0}>
                                <TouchableOpacity onPress={() => this.handleAdFreeClick()}
                                                  style={[s.settingsViewLink, s.m15, opacity]}><Text
                                    style={[s.h2]}>{t.supportIngrid}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                       fontSize={14}/></TouchableOpacity>
                            </FadeLeft>
                            <FadeLeft visible={this.state.visible} delay={!this.state.visible ? 1050 : 0}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Intro')}
                                    style={[s.settingsViewLink, s.m15]}><Text
                                    style={[s.h2]}>{t.repeatIntro}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                     fontSize={14}/></TouchableOpacity>
                            </FadeLeft>

                            <FadeLeft visible={this.state.visible} delay={!this.state.visible ? 1200 : 0}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('NameChange', {showName: true})}
                                    style={[s.settingsViewLink, s.m15]}><Text
                                    style={[s.h2]}>{t.changeName}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                    fontSize={14}/></TouchableOpacity>
                            </FadeLeft>

                            <FadeLeft visible={this.state.visible} delay={!this.state.visible ? 1350 : 0}>
                                <ModalSelector
                                    touchableActiveOpacity={0.6}
                                    animationType='fade'
                                    data={data}
                                    overlayStyle={{
                                        flex: 1,
                                        padding: '5%',
                                        justifyContent: 'center',
                                        backgroundColor: g.primary
                                    }}
                                    optionContainerStyle={{
                                        backgroundColor: g.primary,
                                        borderWidth: 1,
                                        borderColor: g.textColor
                                    }}
                                    cancelStyle={{backgroundColor: g.textColor}}
                                    optionTextStyle={[s.h2]}
                                    sectionTextStyle={[s.h2]}
                                    cancelTextStyle={[s.bold, {color: 'white'}]}
                                    optionStyle={{borderBottomWidth: 0}}
                                    sectionStyle={{borderBottomColor: g.textColor}}
                                    cancelText={t.cancel}
                                    onChange={option => {
                                        if (option.key !== this.props.settings.lang) {
                                            this.setState({changeLang: true});
                                            this.props.settings.lang = option.key;
                                            this.changeLanguage();
                                            this.toggleExpand()
                                        }
                                    }}>
                                    <View
                                        style={[s.settingsViewLink, s.m15]}><Text
                                        style={[s.h2]}>{t.changeLanguage}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                            fontSize={14}/></View>
                                </ModalSelector>
                            </FadeLeft>

                            {this.restorePurchase()}


                        </View>

                        <View style={[s.padding, s.settingsViewBottom, s.m20]}>
                            <Fade visible={this.state.visible} delay={!this.state.visible ? 1200 : 0}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Imprint', {showName: true})}
                                    style={[s.settingsViewLink, s.m15]}><Text
                                    style={[s.h4, s.medium]}>{t.imprint}</Text></TouchableOpacity>
                            </Fade>
                            <Fade visible={this.state.visible} delay={!this.state.visible ? 1350 : 0}>
                                <TouchableOpacity style={[s.settingsViewLink, s.m15, s.ml30]}
                                                  onPress={() => this.props.navigation.navigate('FAQ')}><Text
                                    style={[s.h4, s.medium]}>{t.notices}</Text></TouchableOpacity>
                            </Fade>
                            <Fade visible={this.state.visible} delay={!this.state.visible ? 1500 : 0}>
                                <TouchableOpacity style={[s.settingsViewLink, s.m15, s.ml30]}
                                                  onPress={() => this.props.navigation.navigate('Privacy')}><Text
                                    style={[s.h4, s.medium]}>{t.privacy}</Text></TouchableOpacity>
                            </Fade>
                        </View>


                    </Expand>
                    <HeaderHome ref={component => {this._headerHome = component}} navigation={() => this.toggleExpand()}
                                navigate="Intro"
                                name={typeof this.props.settings !== 'undefined' && this.props.settings.userName}
                                inputOnPress={() => this.props.navigation.navigate('Search', {showName: true})} />
                    <View style={{
                        height: 30,
                        position: 'absolute',
                        top: Platform.OS === 'ios' ? (isIphoneX() ? 190 : 160) : 185,
                        left: 0,
                        right: 0,
                        zIndex: 2
                    }}><LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
                        locations={[0.2, 1]}
                        style={{height: 30, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3}}>
                    </LinearGradient></View>
                    <Content style={{position: 'relative', zIndex: 1,}}>
                        <View style={[s.padding, s.mt40, s.m40]}>
                            <Label style={s.m10}>{t.labels_suchliste}</Label>
                            <TouchableOpacity onPress={() => {

                                this.props.navigation.navigate('Category', {
                                    afterIntro: false,
                                })
                            }} style={[s.settingsViewLink, s.m15]}><Text
                                style={[s.h2_5]}>{t.nahrungsmittel}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                      fontSize={14}/></TouchableOpacity>
                            <TouchableOpacity onPress={() => {


                                this.props.navigation.navigate('Ingredients', {
                                    allGreen: true,
                                })
                            }} style={[s.settingsViewLink, s.m15]}><Text
                                style={[s.h2_5]}>{t.vertraeglichkeiten}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                          fontSize={14}/></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {


                                    this.props.navigation.navigate('Ingredients', {
                                        favorites: true,
                                    })
                                }}
                                style={[s.settingsViewLink, s.m15]}><Text
                                style={[s.h2_5]}>{t.favoriten}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                                 fontSize={14}/></TouchableOpacity>

                        </View>


                        {tmpnewsCarouselText}
                        {tmpnewsCarousel}
                        {footer}

                    </Content>
                    {footerEn}

                    {(this.props.settings ? <Loader visible={false}/> : <Loader visible={true}/>)}
                </Container>
            );
        }

    }

    _handlePressButtonAsync = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        this.setState({result});
    };

    restorePurchase() {
        if (!this.props.adfree) {
            return <FadeLeft visible={this.state.visible} delay={!this.state.visible ? 1500 : 0}>
                <TouchableOpacity
                    onPress={() => this.handleRestorePurchaseClick()}
                    style={[s.settingsViewLink, s.m15]}><Text
                    style={[s.h2]}>{t.restorePurchase}</Text><IngridIcon icon={'ArrowSmallRight'}
                                                                         fontSize={14}/></TouchableOpacity>
            </FadeLeft>
        } else {
            return false;
        }
    }

    async componentDidMount() {
        count = 0;
        let lang = Localization.locale.substr(0, 2);

        lang = lang !== 'de' ? 'en' : 'de';
        this.setState({curLang: lang});
        if (!this.props.settings.lang || this.props.settings.lang != 'en') {

            this.setState({newsCarousel: true});
            this.setState({
                newsCarouselText: <View style={[s.padding]}>
                    <Label style={s.m10}>{t.labels_news}</Label>
                </View>
            });
        } else {
            this.setState({newsCarousel: false});
            this.setState({newsCarouselText: false});
        }

    }


    getSubscriptions = async () => {
        try {
            const products = await RNIap.getSubscriptions(itemSkus);

            this.setState({productList: products});
        } catch (err) {

        }
    };

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
                        Alert.alert('Hinweis', err.message);
                    }
                    break;
                default:
                    Alert.alert('Hinweis', err.message);
                    break;
            }

        }


    };


    async componentWillMount() {

        if (typeof t == 'function') {
            t = t();
        }


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        try {
            let result = await RNIap.initConnection();
            await this.getSubscriptions();
            const purchases = await RNIap.getAvailablePurchases();
            RNIap.endConnection();
            if (purchases.length && purchases[0].productId == itemSkus[0]) {
                console.log(purchases);

                this.props.updateAdState(true);
            } else {
                this.props.updateAdState(false);
            }

        } catch (err) {
            this.props.updateAdState(false);
        }

    }




    componentWillUnmount() {
        count = 0;
        RNIap.endConnection();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (!this.state.visible) {
            BackHandler.exitApp();
            return true;
        } else {
            this._headerHome.toggleExpand();
            return true;
        }
    }

    async handleRestorePurchaseClick() {
        try {
            const purchases = await RNIap.getAvailablePurchases();

            if (purchases.length && purchases[0].productId == itemSkus[0]) {
                this.props.updateAdState(true);
                Alert.alert('Hinweis', restoreAbo);
            } else {
                this.props.updateAdState(false);
                Alert.alert('Hinweis', t.noAboFound);
            }

        } catch (err) {
            this.props.updateAdState(false);
        }
    }

    handleAdFreeClick() {
        if (!this.props.adfree) {
            if (Platform.OS === 'ios') {
                this.props.navigation.navigate('Adfree', {
                    favorites: true,
                })
            } else {
                this.buySubscribeItem(itemSkus[0]);
            }
        } else {
            Alert.alert('Hinweis', t.alreadySupporter);
        }

    }


    async changeLanguage() {
        await this.props.saveSettings({...this.props.settings});
        NetInfo.isConnected.fetch().then(isConnected => {

            if (isConnected) {
                this.handleFirstConnectivityChange(isConnected)
            } else {
                NetInfo.isConnected.addEventListener(
                    'connectionChange',
                    this.handleFirstConnectivityChange
                );
            }
        });


    }

    handleFirstConnectivityChange = async (isConnected) => {
        if (isConnected == true) {

            await this.fetchCategories();
            await this.fetchIngredients();
            await this.fetchSortedIngredients();
            await this.fetchIngridStrings();

            this.setState({changeLang: false});

        } else {
            alert('Keine Internetverbindung!')
        }
    }


    async fetchCategories() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/categories/' + this.props.settings.lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();


        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {
            await this.props.updateCats(responseJson.categories);
        }
    }

    async fetchIngredients() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/ingredients/all/' + this.props.settings.lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();


        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {
            await this.props.updateIng(responseJson.ingredients);

        }
    }


    async fetchSortedIngredients() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/sortedIngredients/all/' + this.props.settings.lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();


        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {
            await this.props.updateSortedIng(responseJson.ingredients);

        }
    }


    async fetchIngridStrings() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/ingridStrings/' + this.props.settings.lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();


        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {


            await this.props.updateStrings(responseJson.strings);
            await this.props.updateTexts(responseJson.texts);
            await this.props.updateImprint(responseJson.imprint);
            await this.props.updateFAQ(responseJson.faq);
            await this.props.updatePrivacy(responseJson.privacy);

        }
    }
}

const mapStateToProps = state => {
    return {settings: state.tmp, ingtexts: state.ingridTexts, strings: state.strings, adfree: state.adfree};
};

export default connect(mapStateToProps, {
    setScreen, updateAdState,
    saveSettings,
    updateCats,
    updateLastUpdate,
    updateIng,
    updateSortedIng,
    updateTexts,
    updateStrings,
    updateFAQ,
    updateImprint,
    updatePrivacy,
})(HomeScreen);