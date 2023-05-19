import React from 'react';
import {Animated} from 'react-native';
import {DangerZone} from "expo";

import LottieView from "lottie-react-native";
const Lottie = LottieView;

export default class Dot extends React.Component {

    animate = 0;
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(props.navigateIn == 0.7 ? 0.3 : 0.7),
            animate: props.animate,
            animateIn: props.animateIn,
        };
    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }

    render() {




        let progress = new Animated.Value(this.props.isActive ? 1 : 0);

        if(this.props.isTransitioning == 1){
             progress = new Animated.Value(this.props.isActive ? 0 : 1);

        }
        const animate = this.props.animate;



        if (animate === 1) {

                progress = new Animated.Value(this.props.isActive ? 0 : 1);


            Animated.timing(progress, {
                toValue: this.props.isActive ? 1 : 0, // <-- Animate to the beginning of animation
                duration: 850,
            }).start();
        }

        this.source = '../assets/animations/'+ this.props.value +'.json';

        switch(this.props.value){
            case 0:
                if(this.props.ownRating){
                    this.source = require('../assets/animations/0.json');

                }else{
                    this.source = require('../assets/animations/0-stroke.json');

                }
                break;
            case 1:
                if(this.props.ownRating){
                    this.source = require('../assets/animations/1.json');

                }else{
                    this.source = require('../assets/animations/1-stroke.json');

                }                break;
            case 2:
                if(this.props.ownRating){
                    this.source = require('../assets/animations/2.json');

                }else{
                    this.source = require('../assets/animations/2-stroke.json');

                }
                break;
            case 3:
                if(this.props.ownRating){
                    this.source = require('../assets/animations/3.json');

                }else{
                    this.source = require('../assets/animations/3-stroke.json');

                }
                break;
        }
        return (
            <Lottie
                style={{
                    width: 24,
                    height: 24,
                }}
                source={this.source}
                progress={progress}
            />
        );
    }
}
