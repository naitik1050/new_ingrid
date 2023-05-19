import React, {Component} from 'react';
import {
    View, StatusBar,
    Platform, TouchableOpacity, Text, Dimensions
} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content} from 'native-base';
import IngridIcon from './IngridIcon';

const s = require('../style');

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[s.statusBar, {backgroundColor}]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class HeaderNormal extends Component {


    triggerOnPress() {
        this.props.navigation();
    }

    topBar = () => {


        return (<View style={[s.headerNormalInner, s.bgprimary]}><TouchableOpacity onPress={() => this.triggerOnPress()}><IngridIcon icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>)
    };

    render() {
        const statusBar = Platform.OS == 'ios' ? <MyStatusBar backgroundColor="#FFF9AD" barStyle="default" hidden /> : false;

        const topBar = this.state.topBar === true ? this.topBar() : false;

        return (
            <View style={[s.headerNormal, s.bgprimary]}>
                {statusBar}
                {topBar}
                <View style={[s.padding, s.bgprimary, (this.state.topBar !== true && s.noTopBar)]}>
                    <Text style={[s.h1, s.m20]}>Intoleranzen</Text>
                </View>
            </View>
        );
    }

    componentWillMount() {
        this.setState({
            topBar: !(typeof this.props.topBar !== 'undefined' && this.props.topBar === false)
        });

    }
}