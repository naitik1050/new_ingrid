'use strict';
import {isIphoneX} from 'react-native-iphone-x-helper';

var React = require('react-native');

var {
    StyleSheet,
    Platform,
    StatusBar,
    Dimensions
} = React;
/**
 * GLOBAL Variables
 */
const g = require('./vars');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const AppWidth = Platform.OS == 'ios' ? 400 : 500;
const AppHeight = Platform.OS == 'ios' ? 667 : 767;
const normalize = (value) => value / AppWidth * width;
const normalizeH = (value) => value / AppHeight * height;
module.exports = {

    statusBar: {
        height: g.STATUSBAR_HEIGHT,
    },

    text: {
        color: g.textColor
    },

    bold: {
        fontFamily: 'Poppins_semibold',
        color: g.textColor
    },
    medium: {
        fontFamily: 'Poppins_medium',
        color: g.textColor
    },
    normal: {
        fontFamily: 'Poppins',
        color: g.textColor
    },
    f16: {
        fontSize: normalize(16),
    },

    h1: {
        fontSize: normalize(28),
        fontFamily: 'Poppins_semibold',
        color: g.textColor
    },
    h2_5: {
        fontSize: normalize(24),
        fontFamily: 'Poppins_semibold',
        color: g.textColor
    },

    h2: {
        fontSize: normalize(20),
        fontFamily: 'Poppins_semibold',
        color: g.textColor
    },

    h3: {
        fontSize: normalize(16),
        fontFamily: 'Poppins_semibold',
        color: g.textColor
    },

    h4: {
        fontSize: normalize(14),
        fontFamily: 'Poppins_semibold',
        color: g.textColor
    },
    label: {
        fontSize: normalize(16),
        lineHeight: normalize(18),
        opacity: 0.5
    },

    ingridLoves: {
        color: '#FFB2BB',
        fontSize: normalize(14),
        lineHeight: normalize(27),
        fontFamily: 'Poppins_semibold',
    },

    homeFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    homeFooterText: {
        color: g.textColor,
        fontSize: normalize(14),
        fontFamily: 'Poppins',
        opacity: 0.6,
        marginRight: normalize(10),
    },
    settingsViewTop: {
        marginTop: 185,
        position: 'relative',
        zIndex: 10
    },

    settingsViewBottom: {
        bottom: 0,
        position: 'absolute',
        zIndex: 10,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    settingsViewLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    m10: {
        marginBottom: (10)
    },
    m15: {
        marginBottom: (15)
    },
    m20: {
        marginBottom: (20)
    },
    m30: {
        marginBottom: (30)
    },
    m40: {
        marginBottom: (40)
    },
    m60: {
        marginBottom: (60)
    },
    mt10: {
        marginTop: (10)
    },
    mt20: {
        marginTop: (20)
    },
    mt30: {
        marginTop: (30)
    },
    mt40: {
        marginTop: (40)
    },

    mt60: {
        marginTop: (60)
    },

    ml10: {
        marginLeft: (10)
    },
    ml20: {
        marginLeft: (20)
    },
    ml30: {
        marginLeft: (30)
    },
    ml40: {
        marginLeft: (40)
    },


    bgprimary: {
        backgroundColor: g.primary
    },

    textCenter: {
        textAlign: 'center'
    },
    textContent: {
        fontFamily: 'Poppins',
        fontSize: normalize(16),
        color: g.textColor,

    },

    textContentBig: {
        fontFamily: 'Poppins',
        fontSize: normalize(20),
        color: g.textColor,
    },
    paddingBig: {
        paddingLeft: normalize(40),
        paddingRight: normalize(40),
    },
    padding: {
        paddingLeft: normalize(30),
        paddingRight: normalize(30),
    },

    paddingSmall: {
        paddingLeft: normalize(20),
        paddingRight: normalize(20),
    },

    paddingExtraSmall: {
        paddingLeft: normalize(5),
        paddingRight: normalize(5),
    },

    headerHome: {
        height: Platform.OS === 'ios' ? (isIphoneX() ? 190 : 160) : 185,
        maxHeight: Platform.OS === 'ios' ? (isIphoneX() ? 190 : 160) : 185
    },

    headerNormal: {
        height: 184,
        maxHeight: 184,
        position: 'relative'
    },

    headerDetail: {
        height: 200,
        maxHeight: 200,
        position: 'relative'
    },
    headerSkip: {
        position: 'absolute',
        top: 0,
        height: normalizeH(140),
        maxHeight: normalizeH(140),
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'transparent'
    },

    adStyle: {
        position: 'absolute', bottom: isIphoneX() ? 44 : 0, left: 0, right: 0, backgroundColor: '#F0F0F0'
    },

    adImage:{
        width: width - (normalize(5) * 2),
        height: (width - (normalize(5) * 2))*1.1946666667
    },



    headerBack: {
        position: 'absolute',
        top: 0,
        height: normalizeH(140),
        maxHeight: normalizeH(140),
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'transparent',
    },

    headerSkipInner: {
        borderColor: g.primary,
        height: normalizeH(10),
        maxHeight: normalizeH(45),
        borderBottomWidth: 0,
        shadowOpacity: 0,
        shadowRadius: 3,
        shadowColor: g.primary,
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        backgroundColor: 'transparent'
    },

    headerBackInner: {
        borderColor: g.primary,
        height: normalizeH(10),
        maxHeight: normalizeH(45),
        borderBottomWidth: 0,
        shadowOpacity: 0,
        shadowRadius: 3,
        shadowColor: g.primary,
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
    },

    headerWithSearch: {
        borderColor: g.primary,
        height: 85,
        maxHeight: 85,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        shadowRadius: 3,
        shadowColor: g.primary,
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        paddingTop: Platform.OS === 'ios' ? (isIphoneX() ? 60 : 30) : 43
    },

    headerNormalInner: {
        borderColor: g.primary,
        height: 10,
        maxHeight: 85,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        shadowRadius: 3,
        shadowColor: g.primary,
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        right: 0,
        elevation: 0
    },

    searchWrap: {
        height: 60,
        overflow: 'visible',
    },

    searchInput: {
        backgroundColor: '#FFF',
        paddingLeft: 8,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#F2f2f2',
        marginTop: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },

    nameInputIntro: {
        backgroundColor: '#FFF',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#F2f2f2',
        marginTop: normalizeH(10),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },

    searchInputInner: {
        fontSize: 20,
    },

    headerTitle: {
        fontSize: normalize(18),
        paddingRight: 10,
        paddingLeft: Platform.OS === 'ios' ? 0 : 10,
        color: g.textColor
    },

    headerTextWrap: {
        flex: 0.8
    },
    headerIconWrap: {
        width: 36,
        height: 40,
        flex: 0.2,

    },

    headerDetailIconWrap: {
        width: 36,
        height: 50,
        flex: 0.2,
        top: 0,
        bottom: 'auto'

    },
    noTopBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },

    dotInactive: {
        backgroundColor: g.textColor,
        width: 7,
        height: 7,
        borderRadius: 7,
        marginLeft: 3,
        marginRight: 3
    },

    dotActive: {
        borderWidth: 1,
        borderColor: g.textColor,
        backgroundColor: 'transparent',
        width: 8,
        height: 8,
        borderRadius: 7,
        marginLeft: 2,
        marginRight: 2
    }

};
