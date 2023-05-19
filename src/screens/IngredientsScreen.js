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
    BackHandler,
    Easing, Image
} from 'react-native';

import IngredientsList from '../components/IngredientsList';
import IngredientListItem from '../components/IngredientListItem';

import { Item , Input} from 'native-base';
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import TextTicker from 'react-native-text-ticker'

import IngridIcon from "../components/IngridIcon";

import Modal from "react-native-modal";
import IngridHelpModal from '../components/IngridHelpModal';

const s = require('../style');
const g = require('../vars');
let t = {};

import {connect} from 'react-redux';
import {intolChanged, saveSettings, setScreen} from '../actions';


const styles = g.HEADER_STYLES;
const favs = [];

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

let {height} = Dimensions.get("window");

class IngredientsScreen extends Component {
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
                Platform.OS === 'ios' ? - g.HEADER_MAX_HEIGHT : 0,
            ),
            isModalVisible: false,
            refreshing: false,
            visible: true, delay: 50, animateIn: 0, animate: 0, isFavorite: false, animate2: 0, isTransitioning: 0

        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    _rowRenderer(type, data) {


        if(data.id){
            return (
                <IngredientListItem navigation={this.props.navigation} data={data} searchText={this.state.search}/>
            );
        }else{
            return <View/>;
        }

    }


    findInIngredients(searchText) {
        return Object.values(this.props.ing).filter(item => ~item.title.toLowerCase().indexOf(searchText))

    }

    _updateScroll= (offset) =>{

        if(
            (typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.favorites !== 'undefined' && this.props.navigation.state.params.favorites == true && this.props.favoritesList.length > parseInt((height*1.8)/50))

        ) {

            this.setState({
                scrollY: new Animated.Value(
                    Platform.OS === 'ios' ? offset - g.HEADER_MAX_HEIGHT : offset,
                )
            });
            Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                {useNativeDriver: true},
            );
        }else{
            this.setState({
                scrollY: new Animated.Value(
                    Platform.OS === 'ios' ? offset - g.HEADER_MAX_HEIGHT : offset,
                )
            });
            Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                {useNativeDriver: true},
            );
        }
    };

    render() {

        t = this.props.strings;
        let {height} = Dimensions.get("window");
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ?  g.HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -g.HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });



        const imageOpacity = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE / 2, g.HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -5],
            extrapolate: 'clamp',
        });
        const barTranslate = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, 300],
            extrapolate: 'clamp',
        });
        const titleTranslateY = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -92],
            extrapolate: 'clamp',
        });
        const heartTranslateY = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE],
            outputRange: [0, -100],
            extrapolate: 'clamp',
        });


        const heartOpacity = scrollY.interpolate({
            inputRange: [0, g.HEADER_SCROLL_DISTANCE/3],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        let title = t.nahrungsmittel;

        if (typeof this.props.navigation.state.params !== 'undefined' && this.props.navigation.state.params.favorites) {
            title = t.favoriten;
        }

        if (typeof this.props.navigation.state.params !== 'undefined' && this.props.navigation.state.params.cat) {
            title = this.props.navigation.state.params.catName;
        }

        if(typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.allGreen !== 'undefined' && this.props.navigation.state.params.allGreen == true){
            title = t.vertraeglichkeiten;
        }

        let dataProvider = new DataProvider((r1, r2) => {
            return r1.title !== r2.title;
        });

        let data = this.state.dataProvider;



        let list = <View style={[s.mt40, {
            paddingBottom: 40,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            minHeight: 300,
        },  s.padding]}><Text style={[s.h2, {textAlign: 'center'}]}>{t.noFavorites}</Text></View>;

        let listNav = <Animated.View
            style={[
                s.paddingSmall, styles.switchbar,
                {
                    transform: [
                        {scale: titleScale},
                        {translateX: barTranslate},
                    ],
                },
            ]}
        >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Category')}>
                <Text style={[s.h2, styles.switchbarText]}>{t.categories}</Text>
            </TouchableOpacity>

            <Text style={[s.h2, styles.switchbarText, styles.switchbarActive]}>{t.list}</Text>
            <TouchableOpacity style={{paddingLeft: 10}} onPress={this._toggleModal}>
                <Image style={{width: 26, height: 26}} source={require('../assets/images/question.png')}/>
            </TouchableOpacity>
        </Animated.View>;

            if((typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.favorites !== 'undefined' && this.props.navigation.state.params.favorites == true) || (typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.allGreen !== 'undefined' && this.props.navigation.state.params.allGreen == true)){
                listNav = false;
            }
        if (data) {
            list =  <RecyclerListView ref = { ref => this.recyclerListView = ref } style={[(this.props.favorites ? s.mt20 : s.mt40), {marginBottom: 0, maxHeight: height - g.HEADER_MIN_HEIGHT, marginTop: g.HEADER_MIN_HEIGHT }]}
                                      layoutProvider={this._layoutProvider}
                                      dataProvider={data} rowRenderer={this._rowRenderer} onScroll={(e,x,y) => this._updateScroll(y)} />;
        }


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
                        styles.header, {backgroundColor: g.primary},
                        {transform: [{translateY: headerTranslate}]},
                    ]}
                ></Animated.View>
                <View style={[styles.bar]}><TouchableOpacity onPress={() => this.props.navigation.goBack()}><IngridIcon
                    icon="ArrowBack" fontSize='20' padding="15"/></TouchableOpacity></View>
                {listNav}
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
                    <TextTicker style={[s.h1, {flex: 1}]}  easing={Easing.inOut(Easing.cubic)} duration={6000} marqueeDelay={2000}
                                loop
                                bounce>{title}</TextTicker>
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

                    <Animated.View style={[s.paddingSmall, {position: 'absolute', zIndex: 7, left:0, right:0, top: g.HEADER_MAX_HEIGHT-30},{
                        transform: [

                            {translateY: heartTranslateY},


                        ],
                    },{opacity: heartOpacity}]}>
                            <Item rounded style={[s.searchInput, {position: 'relative', zIndex: 7}]} onPress={() => this.props.navigation.navigate('Search')}>
                                <IngridIcon icon="Search" fontSize='20' padding="10" />
                                <Input editable={false} pointerEvents={'none'}  placeholderTextColor="#A4A4A4" placeholder={t.suchbegriff}  style={[s.normal, s.searchInputInner]} />
                            </Item>

                    </Animated.View>


                <Modal animationIn={'zoomIn'} animationOut={'zoomOut'}  isVisible={this.state.isModalVisible}  backdropColor={g.primary} backdropOpacity={1}>
                    <IngridHelpModal toggleModal={this._toggleModal} />
                </Modal>
            </View>


        );
    }

    fetchGreenIngs(){

        return Object.values(this.props.ing).filter(item => {
            if(this.props.ownRating[item.id]) {
                return this.props.ownRating[item.id] === 1 ? true : false;
            }else {

                if ((this.props.settings.lactose && item.lactose === 2) || (this.props.settings.histaminKP && item.histamin.period_of_rest === 2) || (this.props.settings.histaminDE && item.histamin.duration === 2) || (this.props.settings.fructoseKP && item.fructose.period_of_rest === 2) || (this.props.settings.fructoseDE && item.fructose.duration === 2) || (this.props.settings.gluten && item.gluten === 2) || (this.props.settings.sorbit && item.sorbit === 2) || (this.props.settings.fodmap && item.fodmap === 2)) {
                   return false;
                }
                if ((this.props.settings.lactose && item.lactose === 3) || (this.props.settings.histaminKP && item.histamin.period_of_rest === 3) || (this.props.settings.histaminDE && item.histamin.duration === 3) || (this.props.settings.fructoseKP && item.fructose.period_of_rest === 3) || (this.props.settings.fructoseDE && item.fructose.duration === 3) || (this.props.settings.gluten && item.gluten === 3) || (this.props.settings.sorbit && item.sorbit === 3) || (this.props.settings.fodmap && item.fodmap === 3)) {
                    return false;
                }
                if ((this.props.settings.lactose && item.lactose === 0) || (this.props.settings.histaminKP && item.histamin.period_of_rest === 0) || (this.props.settings.histaminDE && item.histamin.duration === 0) || (this.props.settings.fructoseKP && item.fructose.period_of_rest === 0) || (this.props.settings.fructoseDE && item.fructose.duration === 0) || (this.props.settings.gluten && item.gluten === 0) || (this.props.settings.sorbit && item.sorbit === 0) || (this.props.settings.fodmap && item.fodmap === 0)) {
                    return false;
                }
                if ((this.props.settings.lactose && item.lactose === 1) || (this.props.settings.histaminKP && item.histamin.period_of_rest === 1) || (this.props.settings.histaminDE && item.histamin.duration === 1) || (this.props.settings.fructoseKP && item.fructose.period_of_rest === 1) || (this.props.settings.fructoseDE && item.fructose.duration === 1) || (this.props.settings.gluten && item.gluten === 1) || (this.props.settings.sorbit && item.sorbit === 1) || (this.props.settings.fodmap && item.fodmap === 1)) {
                    return true;
                }
                return false;
            }
        })

    }


    componentWillMount(){
        this.props.setScreen('CategoryScreen');
        let dataProvider = new DataProvider((r1, r2) => {
            return r1.title !== r2.title;
        });




        this.data = {};

        this.filterE = false;

        if(typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.allGreen !== 'undefined' && this.props.navigation.state.params.allGreen == true){
            this.data = this.fetchGreenIngs();
            this.filterE = true;
        }else if (typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.cat !== 'undefined' && this.props.navigation.state.params.cat) {

            this.data = this.props.sortedIng[this.props.navigation.state.params.cat] ? this.props.sortedIng[this.props.navigation.state.params.cat].ings : {};
        } else {
            this.filterE = true;
            this.data = this.props.ing;
        }

        if (typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.favorites !== 'undefined' && this.props.navigation.state.params.favorites == true && this.props.favoritesList) {
            this.data = this.props.favoritesList;

            let tmp = {};

            Object.values(this.data).map((currElement) => {
                if (typeof this.props.ing[currElement.id] !== 'undefined') {
                    tmp[currElement.id] = this.props.ing[currElement.id];
                }
            });

            this.data = tmp;

            this.filterE = false;
        }

        if(this.filterE) {
            this.enumbers = [];
            this.data = Object.values(this.data).filter((arr) => {

                if(arr.cat_id.indexOf(19) !== -1){
                    this.enumbers.push(arr);
                }
                return arr.cat_id.indexOf(19) == -1;
            });
        }else{
            this.data =Object.values(this.data);
        }

        this.data = this.data.sort((str1, str2)=>{


                return ( ( str1['title'].toLowerCase() == str2['title'].toLowerCase() ) ? 0 : ( ( str1['title'].toLowerCase() > str2['title'].toLowerCase() ) ? 1 : -1 ) );

        });

        if(this.filterE ){

            this.enumbers = this.enumbers.sort((str1, str2)=>{


                return ( ( str1['title'].toLowerCase() == str2['title'].toLowerCase() ) ? 0 : ( ( str1['title'].toLowerCase() > str2['title'].toLowerCase() ) ? 1 : -1 ) );

            });
            this.data =[  ...this.data, ...this.enumbers ]
        }

        this.data = emptyArray.concat(this.data);
        if(!this.props.adfree) {
            this.data = this.data.concat(emptyArray);
        }

        this.setState({dataProvider: this.data.length ? dataProvider.cloneWithRows(this.data) : false});

        if (typeof t == 'function') {
            t = t();
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    handleBackButtonClick() {

        if(typeof this.props.navigation.state.params !== 'undefined' && typeof this.props.navigation.state.params.cat !== 'undefined' && this.props.navigation.state.params.cat){
            const {goBack} = this.props.navigation; goBack();
        }else{
            this.props.navigation.navigate('Home');
        }
        return true;
    }

}

const emptyArray = [{},{},{}];
const mapStateToProps = state => {
    return {settings: state.tmp, ing: state.ingredients, favoritesList: state.favorites, sortedIng: state.sortedIngredients, ownRating: state.ownRating, strings: state.strings, adfree: state.adfree};
};

export default connect(mapStateToProps, {intolChanged, saveSettings, setScreen})(IngredientsScreen);