import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import IngridButton from './IngridButton';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import IngridIcon from "./IngridIcon";
import {connect} from "react-redux";
import {decode} from 'html-entities';


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const s = require('../style');
let t = {};

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const AppWidth = Platform.OS == 'ios' ? 375 : 400;
const AppHeight = Platform.OS == 'ios' ? 667 : 767;
const normalize = (value) => value/AppWidth * width;

const slideHeight = Math.round(slideWidth * 0.67);

const itemHorizontalMargin = 66;

const entryBorderRadius = 6;

const horizontalMargin = normalize(60);
const slideWidth = viewportWidth - normalize(60);

const sliderWidth = viewportWidth;
const itemWidth = viewportWidth - normalize(60);
const itemHeight = itemWidth*1.5;

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};
const styles = StyleSheet.create({
    slide: {
        width: itemWidth,
        height: itemHeight,
        // other styles for the item container

        marginLeft:0
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1,
        paddingHorizontal: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderTopLeftRadius: entryBorderRadius,
        borderColor: '#f2f2f2',
        borderWidth: 1,
            // other styles for the inner container
    },

    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: normalize(25),
        paddingBottom: normalize(10),
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },


    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        lineHeight: normalize(22)
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        fontSize: normalize(16),
        lineHeight: normalize(23),

    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});


const mapStateToProps = (state, ownProps) => {


    return {imprint: state.imprint, strings: state.strings};
};

export default connect(mapStateToProps)( class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    image (image) {
        const { data: { enclosures }, parallax, parallaxProps, even } = this.props;

        return parallax && image ? (
            <ParallaxImage
                source={{ uri: image }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (image ? (
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
        ) : false);
    }

    render () {
        t = this.props.strings;
        let { data: { illustration, title, description, links }, even } = this.props;

        description = description.replace(/(<([^>]+)>)/ig,"");
        var image = description.split('||')[0];



        description = description.split('||')[1];
        const viewStyle = {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 0,
            height: 50,
            maxHeight: 50,
            marginTop: normalize(30)
        };

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, s.h2]}
                numberOfLines={2}
            >
                { decode(title,  {level: 'xml'}) }
            </Text>
        ) : false;

        return (
            <View style={styles.slide}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => { this._handlePressButtonAsync(links[0].url) }}
            >
                <View style={[styles.imageContainer]}>
                    {this.image(image)}
                    <View style={[styles.radiusMask]} />
                </View>
                <View style={[styles.textContainer]}>
                    { uppercaseTitle }
                    <Text
                        style={[styles.subtitle, s.normal]}
                        numberOfLines={4}
                    >
                        { this.strip(decode(description,{level: 'xml'})) }
                    </Text>
                    <View style={viewStyle}>
                    <IngridButton text={t.more} onPress={() => { this._handlePressButtonAsync(links[0].url) }} type="small" icon="ArrowSmallRight" />
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        );


    }


    _handlePressButtonAsync = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        this.setState({ result });
    };

    strip(input)
    {
        return input.replace(/<.+?>/g, '');
    }

    componentWillMount(){

        if(typeof t == 'function') {
            t = t();
        }

    }
})