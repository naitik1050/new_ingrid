import React, { Component } from 'react';
import { View,   StatusBar,
    Platform, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item , Input, Content} from 'native-base';
import IngridIcon from './IngridIcon';
import Fade from './Fade';
import MenuButton from '../components/MenuButton';
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

export default connect(mapStateToProps,null,null,  {forwardRef: true})( class HeaderHome extends Component {

    constructor(props){
        super(props);

    }
    state = {visible: true, delay:50, animateIn:0, animate: 0};

    toggleExpand = () =>{
        this.setState(prev => {
            prev.delay= !this.state.visible ? 100 : 50;
            return {visible: !this.state.visible, delay: prev.delay, animateIn: prev.animateIn == 1 ? 0 : 1, animate: 1}
        });
        this.props.navigation()
    };

    greeting = () => {
        const hour = new Date().getHours();


        if(hour < 12 && hour > 3){
            return t.greetings_morning;
        }else if (hour < 13){
            return t.greetings_midday
        }else if(hour < 18){
            return t.greetings_afternoon
        }else{
            return t.greetings_evening
        }
    };
    render() {
        t = this.props.strings;
        const greeting = this.greeting();
        const statusBar = Platform.OS == 'ios' ? <MyStatusBar backgroundColor="#FFF9AD" barStyle="default" hidden /> : false;
        return (

            <View style={{overflow: 'visible', zIndex: 6, position: 'relative', top:0 , left:0, right:0}}>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <View>
                    <View style={[s.headerHome]}>

                    <View style={[ s.headerWithSearch,s.bgprimary, s.padding]}>

                            <Left style={s.headerTextWrap}>
                                <Fade visible={this.state.visible} delay={this.state.visible ? 300 : 0}>
                                <Title style={[s.bold, s.headerTitle]}>{greeting}{(typeof this.props.name !== 'undefined' ? ' ' + this.props.name : '')}!</Title>
                                </Fade>
                                <Fade visible={!this.state.visible} delay={this.state.visible ? 300 : 0}>
                                    <Title style={[s.bold, s.headerTitle, {position:'absolute', top: -25}]}>{t.settings}</Title>
                                </Fade>
                            </Left>


                        <Right style={s.headerIconWrap}>
                            <TouchableOpacity onPress={() => this.toggleExpand()}>
                                <MenuButton animate={this.state.animate} navigateIn={this.state.animateIn} />
                            </TouchableOpacity>
                        </Right>
                    </View>
                    <View>
                        <View style={[s.bgprimary, s.paddingSmall, s.searchWrap]}></View>
                        <View style={[s.paddingSmall, {position: 'absolute', zIndex: 7, left:0, right:0, top:30}]}>

                            <Fade visible={this.state.visible} delay={this.state.visible ? this.state.delay * 3 : this.state.delay * 1}>


                                <Item rounded style={[s.searchInput, {position: 'relative', zIndex: 7}]} onPress={this.props.inputOnPress}>
                                    <IngridIcon icon="Search" fontSize='20' padding="10" />
                                    <Input editable={false} pointerEvents={'none'}  placeholderTextColor="#A4A4A4" placeholder={t.suchbegriff}  style={[s.normal, s.searchInputInner]} />
                                </Item>

                            </Fade>
                        </View>
                    </View>
                    </View>


                </View>

            </View>

        );
    }
    componentWillMount(){

        if(typeof t == 'function') {
            t = t();
        }

    }

})