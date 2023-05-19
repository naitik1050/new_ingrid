import React from 'react';
import IngridRoot from './src';
import Loader from './src/components/Loader';


import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/store';



export default class App extends React.Component {
    state = {
        fontLoaded: false
    };

    render() {
        if (!this.state.fontLoaded) {
            return null;
        }

        return (
            <Provider store={store}>
                <PersistGate loading={<Loader visible={true} />} persistor={persistor}>
                    <IngridRoot />
                </PersistGate>
            </Provider>

        );
    }

    async componentWillMount() {



        try {
            await Expo.Font.loadAsync({
                'Poppins': require('./src/assets/fonts/Poppins-Regular.ttf'),
                'Roboto': require('./src/assets/fonts/Poppins-Regular.ttf'),
                'Poppins_medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
                'Roboto_medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
                'Poppins_semibold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
                'icomoon': require('./src/assets/fonts/icomoon.ttf'),
            });
            this.setState({fontLoaded: true});
        } catch (error) {
        }




    }


}


