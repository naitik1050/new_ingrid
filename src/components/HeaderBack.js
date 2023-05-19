import React, { Component } from 'react';
import { View,   StatusBar,
    Platform, TouchableOpacity, Text} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item , Input, Content} from 'native-base';
import IngridIcon from './IngridIcon';
import IngridButton from './IngridButton';
const s = require('../style');

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[s.statusBar, { backgroundColor }]}>
        <StatusBar  backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class HeaderBack extends Component {
    render() {
        return (
            <Container style={[s.headerBack]}>
                <MyStatusBar barStyle="default" hidden />
                <View style={[ s.headerBackInner]}>
                    <Left >
                        <TouchableOpacity onPress={this.props.navigation}>
                        <IngridIcon icon="ArrowBack" fontSize='20' padding="15"/>
                        </TouchableOpacity>
                    </Left>
                </View>
            </Container>
        );
    }
}