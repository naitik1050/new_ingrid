import React, {Component} from 'react';
import {NetInfo, Platform} from 'react-native';
import {Root} from 'native-base';
import Loader from './components/Loader';
import IntroScreen from './screens/IntroScreen';
import IntoleranzenScreen from './screens/IntoleranzenScreen';
import HomeScreen from './screens/HomeScreen';
import AdfreeScreen from './screens/AdfreeScreen';
import CategoryScreen from './screens/CategoryScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ImprintScreen from './screens/ImprintScreen';
import FAQScreen from './screens/FAQScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import NameChangeScreen from './screens/NameChangeScreen';
import SearchScreen from './screens/SearchScreen';

import {connect} from 'react-redux';
import {
    copySettings,
    saveSettings,
    updateCats,
    updateLastUpdate,
    updateIng,
    updateSortedIng,
    updateTexts,
    updateStrings,
    updateImprint,
    updateFAQ,
    updatePrivacy,
} from './actions';


import {StyleSheet, AsyncStorage, Text, View} from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DetailScreen from "./screens/DetailScreen";
import * as Localization from 'expo-localization';

const g = require('./vars');

let lang = 'de';


const fade = (props) => {
    const {position, scene} = props;

    const index = scene.index;

    const translateX = 0;
    const translateY = 0;

    const opacity = position.interpolate({
        inputRange: [index - 0.7, index, index + 0.7],
        outputRange: [0.3, 1, 0.3]
    });

    return {
        opacity,
        transform: [{translateX}, {translateY}]
    }
};

const ListStack = createStackNavigator(
    {
        Category: {
            screen: props => <CategoryScreen {...props} />
        },

        Ingredients: {
            screen: props => <IngredientsScreen {...props} />
        },

        Home: {
            screen: HomeScreen
        },

        Search: {
            screen: SearchScreen
        },

    },
    {
        initialRouteName: 'Category',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        },
        transitionConfig: () => ({
            screenInterpolator: (props) => {
                return fade(props)
            }
        })
    },
);


const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Adfree: {
            screen: props => <AdfreeScreen {...props} />
        },
        Intro: {
            screen: props => <IntroScreen {...props} />
        },
        Intoleranz: {
            screen: props => <IntoleranzenScreen {...props} />
        },
        Category: {
            screen: ListStack
        },
        Ingredients: {
            screen: props => <IngredientsScreen {...props} />
        },
        Imprint: {
            screen: props => <ImprintScreen {...props} />
        },
        FAQ: {
            screen: props => <FAQScreen {...props} />
        },
        Privacy: {
            screen: props => <PrivacyScreen {...props} />
        },
        NameChange: {
            screen: props => <NameChangeScreen {...props} />
        },
        Search: {
            screen: props => <SearchScreen {...props} />
        },
        Detail: {
            screen: props => <DetailScreen {...props} />
        },


    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        }
    },

);


const RootStack = (launch) => {
    return createStackNavigator(
        {
            Home: {
                screen: HomeStack
            },
            Intro: {
                screen: props => <IntroScreen {...props} />
            },
            Intoleranz: {
                screen: props => <IntoleranzenScreen {...props} />
            },
            Detail: {
                screen: props => <DetailScreen {...props} />
            },

        },
        {
            initialRouteName: launch ? 'Intro' : 'Home',
            headerMode: 'none',
            navigationOptions: {
                gesturesEnabled: false
            },
            transitionConfig: () => ({
                screenInterpolator: (props) => {
                    return fade(props)
                }
            })

        },
    );
};


class IngridRoot extends React.Component {
    state = {
        isUpdating: true,
        updateNotice: false
    };

    constructor(props) {
        super(props);
    }

    Stack = createAppContainer(RootStack(this.props.settings.isFirstLaunch));

    render() {
        const Stack = this.Stack;
        let screen = false;
        if (this.props.screen) {
            screen = <Loader visible={true}/>
        }
        return (
            <Root style={{backgroundColor: g.primary}}>
                <Stack/><Loader updating={this.state.updateNotice} visible={this.state.isUpdating}/></Root>

        );

    }

    async componentDidMount() {

        lang = 'de';


        if(!this.props.settings.lang){
            lang = (Localization.locale);
            lang = lang !== 'en' ? 'de' : 'en';

            this.props.settings.lang = lang;
        }else{
            lang = this.props.settings.lang;
            lang = (lang !== 'en' && lang.length) ? 'de' : 'en';
        }




        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
                 this.handleFirstConnectivityChange(isConnected)
            }else{

                this.setState({isUpdating: false});
                this.props.copySettings(this.props.settings)
            }
        });

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );



    }

    handleFirstConnectivityChange = async (isConnected) => {
        if (isConnected == true) {
            await this.checkForUpdate()
        }
        else {
            this.setState({isUpdating: false});
        }
        this.props.copySettings(this.props.settings)
    }

    componentWillMount() {
        this.setState({isUpdating: true});
    }

    async checkForUpdate() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'checkupdate?token=' + g.token;
        let response = await fetch(
            url
        );



        if (response.status = 200) {
            let responseJson = await response.json();
            if (this.props.lastUpdate < responseJson.last_update) {
                this.setState({updateNotice: true});

                await this.fetchCategories();
                await this.fetchIngredients();
                await this.fetchSortedIngredients();
                await this.fetchIngridStrings();

                this.props.updateLastUpdate(responseJson.last_update);


                this.setState({isUpdating: false});
            } else {
                this.setState({isUpdating: false});
            }


            this.props.saveSettings(this.props.settings)
        }

        this.setState({isUpdating: false});


    }

    async fetchCategories() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/categories/' + lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();

        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {
            await this.props.updateCats(responseJson.categories);
        }
    }

    async fetchIngredients() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/ingredients/all/' + lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();

        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {
            await this.props.updateIng(responseJson.ingredients);

        }
    }


    async fetchSortedIngredients() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/sortedIngredients/all/' + lang + '?token=' + g.token;
        let response = await fetch(
            url
        );

        let responseJson = await response.json();

        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {
            await this.props.updateSortedIng(responseJson.ingredients);

        }
    }



    async fetchIngridStrings() {
        let url = g.apiUrl,
            params = {token: g.token};

        url = url + 'get/ingridStrings/' + lang + '?token=' + g.token;

        let response = await fetch(
            url
        );

        let responseJson = await response.json();


        if (typeof responseJson.success !== 'undefined' && responseJson.success == true) {


            await this.props.updateStrings(responseJson.strings);
            await this.props.updateTexts(responseJson.texts);
            await this.props.updateImprint(responseJson.imprint);
            await this.props.updateFAQ(responseJson.faq);
            await this.props.updatePrivacy(responseJson.privacy);

        }
    }


}

const mapStateToProps = state => {
    return {settings: state.settings, lastUpdate: state.lastUpdate, screen: state.currentScreen};
};


export default connect(mapStateToProps, {
    copySettings,
    saveSettings,
    updateCats,
    updateLastUpdate,
    updateIng,
    updateSortedIng,
    updateTexts,
    updateStrings,
    updateFAQ,
    updateImprint,
    updatePrivacy,
})(IngridRoot);
