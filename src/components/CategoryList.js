import React, {Component} from 'react';
import {ListView, FlatList} from 'react-native';
import {ListItem,List, Text} from 'native-base';
import {connect} from 'react-redux';

import IngridListItem from "./ListItem";


const mapStateToProps = state => {
    return {cats: state.categories, adfree: state.adfree};
};

export default connect(mapStateToProps)(class CategoryList extends Component {
    render() {


        return (

            <FlatList  style={{paddingBottom: this.props.adfree ? 0 : 90}} noIndent={true} data={this.props.cats}
                      renderItem={({item}) => this.renderRow(item)} keyExtractor={(item, index) => item.id} />

        );
    }

    renderRow(cat) {


            return <IngridListItem onPress={() => {this.props.navigation.navigate('Ingredients', {cat: cat.id, catName: cat.title})}} data={cat}/>;

    }

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.props.cats = this.props.cats.sort((str1, str2)=>{

            return ( ( str1.title.toLowerCase() == str2.title.toLowerCase() ) ? 0 : ( ( str1.title.toLowerCase() > str2.title.toLowerCase() ) ? 1 : -1 ) );

        });


    }
});
