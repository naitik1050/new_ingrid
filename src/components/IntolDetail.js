import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import IngridIcon from "./IngridIcon";
import IngridButton from "./IngridButton";

const s = require('../style');
const g = require('../vars');
let t = {};
import Collapsible from 'react-native-collapsible';
import Fade from "./Fade";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {


    return {imprint: state.imprint, strings: state.strings};
};

export default connect(mapStateToProps)( class IntolDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {isCollapsed: true};

    }

    render() {
        t = this.props.strings;
        let returnVal = [];
        let collapseVal = [];
        let description = [];
        let line = [];
        let allFalse = true;

        if(this.props.data.description && this.props.data.description.length){
            description = <View style={[styles.box, {height: 'auto', backgroundColor: 'transparent'}, s.m30]}>
                <Text style={[s.h3, s.normal]}>{this.props.data.description}</Text>
            </View>
            line =  <View style={[s.m30, {backgroundColor: '#D8D8D8', flex: 1, height: 2,}]}/>


        }



        Object.entries(this.props.settings).forEach(
            ([key, value]) => {
                let desc = false;
                let info = false;
                let data = false;
                if (typeof this.props.data[key] !== 'undefined' && typeof this.props.data[key] !== 'object') {
                    desc = false;
                    info = false;
                    data = false;
                    if (parseInt(this.props.data[key]) > 0) {


                        if (this.props.data[key + 'desc'] && this.props.data[key + 'desc'].length) {
                            desc = <View style={[styles.box, {height: 'auto', marginTop: 2}]}>
                                <Text style={[s.h3, s.normal]}>{this.props.data[key + 'desc']}</Text>
                            </View>
                        }
                        if (key == 'sorbit' && this.props.data['amountOfSorbit']) {

                            let num = Number(this.props.data['amountOfSorbit']); // The Number() only visualizes the type and is not needed
                            num = num.toFixed(2).replace('.', ',');
                            info = <View style={[styles.box, {
                                backgroundColor: 'transparent',
                                justifyContent: 'space-between',
                                height: 'auto',
                            }]}>
                                <Text style={[s.h3, s.normal]}>{t.amount_of_sorbit}</Text>
                                <Text style={[s.h3, s.normal]}>{num} g / 100g</Text>
                            </View>;
                        }

                        if (key == 'lactose' && this.props.data['amountOfLactose']) {

                            let num = Number(this.props.data['amountOfLactose']); // The Number() only visualizes the type and is not needed
                            num = num.toFixed(2).replace('.', ',');
                            info = <View style={[styles.box, {
                                backgroundColor: 'transparent',
                                justifyContent: 'space-between',
                                height: 'auto',
                            }]}>
                                <Text style={[s.h3, s.normal]}>{t.amount_of_lactose}</Text>
                                <Text style={[s.h3, s.normal]}>{num} g / 100g</Text>
                            </View>;
                        }


                        data = (
                            <View key={key} style={s.m30}>
                                <Text style={[s.h2, {
                                    color: g['colorStrong' + parseInt(this.props.data[key])],
                                    marginLeft: 10,
                                    marginBottom: 10
                                }]}>{t[key]}</Text>
                                <View
                                    style={[styles.box, {backgroundColor: g['color' + parseInt(this.props.data[key])]}]}>
                                    <IngridIcon icon={'Smiley' + parseInt(this.props.data[key])} fontSize={21}
                                                style={{paddingRight: 15}}/>
                                </View>
                                {desc}
                                {info}
                            </View>);
                    }else{

                        if(key != 'gluten') {

                            data = (
                                <View key={key} style={s.m30}>
                                    <Text style={[s.h2, {
                                        color: g.textColor,
                                        marginLeft: 10,
                                        marginBottom: 10
                                    }]}>{t[key]}</Text>
                                    <View
                                        style={[styles.box, {backgroundColor: '#F2F2F2'}]}>
                                        <IngridIcon icon='Info' fontSize={21}
                                                    style={{paddingRight: 15}}/><Text
                                        style={[s.h3, s.normal, {color: g.textColor}]}>{t.noIngRating}</Text>
                                    </View>
                                </View>);
                        }else{
                            data = (
                                <View key={key} style={s.m30}>
                                    <Text style={[s.h2, {
                                        color: g.textColor,
                                        marginLeft: 10,
                                        marginBottom: 10
                                    }]}>{t[key]}</Text>
                                    <View
                                        style={[styles.box, {backgroundColor: '#F2F2F2'}]}>
                                        <IngridIcon icon='List' fontSize={21}
                                                    style={{paddingRight: 15}}/><Text
                                        style={[s.h3, s.normal, {color: g.textColor}]}>{t.ingList}</Text>
                                    </View>
                                </View>);
                        }
                    }


                } else if (typeof this.props.data[key] !== 'undefined'  && typeof this.props.data[key] === 'object') {
                    desc = false;
                    info = [];
                    data = false;
                    if(parseInt(this.props.data[key]['duration']) > 0 || parseInt( this.props.data[key]['period_of_rest']) > 0) {

                        let colorOverall = this.props.data[key]['period_of_rest'] > this.props.data[key]['duration'] ? this.props.data[key]['period_of_rest'] : this.props.data[key]['duration'];
                        if (this.props.data[key + 'desc'] && this.props.data[key + 'desc'].length) {
                            desc = <View style={[styles.box, {height: 'auto', marginTop: 2}]}>
                                <Text style={[s.h3, s.normal]}>{this.props.data[key + 'desc']}</Text>
                            </View>
                        }
                        if (key == 'fructose' && this.props.data['amountOfFructoseOverall']) {
                            let num = Number(this.props.data['amountOfFructoseOverall']); // The Number() only visualizes the type and is not needed
                            num = num.toFixed(2).replace('.', ',');
                            info.push(<View key={'amountOfFructoseOverall'} style={[styles.box, {
                                backgroundColor: 'transparent',
                                justifyContent: 'space-between',
                                height: 'auto',
                            }]}>
                                <Text style={[s.h3, s.normal]}>{t.amount_of_fructose}</Text>
                                <Text style={[s.h3, s.normal]}>{num} g / 100g</Text>
                            </View>);
                        }
                        if (key == 'fructose' && this.props.data['amountOfGlucoseOverall']) {
                            let num = Number(this.props.data['amountOfGlucoseOverall']); // The Number() only visualizes the type and is not needed
                            num = num.toFixed(2).replace('.', ',');
                            info.push(<View key={'amountOfGlucoseOverall'}  style={[styles.box, {
                                backgroundColor: 'transparent',
                                justifyContent: 'space-between',
                                height: 'auto',
                            }]}>
                                <Text style={[s.h3, s.normal]}>{t.amount_of_glucose}</Text>
                                <Text style={[s.h3, s.normal]}>{num} g / 100g</Text>
                            </View>);
                        }
                        if (key == 'fructose' && this.props.data['fructoseOverallFactor']) {
                            let num = Number(this.props.data['fructoseOverallFactor']); // The Number() only visualizes the type and is not needed
                            num = num.toFixed(2).replace('.', ',');
                            info.push(<View  key={'fructoseOverallFactor'}  style={[styles.box, {
                                backgroundColor: 'transparent',
                                justifyContent: 'space-between',
                                height: 'auto',
                            }]}>
                                <Text style={[s.h3, s.normal]}>{t.fructose_overall_factor}</Text>
                                <Text style={[s.h3, s.normal]}>{num}</Text>
                            </View>);
                        }


                        data = (
                            <View key={key} style={s.m30}>
                                <Text style={[s.h2, {
                                    color: g['colorStrong' + parseInt(colorOverall)],
                                    marginLeft: 10,
                                    marginBottom: 10
                                }]}>{t[key]}</Text>
                                <View
                                    style={[styles.box, {backgroundColor: g['color' + parseInt(this.props.data[key]['period_of_rest'] )]}]}>
                                    <IngridIcon icon={'Smiley' + parseInt(this.props.data[key]['period_of_rest'])} fontSize={21}
                                                style={{paddingRight: 15}}/><Text style={[s.h3, s.normal, {color: g['colorStrong' + parseInt(this.props.data[key]['period_of_rest'])] }]}>{t.period_of_rest}</Text>
                                </View>
                                <View
                                    style={[styles.box, {marginTop:2, backgroundColor: g['color' + parseInt(this.props.data[key]['duration'])]}]}>
                                    <IngridIcon icon={'Smiley' + parseInt(this.props.data[key]['duration'])} fontSize={21}
                                                style={{paddingRight: 15}}/><Text style={[s.h3, s.normal, {color: g['colorStrong' + parseInt(this.props.data[key]['duration'])] }]}>{t.duration}</Text>
                                </View>
                                {desc}
                                {info}
                            </View>);

                    }else{
                        data = (
                            <View key={key} style={s.m30}>
                                <Text style={[s.h2, {
                                    color: g.textColor,
                                    marginLeft: 10,
                                    marginBottom: 10
                                }]}>{t[key]}</Text>
                                <View
                                    style={[styles.box, {backgroundColor: '#F2F2F2'}]}>
                                    <IngridIcon icon='Info' fontSize={21}
                                                style={{paddingRight: 15}}/><Text style={[s.h3, s.normal, {color: g.textColor }]}>{t.noIngRating}</Text>
                                </View>
                            </View>);
                    }
                }

                if(data) {
                    if ((value === true && key !== 'fructose' && key !== 'histamin') || ((key == 'fructose' || key=="histamin") && (value.period_of_rest === true || value.duration === true ))) {
                        allFalse = false;
                        returnVal.push(data);
                    } else {
                        collapseVal.push(data);
                    }
                }

            });

        if(allFalse) {
            return (<View>{description}{line}{collapseVal}</View>);
        }else{
            return (<View>{description}{line}
                {returnVal}
                <Fade visible={this.state.isCollapsed}>
                <View style={{flex:1, height: 40, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                    <IngridButton onPress={() => this.setState({isCollapsed: false})} type="small" text={t.showAll} />
                </View>
                </Fade>
                <Collapsible collapsed={this.state.isCollapsed}>
                    {collapseVal}
                </Collapsible>
                </View>);

        }
    }

    componentWillMount() {


        delete this.props.settings.isFirstLaunch;
        delete this.props.settings.userName;
        if (typeof t == 'function') {
            t = t();
        }
        this.setState({isCollapsed: true});
    }
})

const styles = StyleSheet.create({
    box: {
        flex: 1,
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'rgba(216,216,216,0.3)',
        borderRadius: 2
    }
});
