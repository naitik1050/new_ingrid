'use strict';
import {isIphoneX} from 'react-native-iphone-x-helper';


var React = require('react-native');

var {

    Platform,

} = React;
/**
 * GLOBAL Variables
 */
const HEADER_MAX_HEIGHT = (isIphoneX() ? 210 : 180);
const  HEADER_MIN_HEIGHT= Platform.OS === 'ios' ? (isIphoneX() ? 100 : 70) : 83;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

module.exports = {
    primary: '#FFF9AD',
    textColor: '#4A4A4A',
    color1: 'rgb(191, 244, 148)',
    colorStrong1: '#90C666',
    color2: 'rgb(244, 204, 139)',
    colorStrong2: '#DEA03B',
    color3: 'rgb(255, 173, 183)',
    colorStrong3: '#FF5664',
    color0: '#F2F2F2',
    colorStrong0: '#4A4A4A',
    itemSkus: Platform.select({
        ios: [
            'com.panthera.fragingrid.adfreeauto'
        ],
        android: [
            'adfree_ingrid'
        ]
    }),
    STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 45 : 45,
    APPBAR_HEIGHT: Platform.OS === 'ios' ? 44 : 56,
    apiUrl: 'http://www.nmidb.de/api/',
    token: '670ff19e722e63a6ab3705433849ae52',
    admob: Platform.OS === 'ios' ? '175552379911069_175553576577616' : '175552379911069_175555959910711',
    admobHome: Platform.OS === 'ios' ? '175552379911069_231459340987039' : '175552379911069_231459820986991',
    HEADER_MAX_HEIGHT:HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT: HEADER_MIN_HEIGHT,
    HEADER_SCROLL_DISTANCE: HEADER_SCROLL_DISTANCE,
    HEADER_STYLES: React.StyleSheet.create({
        fill: {
            flex: 1,
            backgroundColor: '#ffffff',
        },
        fill2: {
            flex: 1,
        },
        content: {
            flex: 1,
        },
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
            height:  HEADER_MAX_HEIGHT,
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: null,
            height:  HEADER_MAX_HEIGHT,
            resizeMode: 'cover',
        },
        bar: {
            backgroundColor: 'transparent',
            marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 58 : 28) : 38,
            height: 32,
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9

        },

        switchbar: {
            backgroundColor: 'transparent',
            marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 58 : 28) : 38,
            height: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            right: 0,
            flex: 0.8,
            zIndex: 9
        },

        switchbarText: {
            marginLeft: 10,
        },

        switchbarActive: {
            textDecorationLine: 'underline',
        },

        titlebar: {
            backgroundColor: 'transparent',
            marginTop: 0,
            height: 40,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'absolute',
            top: Platform.OS === 'ios' ? (isIphoneX() ? 90 + 58 : 90 + 28) : 90 + 38,
            left: 0,
            right: 0,
            flex: 1,
            flexDirection: 'row',
            zIndex: 5,
            overflow: 'visible'
        },
        title: {
            color: 'white',
            fontSize: 18,
        },
        scrollViewContent: {
            // iOS uses content inset, which acts like paddin
            paddingTop: Platform.OS !== 'ios' ?  HEADER_MAX_HEIGHT + 30 : 30,
            backgroundColor: '#ffffff'
        },
        row: {
            height: 40,
            margin: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
};