import React, {Component} from 'react';
import {View} from 'react-native';
import {ListItem, Text} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../actions';
import IngridIcon from "./IngridIcon";
const s = require('../style');
const mapStateToProps = (state, ownProps) => {

    const active = state.selectedCat === ownProps.data.id;
    return {active};
};

 export default connect(mapStateToProps, actions)(class IngridListItem extends Component {
    render() {

        const {id, title} = this.props.data;

        return(<ListItem noIndent={true} onPress={() => {this.props.onPress()}} style={[{borderBottomWidth: 0, borderTopWidth: 0}]}>
            <View style={[{flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex: 1}]}>
            <Text style={[s.h2, {flex: 0.9}]} numberOfLines={1}>{title}</Text><IngridIcon icon="ArrowSmallRight" fontSize={14}/>
            </View>
        </ListItem>)
    }


});