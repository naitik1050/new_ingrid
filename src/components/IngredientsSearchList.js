/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, {Component} from "react";
import {View, Text, Dimensions} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {connect} from 'react-redux';
import {selectCat} from '../actions';

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

const s = require('../style');

let containerCount = 0;

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }

    render() {
        return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>;
    }
}

let searches = [];
/***
 * To test out just copy this component and render in you root component
 */
import IngredientSearchListItem from "./IngredientSearchListItem";


const mapStateToProps = state => {
    return {ing: state.ingredients};
};

export default connect(mapStateToProps, {selectCat})(class IngredientsSearchList extends React.Component {

    data = [];

    constructor(args) {
        super(args);

        let {width} = Dimensions.get("window");

        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        this._layoutProvider = new LayoutProvider(
            index => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 46;
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        this.state = {
            dataProvider: false,
            isScrolling: false,
            search: '',
            isSearching: false,
        };
    }

    componentWillReceiveProps(nextProps){
            this.setState({search: nextProps.search, isSearching: nextProps.search !== this.state.search});

            if(this.state.isSearching && searches.length){
                this.props.selectCat(nextProps.search);
                this.recyclerListView.scrollToTop();
            }

    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }

    //Given type and data return the view component
    _rowRenderer(type, data) {


        return (
            <IngredientSearchListItem navigation={this.props.navigation} data={data} searchText={this.state.search}/>
        );
    }

    findInIngredients(searchText) {
        return Object.values(this.props.ing).filter(item => ~item.title.toLowerCase().indexOf(searchText))

    }

    render() {
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        let data = this.state.dataProvider;




        if (typeof this.state.search !== 'undefined' && this.state.isSearching && this.state.search.length) {

            searches = this.findInIngredients(this.state.search.toLowerCase());
            data = dataProvider.cloneWithRows(searches);
        }



        if (!this.state.isSearching || (this.state.isSearching && searches.length)) {
            return <RecyclerListView ref = { ref => this.recyclerListView = ref } style={[(this.props.favorites ? s.mt20 : s.mt40), {marginBottom: 50}]}
                                     layoutProvider={this._layoutProvider}
                                     dataProvider={data} rowRenderer={this._rowRenderer}/>;
        } else {
            return <View style={[s.mt40, {
                paddingBottom: 40,
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                minHeight: 300
            }]}><Text style={[s.h2]}>Kein Suchergebnis</Text></View>;
        }

    }


    componentWillMount() {
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

            this.data = this.props.ing;


        this.setState({dataProvider: Object.values(this.data).length ? dataProvider.cloneWithRows(Object.values(this.data)) : false})
    }
});

const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
};