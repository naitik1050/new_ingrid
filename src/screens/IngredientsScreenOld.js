import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import HeaderDetail from '../components/HeaderDetail';
import IngridButton from '../components/IngridButton';
import IngredientsList from '../components/IngredientsList';

import {Container, Content, Text} from 'native-base';
import HeaderNormal from "../components/HeaderNormal";
import { AdMobBanner } from 'expo-ads-admob';

const s = require('../style');
const g = require('../vars');
let t = {};

import {connect} from 'react-redux';
import {intolChanged, saveSettings, setScreen} from '../actions';

class IngredientsScreen extends Component {



    constructor(props) {
        super(props);

    }



    render() {
        t = this.props.strings;
        let title = 'Kategorien';

        if (this.props.navigation.state.params.favorites) {
            title = 'Favoriten';
        }

        if (this.props.navigation.state.params.cat) {
            title = this.props.navigation.state.params.catName;
        }

        return (
            <View style={{backgroundColor: '#ffff', flex:1}}>
                <HeaderDetail triggerOnPress={() => this.props.navigation.goBack()} navigate="Intro"
                              name={typeof this.props.settings !== 'undefined' && this.props.settings.userName}
                              title={title} noSearch={this.props.navigation.state.params.favorites ? true : false}>

                </HeaderDetail>

                    <IngredientsList favorites={this.props.navigation.state.params.favorites}
                                     cat={this.props.navigation.state.params.cat} navigation={this.props.navigation}/>


                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID={g.admob}// Test ID, Replace with your-admob-unit-id
                        testDeviceID="EMULATOR"
                        onDidFailToReceiveAdWithError={this.bannerError}/>
                </View>


            </View>


        );
    }

    componentWillMount() {
        this.props.setScreen('CategoryScreen');


        if (typeof t == 'function') {
            t = t();
        }

    }

}

const mapStateToProps = state => {
    return {settings: state.tmp, strings: state.strings};
};

export default connect(mapStateToProps, {intolChanged, saveSettings, setScreen})(IngredientsScreen);