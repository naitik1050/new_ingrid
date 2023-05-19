import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Platform} from 'react-native';
import IngridIcon from "./IngridIcon";
import {isIphoneX} from 'react-native-iphone-x-helper'
const g = require('../vars');
const s = require('../style');
let t = {};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import SvgUri from 'react-native-svg-uri';
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {


    return {imprint: state.imprint, strings: state.strings};
};

export default connect(mapStateToProps)(class IngridHelpModal extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        t = this.props.strings;
        return <View style={styles.container}>
            <View style={{
                position: 'absolute',
                top: 20,
                right: 20,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexWrap: 'nowrap',
                flexDirection: 'row',
                zIndex: 3
            }}>
                <TouchableOpacity onPress={this.props.toggleModal} style={{marginRight: 8}}>
                    <Text style={s.h4}>{t.close}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.toggleModal}>
                    <Image style={{width: 26, height: 26}} source={require('../assets/images/close.png')}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
            <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', height: width * 0.51}}>
                <Image style={styles.infoImage} source={require('../assets/images/ingridInfo.png')}/>
            </View>



            <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Text style={[s.h3, {textAlign: 'center'}]}>{t.toplineHelp}</Text>
                <Text style={[s.h1, {textAlign: 'center'}]} >{t.titleHelp}</Text>
            </View>


            <View style={{marginTop: 25, alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <View style={{width: 22, height: 22, marginRight: 20, borderRadius: 22, borderWidth: 4, borderColor: '#979797'}}></View>
                <View style={{width: width-22-95, marginTop: -2}}>
                    <Text style={[s.h2]} numberOfLines={1}>{t.unfilledCircleTitle}</Text>
                    <Text style={[s.normal, s.f16]} numberOfLines={2}>{t.unfilledCircleText}</Text>
                </View>
            </View>

            <View style={{marginTop: 15, alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <View style={{width: 22, height: 22, borderRadius: 22, backgroundColor: '#979797', marginRight: 20}}></View>
                <View style={{width: width-22-95, marginTop: -2}}>
                    <Text style={s.h2} numberOfLines={1}>{t.filledCircleTitle}</Text>
                    <Text style={[s.normal, s.f16]} numberOfLines={2}>{t.filledCircleText}</Text>
                </View>
            </View>

            <View style={{marginTop: 15, alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <Image style={{width: 22, height: 22,  marginRight: 20}} source={require('../assets/images/heart-unfilled.png')}/>
                <View style={{width: width-22-95, marginTop: -2}}>
                    <Text style={s.h2} numberOfLines={1}>{t.unfilledHeartTitle}</Text>
                    <Text style={[s.normal, s.f16]} numberOfLines={2}>{t.unfilledHeartText}</Text>
                </View>
            </View>

                <View style={{marginTop: 15, alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                    <Image style={{width: 22, height: 22,  marginRight: 20}} source={require('../assets/images/heart.png')}/>
                    <View style={{width: width-22-95, marginTop: -2}}>
                        <Text style={s.h2} numberOfLines={1}>{t.heartTitle}</Text>
                        <Text style={[s.normal, s.f16]} numberOfLines={2}>{t.heartText}</Text>
                    </View>
                </View>

            <View style={{marginTop: 25, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <View style={{width: 15, height: 15, backgroundColor: g.color3, marginRight: 27, borderRadius: 15}}></View>
                <View style={{width: width-22-95}}>
                    <Text style={[s.normal, s.f16]} numberOfLines={1}>{t.redDot}</Text>
                </View>
            </View>

            <View style={{marginTop:7, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <View style={{width: 15, height: 15, backgroundColor: g.color1, marginRight: 27, borderRadius: 15}}></View>
                <View style={{width: width-22-95}}>
                    <Text style={[s.normal, s.f16]} numberOfLines={1}>{t.greenDot}</Text>
                </View>
            </View>

            <View style={{marginTop:7, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <View style={{width: 15, height: 15, backgroundColor: g.color2, marginRight: 27, borderRadius: 15}}></View>
                <View style={{width: width-22-95}}>
                    <Text style={[s.normal, s.f16]} numberOfLines={1}>{t.orangeDot}</Text>
                </View>
            </View>

            <View style={{marginTop:7, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row'}}>
                <View style={{width: 15, height: 15, backgroundColor: g.color0, marginRight: 27, borderRadius: 15}}></View>
                <View style={{width: width-22-95}}>
                    <Text style={[s.normal, s.f16]} numberOfLines={1}>{t.grayDot}</Text>
                </View>
            </View>
            </ScrollView>
        </View>

    }
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: isIphoneX() ? 40 : 0,
        bottom: isIphoneX() ? 40 : 0,
        left: 0,
        right: 0,
        borderRadius: 20,
        shadowColor: "#000",
        padding: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.05 : 0,
        shadowRadius: 3.84,

        elevation: Platform.OS === 'ios' ? 5 : 0,
    },
    infoImage: {
        width: width * 0.51,
        height: width * 0.51
    },
});