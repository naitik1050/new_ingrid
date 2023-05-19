import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import IngridIcon from './IngridIcon';

const s = require('../style');
const g = require('../vars');


export default class IngridButton extends Component {


    constructor(props){
        super(props);
        this.styles = {
            btnSmall: {
                borderWidth: 1.5,
                height: 35,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 35,
                borderColor: g.textColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            },

            btnExtraSmall: {
                borderWidth: 1.5,
                height: 30,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 30,
                borderColor: g.textColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            btnSmallText: {
                lineHeight: 35,
                fontSize: 16,
                color: g.textColor
            },

            btnExtraSmallText: {
                lineHeight: 28,
                fontSize: 14,
                color: g.textColor
            },
            textright: {
                lineHeight: 35,
                paddingLeft: 10,
            },
            textrightSmall: {
                lineHeight: 28,
                paddingLeft: 10,
            },
        };
    }


    render() {

        const style = typeof this.props.style !== 'undefined' ? this.props.style : {};
        const disabled = typeof this.props.disabled !== 'undefined' ? this.props.disabled : false;

        if (this.props.type == 'small') {

            if (typeof this.props.icon !== 'undefined' && this.props.icon !== '') {

                return (
                    <TouchableOpacity style={[this.styles.btnSmall, style]} onPress={this.props.onPress} disabled={disabled}>
                        <Text style={[s.medium, this.styles.btnSmallText]}>{this.props.text}</Text>
                        <IngridIcon style={this.styles.textright} icon={this.props.icon} fontSize="14"/>
                    </TouchableOpacity>);
            } else {
                return (<TouchableOpacity
                    style={[this.styles.btnSmall, style]} onPress={this.props.onPress}><Text style={[s.medium, this.styles.btnSmallText]} disabled={disabled}>{this.props.text}</Text></TouchableOpacity>);
            }

        }else if(this.props.type == 'extra-small'){
            if (typeof this.props.icon !== 'undefined' && this.props.icon !== '') {

                return (
                    <TouchableOpacity style={[this.styles.btnExtraSmall, style]} onPress={this.props.onPress} disabled={disabled}>
                        <Text style={[s.medium, this.styles.btnExtraSmallText]}>{this.props.text}</Text>
                        <IngridIcon style={this.styles.textrightSmall} icon={this.props.icon} fontSize="12"/>
                    </TouchableOpacity>);
            } else {
                return (<TouchableOpacity
                    style={[this.styles.btnExtraSmall, style]} onPress={this.props.onPress}><Text style={[s.medium, this.styles.btnExtraSmallText]} disabled={disabled}>{this.props.text}</Text></TouchableOpacity>);
            }
        }
    }
}

