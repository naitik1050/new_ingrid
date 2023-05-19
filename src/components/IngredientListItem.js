import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ListItem, Text, Toast} from 'native-base';
import {connect} from 'react-redux';
import {addFavorite, removeFavorite} from "../actions";
import IngridIcon from "./IngridIcon";
import Heart from "./Heart";
import Dot from "./Dot";

const s = require('../style');
const g = require('../vars');
let t = {};
const mapStateToProps = (state, ownProps) => {

    const active = state.selectedCat === ownProps.data.id;
    return {active, favorites: state.favorites, ownRating: state.ownRating, settings: state.tmp, strings: state.strings};
};
import Swipeable from 'react-native-swipeable/src';



export default connect(mapStateToProps, {addFavorite, removeFavorite})(class IngredientListItem extends Component {
    state = {visible: true, delay:50, animateIn:0, animate: 0, isFavorite: false, animate2:0, isTransitioning:0};

    timer = false;
    timer2 = false;
    color = 1;
    animate = 0;
     async toggleExpand (delay)  {
        if(this.props.favorites[this.props.data.id]) {
           await  this.props.removeFavorite(this.props.data.id);
            Toast.show({
                text: '"' + this.props.data.title + '" ' + t.favRemove,
                buttonText: 'OK',
                duration: 3000,
                textStyle: [s.medium,{ color: 'white', fontSize:12 }, ]
            });
        }else{

            await this.props.addFavorite(this.props.data);
            Toast.show({
                text: '"' + this.props.data.title + '" ' + t.favAdd,
                buttonText: 'OK',
                duration: 3000,
                textStyle: [s.medium,{ color: 'white', fontSize:12 }, ]
            });

        }

        this.setState(prev => {
            prev.delay= !this.state.visible ? 100 : 50;

            return {isFavorite: (prev.animateIn == 1) ? false : true, visible: !this.state.visible, delay: prev.delay, animateIn: prev.animateIn == 2 ? 1 : (prev.animateIn == 0 ? 1 : 2), animate:1, isTransitioning: 1}
        }, () => {

            this.timer = setTimeout(()=>{this.swipeable.recenter(); this.setState({animate:0, animate2:1, isTransitioning: 0})}, delay == false ? 0 : 900);
            this.timer2 = setTimeout(()=>{this.setState({animate2:0})}, 1800);
        });



    };

    async removeFavorite ()  {
        if(this.props.favorites[this.props.data.id]) {
            await  this.props.removeFavorite(this.props.data.id);

        }

        this.setState(prev => {
            prev.delay= !this.state.visible ? 100 : 50;

            return {isFavorite: (prev.animateIn == 1) ? false : true, visible: !this.state.visible, delay: prev.delay, animateIn: prev.animateIn == 2 ? 1 : (prev.animateIn == 0 ? 1 : 2), animate:1, isTransitioning: 1}
        }, () => {

            this.timer = setTimeout(()=>{this.swipeable.recenter(); this.setState({animate:0, animate2:1, isTransitioning: 0})}, 800);
            this.timer2 = setTimeout(()=>{this.setState({animate2:0})}, 1800);
        });



    };


    componentWillUnmount () {
        if(this.timer){
            clearInterval(this.timer);
        }

        if(this.timer2){
            clearInterval(this.timer2);
        }

    }

    componentWillMount () {
        if(this.props.favorites[this.props.data.id]) {
            this.setState({isFavorite: true, animateIn: 1});
        }
    }



    render() {
        t = this.props.strings;

        const isFavorite = this.props.favorites[this.props.data.id];
        if(this.props.ownRating[this.props.data.id]) {
            this.color = this.props.ownRating[this.props.data.id];
        }else {
            this.color = 0;
            if ((this.props.settings.lactose && this.props.data.lactose === 1) || (this.props.settings.histaminKP && this.props.data.histamin.period_of_rest === 1) || (this.props.settings.histaminDE && this.props.data.histamin.duration === 1) || (this.props.settings.fructoseKP && this.props.data.fructose.period_of_rest === 1) || (this.props.settings.fructoseDE && this.props.data.fructose.duration === 1) || (this.props.settings.gluten && this.props.data.gluten === 1) || (this.props.settings.sorbit && this.props.data.sorbit === 1) || (this.props.settings.fodmap && this.props.data.fodmap === 1)) {
                this.color = 1;
            }

            if ((this.props.settings.lactose && this.props.data.lactose === 2) || (this.props.settings.histaminKP && this.props.data.histamin.period_of_rest === 2) || (this.props.settings.histaminDE && this.props.data.histamin.duration === 2) || (this.props.settings.fructoseKP && this.props.data.fructose.period_of_rest === 2) || (this.props.settings.fructoseDE && this.props.data.fructose.duration === 2) || (this.props.settings.gluten && this.props.data.gluten === 2) || (this.props.settings.sorbit && this.props.data.sorbit === 2) || (this.props.settings.fodmap && this.props.data.fodmap === 2)) {
                this.color = 2;
            }

            if ((this.props.settings.lactose && this.props.data.lactose === 0) || (this.props.settings.histaminKP && this.props.data.histamin.period_of_rest === 0) || (this.props.settings.histaminDE && this.props.data.histamin.duration === 0) || (this.props.settings.fructoseKP && this.props.data.fructose.period_of_rest === 0) || (this.props.settings.fructoseDE && this.props.data.fructose.duration === 0) || (this.props.settings.gluten && this.props.data.gluten === 0) || (this.props.settings.sorbit && this.props.data.sorbit === 0) || (this.props.settings.fodmap && this.props.data.fodmap === 0)) {
                this.color = 0;
            }

            if ((this.props.settings.lactose && this.props.data.lactose === 3) || (this.props.settings.histaminKP && this.props.data.histamin.period_of_rest === 3) || (this.props.settings.histaminDE && this.props.data.histamin.duration === 3) || (this.props.settings.fructoseKP && this.props.data.fructose.period_of_rest === 3) || (this.props.settings.fructoseDE && this.props.data.fructose.duration === 3) || (this.props.settings.gluten && this.props.data.gluten === 3) || (this.props.settings.sorbit && this.props.data.sorbit === 3) || (this.props.settings.fodmap && this.props.data.fodmap === 3)) {
                this.color = 3;
            }
        }


        const {id, title} = this.props.data;
        const leftContent = [<TouchableOpacity onPress={() => this.toggleExpand()} style={{
            alignSelf: 'flex-end',
            height: 46,
            backgroundColor: g.primary,
            width: 600,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        }}><View pointerEvents={'none'}
            style={{position: 'relative', alignSelf: 'flex-end', height: 46, width: 46, alignItems: 'center', justifyContent: 'center'}}>
            <Heart isActive={isFavorite} animate={this.state.animate} navigateIn={this.state.animateIn == 2 ? 1 : (this.state.animateIn == 1 ? 0.35 : 0.7)} />
        </View></TouchableOpacity>];
        const rightButtons = isFavorite ? [<TouchableOpacity onPress={() => this.toggleExpand(false)} style={{
            alignSelf: 'flex-start',
            height: 46,
            backgroundColor: g.primary,
            width: 600,
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative'
        }}><View
            style={{alignSelf: 'flex-start', height: 46, width: 68, alignItems: 'center', justifyContent: 'center'}}><IngridIcon
            icon="Delete"
            fontSize={24}/></View></TouchableOpacity>] : [<Text/>];

        return (
            <Swipeable onRef={ref => this.swipeable = ref} leftActionActivationDistance={68} rightActionActivationDistance={!isFavorite ? 0 : 68} leftButtonWidth={68}
                       rightButtonWidth={!isFavorite ? 0 : 68} leftButtons={leftContent} rightButtons={rightButtons} style={{height: 46}}><TouchableOpacity onPress={()=> this.props.navigation.navigate('Detail', {data: this.props.data})} style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    height: 46,
                }, s.paddingSmall, {paddingLeft: 0}]}>
                <View style={[{flex: 0.9, height: 46,     flexDirection: 'row', alignItems: 'center'}]} >
                    <View style={{marginLeft: 10, marginRight: 10, position: 'relative'}}>
                    <Dot value={this.color} isTransitioning={this.state.isTransitioning} isActive={isFavorite} ownRating={this.props.ownRating[this.props.data.id]} animate={this.state.animate2} navigateIn={this.state.animateIn == 2 ? 0 : (this.state.animateIn == 1 ? 0 : 1)} />
                        {this.props.ownRating[this.props.data.id] && <View style={{position: 'absolute',top:8, left:8,height: 8, width: 8, borderRadius: 8, backgroundColor: g['color'+this.color]}} ></View> }
                    </View>



                    <Text style={s.h2} numberOfLines={1}>{title}</Text></View><Text><IngridIcon
                    icon="ArrowSmallRight"
                    fontSize={14}/></Text>
            </TouchableOpacity></Swipeable>
        )
    }


});