import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Switch,
    KeyboardAvoidingView,
    Animated,
    BackHandler
} from 'react-native';
import {
    Container,
    Item,
    Input,
    Toast
} from 'native-base';
import Swiper from 'react-native-swiper';
import HeaderSkip from '../components/HeaderSkip';
import HeaderBack from '../components/HeaderBack';
import IngridButton from '../components/IngridButton';
import Fade from '../components/Fade';
import {DangerZone} from "expo";
import wiggly from "../assets/animations/1-standing.json";
import wiggly2 from "../assets/animations/2-bike.json";
import wiggly3 from "../assets/animations/3-science.json";
import wiggly4 from "../assets/animations/4-wave.json";
import {connect} from 'react-redux';
import {nameChanged, saveSettings} from '../actions';

import LottieView from "lottie-react-native";
const Lottie = LottieView;

const s = require('../style');
const g = require('../vars');
let t = {};

import Loader from '../components/Loader';

class IntroScreen extends Component {
    state = {
        index: 0,
        settings: false,
        name: '',
        visibility: true,
        animations: [wiggly, wiggly2, wiggly3, wiggly4],
        speed: 1,
        width: 320
    };




    constructor(props) {
        super(props);
        this.index = 0;
        this.hasChanged = false;
        this.animations = [];
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    afterIndexChanged = (index) => {

        this.index = index;
        if(!(index == 3 && !this.props.settings.isFirstLaunch)) {
            this._playAnimation(index);
        }
        if ((index == 3 && this.props.settings.isFirstLaunch) || (index == 3 && !this.props.settings.isFirstLaunch)) {
            this.hasChanged = true;
            this.setState({
                visibility: false,

            }, () => {

            })
            if(!this.props.settings.isFirstLaunch){
                const {goBack} = this.props.navigation;

                goBack();
            }
        } else if (this.hasChanged) {
            this.hasChanged = false;
            this.setState({
                visibility: true,
            }, () => {

            })
        }
    };

    skipOrProceed = () => {
        if (this.index != (!this.props.settings.isFirstLaunch ? 2 :3)) {
            this._swiper.scrollBy((!this.props.settings.isFirstLaunch ? 2 :3) - this.index);

        } else {

            if(this.props.settings.isFirstLaunch) {
                this.props.navigation.navigate('Intoleranz', {afterIntro: true});
            }else{
                const {goBack} = this.props.navigation;

                goBack();
            }
        }
    };

    valueChanged(value, key) {


        if (typeof value !== 'undefined' && value.length) {
            this.props.saveSettings(this.props.settings);
            if(this.props.navigation.getParam('showName', false) == false) {
                this.props.navigation.navigate('Intoleranz', {afterIntro: true});
            }else{
                const {goBack} = this.props.navigation;

                goBack();
            }
        } else {

            Toast.show({
                text: 'Bitte sag mir deinen Namen oder klicke auf "' + t.skip + '"',
                buttonText: 'OK',
                textStyle: [s.medium,{ color: 'white', fontSize:12 }, ]
            });
        }

    };

    textChanged(value) {
        this.props.nameChanged(value);
    }


    componentDidMount() {

        this.setState({animations: [wiggly, wiggly2, wiggly3, wiggly4]}, this._playAnimation);
        const maxWidth = Dimensions.get('window').width;
        const maxHeight = Dimensions.get('window').height;
        this.setState({width: maxWidth - (60 / 375 * maxWidth), height: Math.round(170 / 667 * maxHeight)}, () => {
        });
    }

    componentWillMount() {
        this.setState({
            index: 0,
            settings: this.props.settings,
            name: '',
            greeting: t.intro_title4,
            greetingText: t.intro_text4,
            dot: this.dot,
            activeDot: this.activeDot,
            disabled: true,
            showToast: false,
            showName: this.props.navigation.getParam('showName', false)
        }, function () {
            this.setState({
                index: 0,
                settings: this.props.settings,
                name: this.props.settings.userName
            }, function () {
                if (typeof this.state.name !== 'undefined' && this.state.name.length) {
                    this.setState(previousState => {
                        previousState.greeting = t.hallo + " " + this.state.name + "!";
                        previousState.greetingText = t.intro_textHasName4;
                        previousState.disabled = false;
                        return previousState
                    });
                }
            })
        });

        if(typeof t === 'function') {
            t = t();
        }

        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if(!this.props.settings.isFirstLaunch) {
            const {goBack} = this.props.navigation; goBack();
        }
        return true;
    }


    render() {

        t= this.props.strings;


        if(!this.initialName && this.props.settings.userName){
            this.initialName = this.props.settings.userName;
        }

        const {settings} = this.props;
        const showName = !this.props.settings.isFirstLaunch;






        this.styles = StyleSheet.create({
            slide1: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: g.primary,
            },

            slide2: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: g.primary,
            },
            slide3: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: g.primary,
            },
            text: {
                color: g.textColor,
                fontSize: 30,
                fontWeight: 'bold',
            },
            slideTextWrap: {
                flex: 1,
                justifyContent: 'flex-end',
                maxHeight: Math.round(170 / 667 * Dimensions.get('window').height),
                height: Math.round(170 / 667 * Dimensions.get('window').height),
                margin: 0
            },
            AnimationWrap: {
                width: this.state.width,
                height: this.state.width * 1.27,
                justifyContent: 'center',
            }

        });



        if (typeof settings.userName !== 'undefined' && settings.userName.length) {

            this.greeting = t.hallo + " " + settings.userName + "!";
            this.greetingText = t.intro_textHasName4;
            this.button = <IngridButton  style={ {opacity:1} } onPress={() => {
                this.valueChanged(settings.userName, 'userName')
            }} text={showName == false ? t.saveAndContinue : t.saveAndBack} type="small" icon={showName == false ? "ArrowSmallRight" : ""} />

        } else {
            this.greeting = t.intro_title4;
            this.greetingText = t.intro_text4;
            this.button = <IngridButton disabled={true} style={ {opacity:0.4 }} onPress={() => {
                this.valueChanged(settings.userName, 'userName')
            }} text={showName == false ? t.saveAndContinue : t.saveAndBack} type="small" icon={showName == false ? "ArrowSmallRight" : ""} />
        }

        if(!this.props.settings.isFirstLaunch){
            this.button = <IngridButton disabled={true} style={ {opacity:1 }} onPress={() => {const {goBack} = this.props.navigation; goBack();}} text={t.back} type="small" icon={""} />
        }

        

        if(showName){
            return (

                <View style={{flex: 1}}>

                    <Swiper
                        loop={false}
                        index={showName == false ? this.state.index : 0}
                        style={this.styles.wrapper}
                        showsButtons={false}
                        onIndexChanged={this.afterIndexChanged}
                        ref={(swiper) => {
                            this._swiper = swiper
                        }}
                        dot={<Fade visible={this.state.visibility}><View style={s.dotInactive}/></Fade>}
                        activeDot={<Fade visible={this.state.visibility}><View style={s.dotActive}/></Fade>}
                    >

                        {showName == true ? <Container style={[this.styles.slide1, s.paddingSmall]}>
                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        this.animations[0] = animation;
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1}}
                                    source={this.state.animations[0]}
                                    speed={this.state.speed}
                                    loop={true}
                                />
                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{t.intro_title1}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{t.intro_text1}</Text>
                            </View>
                        </Container> : false}
                        {showName == true ? <Container style={[this.styles.slide1, s.paddingSmall]}>
                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        this.animations[1] = animation;
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1.25}}
                                    source={this.state.animations[1]}
                                    speed={this.state.speed}
                                    loop={true}
                                />
                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{t.intro_title2}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{t.intro_text2}</Text>
                            </View>
                        </Container> : false}

                        {showName == true ? <Container style={[this.styles.slide1, s.paddingSmall]}>
                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        this.animations[2] = animation;
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1}}
                                    source={this.state.animations[2]}
                                    speed={this.state.speed}
                                    loop={true}
                                />
                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{t.intro_title3}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{t.intro_text3}</Text>
                            </View>
                        </Container> : false}

                        {showName == true ? <Container style={[this.styles.slide1, s.paddingSmall]}>

                        </Container> : false}
                    </Swiper>
                    <View style={[{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 35,
                        bottom: 0,
                    }]}>
                        <Fade visible={!this.state.visibility}>
                            {this.button}
                        </Fade>
                    </View>


                    <HeaderBack navigation={() => {const {goBack} = this.props.navigation;

                        goBack();}} />

                </View>

            );
        }else {

            return (

                <View style={{flex: 1}}>

                    <Swiper
                        loop={false}
                        index={showName == false ? this.state.index : 0}
                        style={this.styles.wrapper}
                        showsButtons={false}
                        onIndexChanged={this.afterIndexChanged}
                        ref={(swiper) => {
                            this._swiper = swiper
                        }}
                        dot={<Fade visible={this.state.visibility}><View style={s.dotInactive}/></Fade>}
                        activeDot={<Fade visible={this.state.visibility}><View style={s.dotActive}/></Fade>}
                    >

                        {showName == false ? <Container style={[this.styles.slide1, s.paddingSmall]}>
                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        this.animations[0] = animation;
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1}}
                                    source={this.state.animations[0]}
                                    speed={this.state.speed}
                                    loop={true}
                                />
                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{t.intro_title1}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{t.intro_text1}</Text>
                            </View>
                        </Container> : false}
                        {showName == false ? <Container style={[this.styles.slide1, s.paddingSmall]}>
                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        this.animations[1] = animation;
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1.25}}
                                    source={this.state.animations[1]}
                                    speed={this.state.speed}
                                    loop={true}
                                />
                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{t.intro_title2}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{t.intro_text2}</Text>
                            </View>
                        </Container> : false}

                        {showName == false ? <Container style={[this.styles.slide1, s.paddingSmall]}>
                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        this.animations[2] = animation;
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1}}
                                    source={this.state.animations[2]}
                                    speed={this.state.speed}
                                    loop={true}
                                />
                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{t.intro_title3}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{t.intro_text3}</Text>
                            </View>
                        </Container> : false}
                        <KeyboardAvoidingView style={[this.styles.slide1, s.paddingSmall]} behavior="position" enabled>

                            <View style={this.styles.AnimationWrap}>
                                <Lottie
                                    ref={animation => {
                                        if (showName == false) {
                                            this.animations[3] = animation;
                                        } else {
                                            this.animations[0] = animation;
                                        }
                                    }}
                                    style={{width: this.state.width, height: this.state.width * 1.25}}
                                    source={showName == false ? this.state.animations[3] : this.state.animations[0]}
                                    speed={this.state.speed}
                                    loop={true}
                                />

                            </View>
                            <View style={this.styles.slideTextWrap}>
                                <Text style={[s.h1, s.m10, s.textCenter]}>{this.greeting}</Text>
                                <Text style={[s.textContentBig, s.textCenter]}>{this.greetingText}</Text>
                                <Item rounded style={[s.nameInputIntro, s.m40]}>
                                    <Input placeholderTextColor="#A4A4A4" placeholder={t.intro_placeholder4}
                                           defaultValue={this.initialName} style={[s.normal, s.searchInputInner]}
                                           onChangeText={(value) => {
                                               this.textChanged(value)
                                           }}/>
                                </Item>
                            </View>

                        </KeyboardAvoidingView>
                    </Swiper>
                    <View style={[{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 35,
                        bottom: 0,
                    }]}>
                        <Fade visible={!this.state.visibility}>
                            {this.button}
                        </Fade>
                    </View>


                    <HeaderSkip navigation={this.skipOrProceed}/>

                </View>

            );

        }
    }

    isDisabled = function(){
        return this.disabled == true ? {opacity: 1} : {opacity: 0.2};
    };



    _playAnimation = (index) => {
        index = typeof index !== 'undefined' ? index : 0;

        if( this.state.showName){
            index = 3;
        }
        if (!this.state.animations) {
            this._loadAnimation(index);
        } else {
            this.animations[index].play();
        }
    };

    _stopAnimation = (index) => {
        this.animations[index].reset();
    };

    _loadAnimation = (index) => {
        index = typeof index !== 'undefined' ? index : 0;
        this.setState({animations: [wiggly, wiggly2, wiggly3, wiggly4]}, this._playAnimation);

    };


}

const mapStateToProps = state => {
    return {settings: state.tmp, strings: state.strings};
};

export default connect(mapStateToProps, { nameChanged, saveSettings })(IntroScreen);