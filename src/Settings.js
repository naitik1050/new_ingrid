'use strict';

const React = require('react-native');
const g = require('./vars');
import * as FileSystem from 'expo-file-system';
const {
    Platform,
    AsyncStorage
} = React;


async function getSettings() {
    try {
        const value = await AsyncStorage.getItem('@Ingrid:settings');
        if (value !== null && value !== 'undefined') {
            return await JSON.parse(value);
        } else {


            const initSettings = {
                isFirstLaunch: true,
                userName: '',
                fodmap: false,
                lactose: false,
                histamin:false,
                sorbit:false,
                gluten:false,
                fructoseKP:false,
                fructoseDE:false,
            };
            await AsyncStorage.setItem('@Ingrid:settings', JSON.stringify(initSettings));
            return await this.getSettings();
        }
    } catch (error) {
    }
}

async function saveSetting(key, value) {
    try {
        let settings = await AsyncStorage.getItem('@Ingrid:settings');

        if (settings !== null && settings !== 'undefined') {
            settings = await JSON.parse(settings);
            settings[key] = value;

            try {
                await AsyncStorage.setItem('@Ingrid:settings', JSON.stringify(settings));
                return true;
            }catch(error){
                return false;
            }

        }
    } catch (error) {
        return false;
    }
}

async function saveSettings(newSettings) {
    try {
        await AsyncStorage.setItem('@Ingrid:settings', JSON.stringify(newSettings));
        return true;
    } catch (error) {
        return false;
    }
}

async function getAllIngredients() {
    try {

        const value = await AsyncStorage.getItem('@Ingrid:ingredients');
        if (value !== null && value !== 'undefined') {
            return await JSON.parse(value);
        } else {
            const ingredients = await fetchIngredients();
            await AsyncStorage.setItem('@Ingrid:ingredients', JSON.stringify(ingredients));
            return await this.getAllIngredients();

        }
    } catch (error) {
    }
}

async function fetchIngredients() {
    let url = g.apiUrl,
        params = {token: g.token};

    url = url + 'get/ingredients/all?token=' + g.token;
    let response = await fetch(
        url
    );
    let responseJson = await response.json();

    return responseJson.ingredients
}
async function updateData() {
    await fetchCategories();
}


async function getAllCategories() {
    try {

        const value = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'categories.json');

        if (value !== null && value !== 'undefined') {
            return JSON.parse(value).categor;
        } else {
            const categories = await fetchCategories();
            return await this.getAllCategories();
        }
    } catch (error) {
    }
}

async function fetchCategories() {
    let url = g.apiUrl,
        params = {token: g.token};

    url = url + 'get/categories?token=' + g.token;
    let response = await fetch(
        url
    );

    let responseText = await response.text();

    const responseJson = JSON.parse(responseText);
    if(responseText.length && typeof responseJson.success !== 'undefined' && responseJson.success == true){
        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'categories.json', responseText)
    }
}

module.exports =  {getSettings, saveSetting, saveSettings, getAllIngredients, getAllCategories, updateData};
