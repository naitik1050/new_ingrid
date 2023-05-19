import React, {Component} from 'react';
import {Text} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content} from 'native-base';

const icons = {
    Smiley3: {
        content: 1,
        color: "#ff5664"
    },
    Smiley2: {
        content: 2,
        color: "#dea03b"
    },
    Smiley1: {
        content: 3,
        color: "#90c666"
    },
    Smiley0: {
        content: 4,
        color: "#4a4a4a"
    },
    Info: {
        content: 4,
        color: "#4a4a4a"
    },
    Search: {
        content: 5,
        color: "#4a4a4a"
    },
    List: {
        content: 6,
        color: '#4a4a4a'
    },
    Delete: {
        content: 7,
        color: '#4a4a4a'
    },
    Help: {
        content: 8,
        color: '#4a4a4a'
    },
    Close: {
        content: 'a',
        color: '#4a4a4a'
    },
    ArrowSmallRight: {
        content: 9,
        color: '#4a4a4a'
    },
    ArrowBack: {
        content: 0,
        color: "#4a4a4a"
    },

};

export default class IngridIcon extends Component {

    constructor(props) {
        super(props);
        this.icon = icons[this.props.icon];
        this.content = this.icon.content;
        this.iconStyle = {
            fontFamily: 'icomoon',
            fontSize: this.props.fontSize ? parseInt(this.props.fontSize) : 20,
            paddingLeft: this.props.padding ? parseInt(this.props.padding) : 0,
            paddingRight: this.props.padding ? parseInt(this.props.padding) : 0,
            color: this.props.color ? parseInt(this.props.color) : (this.icon.color ? this.icon.color : s.text.color),

        };
    }
    render() {
        return (<Text style={[this.iconStyle, this.props.style]} >{this.content}</Text>);
    }
}

