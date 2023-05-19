import React, {Component} from 'react';

const g = require('../vars');

import Switch from 'react-native-switch-pro'

export default class IngridSwitch extends Component {
    render() {
        return (
            <Switch style={{borderWidth: 1, borderColor: g.textColor}} circleStyle={{
                borderWidth: 0.5, borderColor: '#E5E5E5', shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }} width={50} height={30} value={this.props.value} circleColorActive="#ffffff" backgroundActive={g.textColor}
                    backgroundInactive="#ffffff" onSyncPress={this.props.callback}/>
        );
    }
}