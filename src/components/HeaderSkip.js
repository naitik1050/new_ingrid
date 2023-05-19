import React, { Component } from 'react';
import { View,   StatusBar,
    Platform, TouchableOpacity, Text} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item , Input, Content} from 'native-base';
import IngridIcon from './IngridIcon';
import IngridButton from './IngridButton';
import {connect} from "react-redux";
const s = require('../style');
let t = {};

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[s.statusBar, { backgroundColor }]}>
        <StatusBar  backgroundColor={backgroundColor} {...props} />
    </View>
);

const mapStateToProps = (state, ownProps) => {


    return {imprint: state.imprint, strings: state.strings};
};

export default connect(mapStateToProps)( class HeaderSkip extends Component {
    render() {
        t = this.props.strings;
        return (
            <Container style={[s.headerSkip]}>
                <MyStatusBar barStyle="default" hidden />
                <View style={[ s.padding, s.headerSkipInner]}>
                    <Right >
                        <IngridButton onPress={this.props.navigation} text={t.skip} type="small" icon="ArrowSmallRight" />
                    </Right>
                </View>
            </Container>
        );
    }

    componentWillMount(){

        if(typeof t == 'function') {
            t = t();
        }

    }
})