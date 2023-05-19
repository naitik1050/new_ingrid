import React, { Component } from 'react';
import {  Text, View, StyleSheet, Image} from 'react-native';
import IngridIcon from "./IngridIcon";
const g = require('../vars');
import SvgUri from 'react-native-svg-uri';

export default class Infobox extends Component {

    constructor(props) {
        super(props);


    }
    render() {
        if(this.props.type){
            let svg = false;
            if(this.props.type == 'not-found'){
                svg = <Image style={{width: 164, height:276, marginTop: 40, marginBottom:20}} source={require('../assets/images/not-found.png')} />;
            }else if(this.props.type == 'no-connection'){
                svg = <Image style={{width: 267, height:276, marginTop: 40, marginBottom:20}} source={require('../assets/images/no-connection.png')} />;
            }

            return (<View style={[styles.box,this.props.style, {backgroundColor: g.primary, flexDirection: 'column', alignItems: 'center'}]} >
                {svg}
                {this.props.children}
            </View>);
        }else{
            return (<View style={[styles.box,this.props.style]} >
                <IngridIcon fontSize={30} icon='Info' style={{marginRight: 20}}/>
                {this.props.children}
            </View>);
        }

    }
}
const styles = StyleSheet.create({
    box: {
        flex: 1,
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: 'rgba(216,216,216,0.3)',
        borderRadius: 2
    }
});