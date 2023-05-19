import React, {Component} from 'react';
import  {NetInfo} from 'react-native';
import SVG, {G} from 'react-native-svg';
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Button,
    Easing,
    BackHandler
} from 'react-native';
import IngridIcon from "../components/IngridIcon";
import HeartBig from "../components/HeartBig";
import Slice from "../components/Slice";
import Loader2 from "../components/Loader2";
import {Toast} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TextTicker from 'react-native-text-ticker'

const AnimatedSlice = Animated.createAnimatedComponent(Slice);


const s = require('../style');
const g = require('../vars');
let t = {};
import {connect} from 'react-redux';
import {addFavorite, removeFavorite, addOwnRating, removeOwnRating} from "../actions";
import IntolDetail from "../components/IntolDetail";
import Infobox from "../components/Infobox";
const styles = g.HEADER_STYLES;

let communityRating = [
    {
        number: 100,
        color: 'rgba(216,216,216,0.3)'
    }
];

const mapStateToProps = (state, ownProps) => {


    return {favorites: state.favorites, ownRating: state.ownRating, settings: state.tmp, strings: state.strings};
};

export default connect(mapStateToProps, {addFavorite, removeFavorite, addOwnRating, removeOwnRating})(class DetailScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? - g.HEADER_MAX_HEIGHT : 0,
            ),
            animValue: new Animated.Value(0),
            sliderOneValue: [0],
            refreshing: false,
            screen: 'ingrid',
            isLoading: true,
            noData: false,
            visible: true, delay: 50, animateIn: 0, animate: 0, isFavorite: false, animate2: 0, isTransitioning: 0,noConnection: false

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    resetPie = ()=>{
        this.state.animValue.setValue(0);
    };

    animate = ()=>{

        Animated.timing(
            this.state.animValue,
            {
                toValue: 2,
                duration: 1000,
                easing: Easing.inOut(Easing.cubic)
            }
        ).start();


    };

    enableScroll = () => this.setState({scrollEnabled: true});
    disableScroll = () => this.setState({scrollEnabled: false});

    async toggleExpand() {
        if (this.props.favorites[this.props.navigation.state.params.data.id]) {
            await  this.props.removeFavorite(this.props.navigation.state.params.data.id);
            Toast.show({

                text: '"' + this.props.navigation.state.params.data.title + '" ' + t.favRemove,

                buttonText: 'OK',
                duration: 3000,
                textStyle: [s.medium,{ color: 'white', fontSize:12 }, ]
            });
        } else {

            await this.props.addFavorite(this.props.navigation.state.params.data);
            Toast.show({
                text: '"' + this.props.navigation.state.params.data.title + '" ' + t.favAdd,
                buttonText: 'OK',
                duration: 3000,
                textStyle: [s.medium,{ color: 'white', fontSize:12 }, ]
            });

        }

        this.setState(prev => {
            prev.delay = !this.state.visible ? 100 : 50;
            return {
                isFavorite: (prev.animateIn == 1) ? false : true,
                visible: !this.state.visible,
                delay: prev.delay,
                animateIn: prev.animateIn == 2 ? 1 : (prev.animateIn == 0 ? 1 : 2),
                animate: 1,
                isTransitioning: 1
            }
        });


    };

    _renderScrollViewContent() {
        const data = Array.from({length: 30});



        return (
            <View>
                <View style={[styles.scrollViewContent, s.paddingSmall, s.m40]}>
                    {this.tmpSettings &&  <IntolDetail data={this.props.navigation.state.params.data} settings={this.tmpSettings}/> }
                </View>
                <View style={[s.mt40, s.m20, s.padding]}>
                    <View style={[s.m30, {backgroundColor: '#D8D8D8', flex: 1, height: 2,}]}/>
                    <Text style={[s.h2]}>{t.rating}</Text>
                </View>
                <View style={[{position: 'relative'}]}>
                    <View style={[s.padding, {
                        flex: 1,
                        height: 4,
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'space-evenly',
                        position: 'absolute',
                        zIndex: 1,
                        top: -1,
                        left: 0,
                        right: 0,
                    }]}>
                        <View style={{backgroundColor: "#f2f2f2", flex: 0.245, height: 4}}/>
                        <View style={{backgroundColor: g.color1, flex: 0.245, height: 4}}/>
                        <View style={{backgroundColor: g.color2, flex: 0.245, height: 4}}/>
                        <View style={{backgroundColor: g.color3, flex: 0.245, height: 4}}/>
                    </View>
                    <MultiSlider
                        values={this.state.sliderOneValue}
                        min={0}
                        max={3}

                        containerStyle={{marginLeft:  35, position: 'relative', zIndex: 3, overflow: 'visible', padding:28, marginTop: -28}}
                        trackStyle={{backgroundColor: 'transparent'}}
                        selectedStyle={{backgroundColor: 'transparent'}}
                        onValuesChangeStart={this.disableScroll}
                        onValuesChange={this.sliderOneValuesChange}
                        markerStyle={{
                            backgroundColor: 'white',
                            borderColor: '#E5E5E5',
                            borderWidth: 1,
                            width: 28,
                            height: 28,
                            borderRadius: 30,
                            elevation:1,
                            overflow: 'visible'
                        }}
                        onValuesChangeFinish={this.enableScroll}
                        sliderLength={ Dimensions.get('window').width - 130}

                    />



                </View>
                <View style={[s.mt20,s.m40, s.paddingSmall]}>
                    <Infobox>
                    <Text style={[s.h3, s.normal, {paddingRight: 40}]}>{t.ratingInfo}</Text>
                    </Infobox>
                </View>
            </View>
        );
    }

    _renderScrollViewContentCommunity() {
        const data = Array.from({length: 30});
        let endAngle = Animated.multiply(this.state.animValue, Math.PI);
            let content = false;

        if(this.state.isLoading) {
            this._getCommunityRating();
        }

        if(this.state.noConnection){
            content = <View style={[styles.scrollViewContent,  s.m40]}><Infobox type={'no-connection'} ><Text style={[s.h3, s.normal, {textAlign: 'center'}]}>{t.noConnection}</Text></Infobox></View>
        }else{
            content =       <View style={[styles.scrollViewContent,  s.m40]}>
                {this.state.isLoading && <Loader2 visible={this.state.isLoading} white={true} />}
                {!this.state.noData  && <View style={[s.m10, s.paddingSmall]}><Infobox><Text style={[s.h3, s.normal, {paddingRight: 40}]}>{t.communityRatingInfo}</Text></Infobox></View>}
                {this.state.noData && <View style={[s.mt20, s.paddingSmall]}><Infobox type={'not-found'}><Text style={[s.h3, s.normal, {textAlign: 'center'}]}>{t.communityNoDataText}</Text></Infobox></View>}
                {!this.state.noData && !this.state.isLoading  && <View style={[ s.padding, {flex:1, alignItems: "center"}]}>
                    <View style={[s.m40, {flex:1, alignSelf: 'flex-start'}]}>
                        <Text style={[s.h2]}>{t.communityRatingTitle}</Text>
                    </View>
                    <SVG
                        width={200}
                        style={{width: 200, height: 200}}
                        height={200}
                        viewBox={`-100 -100 200 200`}
                    >
                        <G>
                            {
                                communityRating.map( (item, index) =>{
                                    return (
                                        <AnimatedSlice
                                            index={index}
                                            endAngle={endAngle}
                                            color={item.color}
                                            data={communityRating}
                                            key={'pie_shape_' + index}
                                        />
                                    )
                                })
                            }
                        </G>
                    </SVG>
                    <View style={[s.mt40, {flex:1, alignSelf: 'flex-start'}]}>
                        <View style={{

                            height: 25,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',

                        }}>
                            <IngridIcon icon={'Smiley1'} fontSize={21}
                                        style={{paddingRight: 15}}/><Text style={[s.h3, s.normal, {color: g['colorStrong1'] }]}>{Math.round(communityRating[0]['number'])}% {t.communityRatingGreen}</Text>
                        </View>
                        <View style={{

                            height: 25,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',

                        }}>
                            <IngridIcon icon={'Smiley2'} fontSize={21}
                                        style={{paddingRight: 15}}/><Text style={[s.h3, s.normal, {color: g['colorStrong2'] }]}>{Math.round(communityRating[1]['number'])}% {t.communityRatingOrange}</Text>
                        </View>
                        <View style={{

                            height: 25,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',

                        }}>
                            <IngridIcon icon={'Smiley3'} fontSize={21}
                                        style={{paddingRight: 15}}/><Text style={[s.h3, s.normal, {color: g['colorStrong3'] }]}>{Math.round(communityRating[2]['number'])}% {t.communityRatingRed}</Text>
                        </View>
                    </View>
                </View> }
            </View>
        }
        return (
            <View >
                {content}

                <View style={[ s.m20, s.padding]}>
                    <View style={[s.m30, {backgroundColor: '#D8D8D8', flex: 1, height: 2,}]}/>
                    <Text style={[s.h2]}>{t.rating}</Text>
                </View>
                <View style={[{position: 'relative'}]}>
                    <View style={[s.padding, {
                        flex: 1,
                        height: 4,
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'space-evenly',
                        position: 'absolute',
                        zIndex: 1,
                        top: -1,
                        left: 0,
                        right: 0
                    }]}>
                        <View style={{backgroundColor: "#f2f2f2", flex: 0.245, height: 4}}/>
                        <View style={{backgroundColor: g.color1, flex: 0.245, height: 4}}/>
                        <View style={{backgroundColor: g.color2, flex: 0.245, height: 4}}/>
                        <View style={{backgroundColor: g.color3, flex: 0.245, height: 4}}/>
                    </View>
                    <MultiSlider
                        values={this.state.sliderOneValue}
                        min={0}
                        max={3}

                        containerStyle={{marginLeft:  35, position: 'relative', zIndex: 3, overflow: 'visible', padding:28, marginTop: -28}}
                        trackStyle={{backgroundColor: 'transparent'}}
                        selectedStyle={{backgroundColor: 'transparent'}}
                        onValuesChangeStart={this.disableScroll}
                        onValuesChange={this.sliderOneValuesChange}
                        markerStyle={{
                            backgroundColor: 'white',
                            borderColor: '#E5E5E5',
                            borderWidth: 1,
                            width: 28,
                            height: 28,
                            borderRadius: 30,
                            elevation:1,
                            overflow: 'visible'
                        }}
                        onValuesChangeFinish={this.enableScroll}
                        sliderLength={ Dimensions.get('window').width - 130}

                    />
                </View>
                <View style={[s.m40, s.paddingSmall]}>
                    <Infobox>
                        <Text style={[s.h3, s.normal, {paddingRight: 40}]}>{t.ratingInfo}</Text>
                    </Infobox>
                </View>

            </View>
        );
    }

    sliderOneValuesChange = (values) => {
        let newValues = [0];
        newValues[0] = parseInt(values[0]);



        if(newValues[0] !== this.state.sliderOneValue[0]) {
            if(newValues[0] !== 0 ) {
                this.props.addOwnRating({id: this.props.navigation.state.params.data.id, rating: newValues[0]});
            }else{
                this.props.removeOwnRating(this.props.navigation.state.params.data.id);
            }


            this._savetoDB(newValues[0]);
            this.setState(
                {
                    sliderOneValue: newValues,
                    animate: 0
                }, () => {
                    Animated.timing(this.animateColor, {
                        toValue: newValues[0] !== 0 ? newValues[0] : this.initColor,
                        duration: 350
                    }).start();
                });
        }
    };

    _savetoDB = async(rating) =>{

        if(this.props.settings.uid) {
            try {
                let response = await  fetch(g.apiUrl + 'ingredient/rating?token=' + g.token, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        settings: {
                            uid: this.props.settings.uid,
                            ing: this.props.navigation.state.params.data.id,
                            rating: rating,
                        },
                    }),
                });
                let responseJson = await response.json();



            } catch (error) {

                return;
            }
        }else{
            return;
        }
    };


    _getCommunityRating = async(rating) =>{

                if (!this.isConnected) {
                    this.setState({noConnection : true});
                    return;
                }

                else {
                    if(this.props.settings.uid) {
                        let responseJson = '';

                        try {
                            let response = await fetch(g.apiUrl + 'ingredient/rating/' + this.props.navigation.state.params.data.id+ '/' + this.props.settings.uid +'?token=' + g.token, {
                                method: 'GET',
                            });
                            responseJson = await response.json();




                        } catch (error) {

                            return;
                        } finally{
                            if( (typeof responseJson.ratings !== 'undefined') && responseJson.ratings.length ){
                                let count = {
                                    1: 0,
                                    2: 0,
                                    3: 0,

                                };
                                responseJson.ratings.map(i => {
                                    count[i]++;
                                });

                                count.total = count[1] + count [2] + count[3];
                                communityRating = [
                                    {
                                        number: count[1]/count.total*100,
                                        color: g.color1
                                    },
                                    {
                                        number: count[2]/count.total*100,
                                        color: g.color2
                                    },
                                    {
                                        number: count[3]/count.total*100,
                                        color: g.color3
                                    }
                                ]


                            }else{
                                communityRating = [
                                    {
                                        number: 100,
                                        color: 'rgba(216,216,216,0.3)'
                                    }
                                ];
                                if(this.state.isLoading) {
                                    Animated.timing(this.animateColor, {
                                        toValue: 0,
                                        duration: 350
                                    }).start();
                                    this.setState({noData: true});
                                }
                            }

                            if(this.state.isLoading) {
                                this.setState({isLoading: false});
                                this.animate();
                            }


                        }

                        this.animate();


                    }else{
                        return;
                    }
                }



    };

    componentDidMount(){

        NetInfo.isConnected.fetch().then(isConnected => {
           this.isConnected = isConnected
        });
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );

    }

    switchScreen = (screen) =>{
      this.setState({screen});
      if(screen == 'ingrid'){
          this.setState({isLoading: true, noData: false}); this.resetPie(); Animated.timing(this.animateColor, {
              toValue: this.state.sliderOneValue[0] !== 0 ? this.state.sliderOneValue[0] : this.initColor,
              duration: 350
          }).start();
      }
    };

    render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.
        t = this.props.strings;
        const data = this.props.navigation.state.params.data;

        const isFavorite = this.props.favorites[data.id];


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
            outputRange: [0, -500],
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

        const interpolateColor = this.animateColor.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: ['rgb(243,243,243)', g.color1, g.color2, g.color3, ]
        });


        const animatedStyle = {
            backgroundColor: interpolateColor,
        };

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
                    {this.state.screen == 'ingrid' && this._renderScrollViewContent()}
                    {this.state.screen == 'community' && this._renderScrollViewContentCommunity()}
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header, animatedStyle,
                        {transform: [{translateY: headerTranslate}]},
                    ]}
                ></Animated.View>
                <View style={[styles.bar]}><TouchableOpacity onPress={() => this.props.navigation.goBack()}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>
                <Animated.View
                    style={[
                        s.paddingSmall, styles.switchbar,{right: barTranslate},
                    ]}
                >
                    <TouchableWithoutFeedback style={styles.switchbarText} onPress={() => {this.switchScreen('ingrid'); }} >
                    <View><Text style={[s.h2, this.state.screen == 'ingrid' && styles.switchbarActive]}>{t.ingrid}</Text></View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.switchbarText} onPress={() => this.switchScreen('community')} >
                    <View><Text style={[s.h2,{marginLeft: 10},this.state.screen == 'community' && styles.switchbarActive]}>{t.community}</Text></View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Animated.View
                    style={[
                        {width: Dimensions.get('window').width - 50}, s.paddingSmall, styles.titlebar,
                        {
                            transform: [
                                {scale: titleScale},
                                {translateY: titleTranslateY},
                                {translateX: titleTranslate},
                            ],
                        },
                    ]}
                >
                    <TextTicker style={[s.h1]} easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={2000}
                                loop={true}
                                bounce>{data.title}</TextTicker>
                </Animated.View>
                <Animated.View
                    style={[
                        s.paddingSmall, styles.titlebar, (Platform.OS !== 'ios' ? { width: 120, height:120, flex: 0 , position: 'absolute', right:0, top: 87, left:'auto', zIndex: 999} : {}),
                        {
                            transform: [

                                {translateY: heartTranslateY},

                            ],
                        },
                    ]}
                >
                    <TouchableOpacity onPress={() => this.toggleExpand()} style={
                        {
                            width: Platform.OS !== 'ios' ? 120 : 180 ,
                            height: Platform.OS !== 'ios' ? 120 : 180 ,
                            position: 'absolute',
                            right: Platform.OS !== 'ios' ? 0 : -22 ,
                            top: Platform.OS !== 'ios' ? 0 : -70 ,
                        }
                    }>
                        <HeartBig isActive={isFavorite} animate={this.state.animate}
                                  navigateIn={this.state.animateIn == 2 ? 1 : (this.state.animateIn == 1 ? 0.35 : 0.7)}/></TouchableOpacity>
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



        const data = this.props.navigation.state.params.data;

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        this.enableScroll();
        if (this.props.favorites[this.props.navigation.state.params.data.id]) {
            this.setState({isFavorite: true, animateIn: 1});
        }
        if (typeof t == 'function') {
            t = t();
        }

        this.color = g.color1;
        this.animateColor = new Animated.Value(0);


        if(this.props.ownRating[data.id]) {
            this.color = g['color' + this.props.ownRating[data.id]];
            this.setState({
                sliderOneValue: [this.props.ownRating[data.id]],
            });
            this.animateColor = new Animated.Value(this.props.ownRating[data.id]);
            this.initColor = 0;
            if ((this.props.settings.lactose && data.lactose === 1) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 1) || (this.props.settings.histaminDE && data.histamin.duration === 1) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 1) || (this.props.settings.fructoseDE && data.fructose.duration === 1) || (this.props.settings.gluten && data.gluten === 1) || (this.props.settings.sorbit && data.sorbit === 1) || (this.props.settings.fodmap && data.fodmap === 1)) {

                this.initColor = 1;

            }
            if ((this.props.settings.lactose && data.lactose === 2) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 2) || (this.props.settings.histaminDE && data.histamin.duration === 2) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 2) || (this.props.settings.fructoseDE && data.fructose.duration === 2) || (this.props.settings.gluten && data.gluten === 2) || (this.props.settings.sorbit && data.sorbit === 2) || (this.props.settings.fodmap && data.fodmap === 2)) {

                this.initColor = 2;

            }

            if ((this.props.settings.lactose && data.lactose === 3) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 3) || (this.props.settings.histaminDE && data.histamin.duration === 3) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 3) || (this.props.settings.fructoseDE && data.fructose.duration === 3) || (this.props.settings.gluten && data.gluten === 3) || (this.props.settings.sorbit && data.sorbit === 3) || (this.props.settings.fodmap && data.fodmap === 3)) {

                this.initColor = 3;

            }
        }else {
            this.initColor = 0;
            if ((this.props.settings.lactose && data.lactose === 1) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 1) || (this.props.settings.histaminDE && data.histamin.duration === 1) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 1) || (this.props.settings.fructoseDE && data.fructose.duration === 1) || (this.props.settings.gluten && data.gluten === 1) || (this.props.settings.sorbit && data.sorbit === 1) || (this.props.settings.fodmap && data.fodmap === 1)) {
                this.color = g.color1;

                this.animateColor = new Animated.Value(1);
                this.initColor = 1;

            }
            if ((this.props.settings.lactose && data.lactose === 2) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 2) || (this.props.settings.histaminDE && data.histamin.duration === 2) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 2) || (this.props.settings.fructoseDE && data.fructose.duration === 2) || (this.props.settings.gluten && data.gluten === 2) || (this.props.settings.sorbit && data.sorbit === 2) || (this.props.settings.fodmap && data.fodmap === 2)) {
                this.color = g.color2;

                this.animateColor = new Animated.Value(2);
                this.initColor = 2;

            }

            if ((this.props.settings.lactose && data.lactose === 0) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 0) || (this.props.settings.histaminDE && data.histamin.duration === 0) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 0) || (this.props.settings.fructoseDE && data.fructose.duration === 0) || (this.props.settings.gluten && data.gluten === 0) || (this.props.settings.sorbit && data.sorbit === 0) || (this.props.settings.fodmap && data.fodmap === 0)) {
                this.color = g.color1;

                this.animateColor = new Animated.Value(0);
                this.initColor = 0;

            }

            if ((this.props.settings.lactose && data.lactose === 3) || (this.props.settings.histaminKP && data.histamin.period_of_rest === 3) || (this.props.settings.histaminDE && data.histamin.duration === 3) || (this.props.settings.fructoseKP && data.fructose.period_of_rest === 3) || (this.props.settings.fructoseDE && data.fructose.duration === 3) || (this.props.settings.gluten && data.gluten === 3) || (this.props.settings.sorbit && data.sorbit === 3) || (this.props.settings.fodmap && data.fodmap === 3)) {
                this.color = g.color3;
                this.animateColor = new Animated.Value(3);
                this.initColor = 3;

            }
        }


        this.tmpSettings = {...this.props.settings};

        this.tmpSettings.fructose = {duration: this.tmpSettings.fructoseDE, period_of_rest: this.tmpSettings.fructoseKP};

        delete this.tmpSettings.fructoseKP;
        delete this.tmpSettings.fructoseDE;

        this.tmpSettings.histamin = {duration: this.tmpSettings.histaminDE, period_of_rest: this.tmpSettings.histaminKP};

        delete this.tmpSettings.histaminKP;
        delete this.tmpSettings.histaminDE;

        this.rateColor = this.color;


    }

    handleFirstConnectivityChange = (isConnected) => {
        if (!isConnected) {
            this.isConnected = false;
        }

        else {
            this.isConnected = true;

        }


    }

})

