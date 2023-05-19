import React, {Component} from 'react';
import {
    View, StatusBar,
    Platform, TouchableOpacity
} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text} from 'native-base';
import IngridIcon from './IngridIcon';
import Fade from './Fade';
import MenuButton from '../components/MenuButton';
import {connect} from "react-redux";

const s = require('../style');
let t = {};

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[s.statusBar, {backgroundColor}]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
);

const mapStateToProps = (state, ownProps) => {


    return {imprint: state.imprint, strings: state.strings};
};

export default connect(mapStateToProps)( class HeaderNormal extends Component {
    state = {visible: true, delay: 50, animateIn: 0, animate: 0};

    toggleExpand = () => {
        this.setState(prev => {
            prev.delay = !this.state.visible ? 100 : 50;
            return {visible: !this.state.visible, delay: prev.delay, animateIn: prev.animateIn == 1 ? 0 : 1, animate: 1}
        });
        this.props.navigation()
    };
    topBar = () => {


        return (<View style={[s.headerNormalInner, s.bgprimary]}><TouchableOpacity onPress={() => this.props.triggerOnPress()}><IngridIcon icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>)
    };

    greeting = () => {
        const hour = new Date().getHours();


        if (hour < 12 && hour > 3) {
            return t.greetings.morning;
        } else if (hour < 13) {
            return t.greetings.midday
        } else if (hour < 18) {
            return t.greetings.afternoon
        } else {
            return t.greetings.evening
        }
    };

    render() {
        t = this.props.strings;
        const statusBar = Platform.OS == 'ios' ? <MyStatusBar backgroundColor="#FFF9AD" barStyle="default" hidden /> : false;

        const topBar = this.state.topBar === true ? this.topBar() : false;

        const search = this.props.noSearch === true ? false :        <View>
            <View style={[s.bgprimary, s.paddingSmall, s.searchWrap]}></View>
            <View style={[s.paddingSmall, {position: 'absolute', zIndex: 7, left:0, right:0}]}>

                <Item rounded style={[s.searchInput]}>
                    <IngridIcon icon="Search" fontSize='20' padding="10"/>
                    <Input pointerEvents={!this.state.visible ? 'none' : 'auto'}
                           onChangeText={this.props.onTextChange ? this.props.onTextChange : ()=>{}}
                           placeholderTextColor="#A4A4A4" placeholder={t.suchbegriff}
                           style={[s.normal, s.searchInputInner]}/>
                </Item>

            </View>
        </View>;
        return (


<View style={{overflow: 'visible', zIndex: 6, position: 'relative', top:0 , left:0, right:0}}>
            <View style={[s.headerDetail]}>
                {statusBar}
                {topBar}
                <View style={[s.padding, s.bgprimary, (this.state.topBar !== true && s.noTopBar)]}>
                    <Text style={[s.h1, s.m20]} numberOfLines={1}>{this.props.title}</Text>
                </View>
                {search}


            </View>
</View>


        );
    }

    componentWillMount() {
        this.setState({
            topBar: !(typeof this.props.topBar !== 'undefined' && this.props.topBar === false)
        });


        if(typeof t == 'function') {
            t = t();
        }

    }
})