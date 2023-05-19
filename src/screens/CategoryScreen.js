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

    BackHandler, Image
} from 'react-native';



import CategoryList from '../components/CategoryList';


import {Item, Input} from 'native-base';

import HeaderDetail from "../components/HeaderDetail";
import IngridIcon from "../components/IngridIcon";

const s = require('../style');
const g = require('../vars');
let t = {};

import {connect} from 'react-redux';
import {intolChanged, saveSettings, setScreen} from '../actions';

import Modal from "react-native-modal";
import IngridHelpModal from '../components/IngridHelpModal';

const styles = g.HEADER_STYLES;

class CategoryScreen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -g.HEADER_MAX_HEIGHT : 0,
            ),
            isModalVisible: false,
            refreshing: false,
            visible: true, delay: 50, animateIn: 0, animate: 0, isFavorite: false, animate2: 0, isTransitioning: 0

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {

        this.props.navigation.navigate('Home');


        return true;
    }

    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    render() {
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
            outputRange: [0, 300],
            extrapolate: 'clamp',
        });
        const titleTranslateY = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -92],
            extrapolate: 'clamp',
        });
        const heartTranslateY = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -100],
            extrapolate: 'clamp',
        });


        const heartOpacity = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE / 3],
            outputRange: [1, 0],
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
                    style={styles.fill}
                    scrollEventThrottle={1}
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                        {useNativeDriver: true},
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

                <View style={[styles.bar]}><TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>
                <Animated.View
                    style={[
                        s.paddingSmall, styles.switchbar,
                        {
                            transform: [
                                {scale: titleScale},
                                {translateX: barTranslate},
                            ],
                        },
                    ]}
                >
                    <Text style={[s.h2, styles.switchbarText, styles.switchbarActive]}>{t.categories}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Ingredients')}>
                        <Text style={[s.h2, styles.switchbarText]}>{t.list}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 10}} onPress={this._toggleModal}>
                        <Image style={{width: 26, height: 26}} source={require('../assets/images/question.png')}/>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    style={[
                        s.paddingSmall, styles.titlebar,
                        {
                            marginTop: -20,
                            transform: [
                                {scale: titleScale},
                                {translateY: titleTranslateY},
                                {translateX: titleTranslate},
                            ],
                        },
                    ]}
                >
                    <Text style={[s.h1, {flex: 1}]} numberOfLines={1}>{t.nahrungsmittel}</Text>
                </Animated.View>

                <Animated.View style={[s.paddingSmall, {
                    position: 'absolute',
                    zIndex: 7,
                    left: 0,
                    right: 0,
                    top: g.HEADER_MAX_HEIGHT - 30
                }, {
                    transform: [

                        {translateY: heartTranslateY},


                    ],
                }, {opacity: heartOpacity}]}>
                    <Item rounded style={[s.searchInput, {position: 'relative', zIndex: 7}]}
                          onPress={() => this.props.navigation.navigate('Search')}>
                        <IngridIcon icon="Search" fontSize='20' padding="10"/>
                        <Input editable={false} pointerEvents={'none'} placeholderTextColor="#A4A4A4"
                               placeholder={t.suchbegriff} style={[s.normal, s.searchInputInner]}/>
                    </Item>

                </Animated.View>

                <Modal useNativeDriver={true} animationIn={'zoomIn'} animationOut={'zoomOut'}  isVisible={this.state.isModalVisible}  backdropColor={g.primary} backdropOpacity={1}>
                    <IngridHelpModal toggleModal={this._toggleModal} />
                </Modal>
            </View>


        );
    }



    _renderScrollViewContent() {
        return (
            <View style={[s.paddingSmall, {
                marginBottom: Platform.OS === 'ios' ? 50 : 0,
                marginTop: Platform.OS === 'ios' ? 50 : 220
            }]}>
                <CategoryList navigation={this.props.navigation}/>
            </View>
        );
    }

    componentWillMount() {
        this.props.setScreen('CategoryScreen');
        if (typeof t == 'function') {
            t = t();
        }

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
}

const mapStateToProps = state => {
    return {settings: state.tmp, adfree: state.adfree, strings: state.strings};
};

export default connect(mapStateToProps, {intolChanged, saveSettings, setScreen})(CategoryScreen);