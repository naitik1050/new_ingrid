import React from 'react';
import {View, Text} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {StyleSheet, Dimensions, Platform} from 'react-native';
import SliderEntry from './SliderEntry';

import * as rssParser from 'react-native-rss-parser';
const s = require('../style');
const g = require('../vars');
const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 0;

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const AppWidth = Platform.OS == 'ios' ? 375 : 400;
const AppHeight = Platform.OS == 'ios' ? 667 : 767;
const normalize = (value) => value/AppWidth * viewportWidth;


const slideWidth = viewportWidth - normalize(60);
const slideHeight = viewportHeight * 1.35;
const itemHorizontalMargin = 0;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

const   styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 2
    },
    exampleContainer: {

    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {

        marginTop: 0,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 0, // for custom animation
        paddingHorizontal: 0, // for custom animation
        marginLeft: 0,
        left:0,

    },
    paginationContainer: {
        paddingVertical: 20,
        justifyContent: 'flex-end'
    },
    paginationDot: {
        marginHorizontal: 0
    }
});




export default class NewsCarousel extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            ENTRIES1: false
        };
    }

    _renderItem({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }


    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    render() {
        const { slider1ActiveSlide } = this.state;

        if(this.state.ENTRIES1) {
            return (
                <View style={styles.exampleContainer}>
                    <Carousel
                        ref={c => this._slider1Ref = c}
                        data={this.state.ENTRIES1}
                        renderItem={this._renderItemWithParallax}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        hasParallaxImages={true}
                        firstItem={SLIDER_1_FIRST_ITEM}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        // inactiveSlideShift={20}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContentContainer}
                        loop={false}
                        loopClonesPerSide={3}
                        autoplay={false}
                        autoplayDelay={500}
                        autoplayInterval={3000}
                        onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                    />
                    <Pagination
                        dotsLength={this.state.ENTRIES1.length}
                        activeDotIndex={slider1ActiveSlide}
                        dotColor={'white'}
                        inactiveDotColor={g.textColor}
                        dotStyle={s.dotActive}
                        inactiveDotOpacity={1}
                        inactiveDotScale={0.9}
                        inactiveDotStyle={[s.dotInactive, styles.paginationDot]}
                        activeDotStyle={[s.dotActive, styles.paginationDot]}
                        carouselRef={this._slider1Ref}
                        tappableDots={!!this._slider1Ref}
                    />
                </View>
            );
        }else{
            return false;
        }
    }

    componentWillMount(){
        let items = [];
        fetch('https://www.nahrungsmittel-intoleranz.com/category/featured-stories/feed/')
            .then((response) => response.text())
            .then((responseData) => {
                responseData = responseData.replace('&nbsp;' ,'');
                return rssParser.parse(responseData)
            })
            .then((rss) => {


                items = [...rss.items, ...items];
                this.setState({ENTRIES1 : items});
            });

    }
}