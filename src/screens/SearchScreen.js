import React, {Component} from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    BackHandler
} from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import {isIphoneX} from 'react-native-iphone-x-helper';

import IngredientSearchListItem from '../components/IngredientSearchListItem';

import { Item , Input} from 'native-base';
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";

import IngridIcon from "../components/IngridIcon";

const s = require('../style');
const g = require('../vars');
const gSearch = {...g};

gSearch.HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? (isIphoneX() ? 130 : 100) : 113;
gSearch.HEADER_SCROLL_DISTANCE = gSearch.HEADER_MAX_HEIGHT - gSearch.HEADER_MIN_HEIGHT;
let t = {};
let searches = [];

import {connect} from 'react-redux';
import {intolChanged, saveSettings, setScreen, selectCat} from '../actions';

const styles = gSearch.HEADER_STYLES;

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

let {height} = Dimensions.get("window");

class SearchScreen extends Component {
    data = {};

    constructor(props) {
        super(props);

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
                dim.height = 50;
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        this.state = {
            dataProvider: false,
            isScrolling: false,
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? - gSearch.HEADER_MAX_HEIGHT : 0,
            ),

            search: '',
            isSearching: false,
            refreshing: false,
            visible: true, delay: 50, animateIn: 0, animate: 0, isFavorite: false, animate2: 0, isTransitioning: 0

        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }


    handleBackButtonClick() {

        const {goBack} = this.props.navigation; goBack();

        return true;
    }


    _rowRenderer(type, data) {


        if(data.id){
            return (
                <IngredientSearchListItem navigation={this.props.navigation} data={data} searchText={this.state.search}/>
            );
        }else{
            return <View/>;
        }

    }


    findInIngredients(searchText) {
        return Object.values(this.props.ing).filter(item => ~item.searchable.toLowerCase().indexOf(searchText))

    }

    _updateScroll= (offset) =>{

            this.setState({
                scrollY: new Animated.Value(
                    Platform.OS === 'ios' ? offset - gSearch.HEADER_MAX_HEIGHT : offset,
                )
            });
            Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                {useNativeDriver: true},
            );

    };

    render() {
        t = this.props.strings;

        let {height} = Dimensions.get("window");
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ?  gSearch.HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -gSearch.HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE / 2, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -5],
            extrapolate: 'clamp',
        });
        const barTranslate = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [0, 300],
            extrapolate: 'clamp',
        });
        const titleTranslateY = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -92],
            extrapolate: 'clamp',
        });
        const heartTranslateY = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -84],
            extrapolate: 'clamp',
        });


        const heartOpacity = scrollY.interpolate({
            inputRange: [0, gSearch.HEADER_SCROLL_DISTANCE/3],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        let title = t.nahrungsmittel;

        if (typeof this.props.navigation.state.params !== 'undefined' && this.props.navigation.state.params.favorites) {
            title = 'Favoriten';
        }

        if (typeof this.props.navigation.state.params !== 'undefined' && this.props.navigation.state.params.cat) {
            title = this.props.navigation.state.params.catName;
        }


        let list = <View style={[s.mt40, {
            paddingBottom: 40,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            minHeight: 300
        }]}><Text style={[s.h2]}>{t.nothingfound}</Text></View>;




            list =  <RecyclerListView ref = { ref => this.recyclerListView = ref } style={[(this.props.favorites ? s.mt20 : s.mt40), {marginBottom: 50, maxHeight: height - gSearch.HEADER_MIN_HEIGHT, marginTop: gSearch.HEADER_MIN_HEIGHT }]}
                                      layoutProvider={this._layoutProvider}
                                      dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} onScroll={(e,x,y) => this._updateScroll(y)}/>;



        return (
            <View style={styles.fill}>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                {list}
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header, {backgroundColor: gSearch.primary},
                        {transform: [{translateY: headerTranslate}]},
                    ]}
                ></Animated.View>
                <View style={[styles.bar]}><TouchableOpacity onPress={() => this.props.navigation.goBack()}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>

                <Animated.View
                    style={[
                        s.paddingSmall, styles.titlebar,
                        {
                            marginTop: -20,
                            transform: [
                                {scale: titleScale},
                                {translateY: titleTranslateY},
                                {translateX: titleTranslate},
                            ],
                        },
                    ]}
                >
                    <Text style={[s.h1, {flex: 1}]} numberOfLines={1}>{title}</Text>
                </Animated.View>
                <Animated.View
                    style={[
                        s.paddingSmall, styles.titlebar,
                        {
                            transform: [

                                {translateY: heartTranslateY},

                            ],
                        },
                    ]}
                >

                </Animated.View>

                <Animated.View style={[s.paddingSmall, {position: 'absolute', zIndex: 7, left:0, right:0, top: gSearch.HEADER_MAX_HEIGHT-30},{
                    transform: [

                        {translateY: heartTranslateY},


                    ],
                }]}>
                    <Item rounded style={[s.searchInput, {position: 'relative', zIndex: 7}]}>
                        <IngridIcon icon="Search" fontSize='20' padding="10" />
                        <Input  ref={ref => this.textInputRef = ref}  autoFocus={true} onChangeText={(text) => {

                            this.setState({search: text, isSearching: text !== this.state.search}, () =>{
                                if(this.state.isSearching){
                                    this.props.selectCat(text);
                                    if (typeof this.state.search !== 'undefined' && this.state.isSearching && this.state.search.length) {

                                        searches = this.findInIngredients(this.state.search.toLowerCase());
                                        searches = searches.sort((str1, str2)=>{


                                            return ( ( str1['title'].toLowerCase() == str2['title'].toLowerCase() ) ? 0 : ( ( str1['title'].toLowerCase() > str2['title'].toLowerCase() ) ? 1 : -1 ) );

                                        });
                                        this.setState({dataProvider  : this.state.dataProvider.cloneWithRows(emptyArray.concat(searches))}, () => {


                                        });
                                        this.recyclerListView.scrollToTop();
                                    }


                                }
                            });


                        }} placeholderTextColor="#A4A4A4" placeholder={t.suchbegriff}  style={[s.normal, s.searchInputInner]} />
                    </Item>

                </Animated.View>

            </View>


        );
    }
    componentDidMount () {

    }

    _renderScrollViewContent() {
        const data = Array.from({length: 30});
        return (
            <View style={[ s.paddingSmall,s.mt40, s.m60]}>
                <CategoryList navigation={this.props.navigation} />
            </View>
        );
    }

    componentWillMount(){
        this.props.setScreen('CategoryScreen');
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this.data = {};
        if (typeof this.state.search !== 'undefined' && this.state.isSearching && this.state.search.length) {

            searches = this.findInIngredients(this.state.search.toLowerCase());
            this.data = searches;
        }else{
            searches = [];
            this.filterE = true;
            this.data = this.props.ing
        }

        if(this.filterE) {
            this.data = Object.values(this.data).filter((arr) => {
                return arr.cat_id.indexOf(19) == -1;
            });
        }else{
            this.data =Object.values(this.data);
        }

        this.data = this.data.sort((str1, str2)=>{


            return ( ( str1['title'].toLowerCase() == str2['title'].toLowerCase() ) ? 0 : ( ( str1['title'].toLowerCase() > str2['title'].toLowerCase() ) ? 1 : -1 ) );

        });

        if(this.filterE ){

            this.enumbers = Object.values(this.props.sortedIng[19].ings);
            this.enumbers = this.enumbers.sort((str1, str2)=>{


                return ( ( str1['title'].toLowerCase() == str2['title'].toLowerCase() ) ? 0 : ( ( str1['title'].toLowerCase() > str2['title'].toLowerCase() ) ? 1 : -1 ) );

            });
            this.data =[  ...this.data, ...this.enumbers ]
        }


        this.setState({dataProvider: this.data.length ? dataProvider.cloneWithRows(emptyArray.concat(this.data)) : false})

        if (typeof t == 'function') {
            t = t();
        }

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
}

const emptyArray = [{},{},{}];
const mapStateToProps = state => {
    return {settings: state.tmp, ing: state.ingredients, favoritesList: state.favorites, sortedIng: state.sortedIngredients, strings: state.strings};
};

export default connect(mapStateToProps, {intolChanged, saveSettings, setScreen, selectCat})(SearchScreen);