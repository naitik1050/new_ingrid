import React, { Component } from 'react';
import {  Text} from 'native-base';
const s = require('../style');
export default class Label extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (<Text style={[s.bold, s.label, this.props.style]} >{this.props.children}</Text>);
    }
}
