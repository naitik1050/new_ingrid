import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer'
import IngredientsReducer from './IngredientsReducer'
import SelectedCatReducer from './SelectedCatReducer'
import SettingsReducer from './SettingsReducer'
import TmpReducer from './TmpReducer'
import UpdateCheck from './UpdateCheck'
import IngridTextReducer from './IngridTextReducer'
import StringsReducer from './StringsReducer'
import ScreenReducer from './ScreenReducer'
import FavoritesReducer from './FavoritesReducer'
import SortedIngredientsReducer from "./SortedIngredientsReducer";
import OwnRatingReducer from "./OwnRatingReducer";
import ImprintReducer from "./ImprintReducer";
import FAQReducer from "./FAQReducer";
import AdReducer from "./AdReducer";
import PrivacyReducer from "./PrivacyReducer";

export default combineReducers({
    categories: CategoryReducer,
    selectedCat: SelectedCatReducer,
    settings: SettingsReducer,
    tmp: TmpReducer,
    ingredients: IngredientsReducer,
    sortedIngredients: SortedIngredientsReducer,
    selectedIng: () => [],
    lastUpdate: UpdateCheck,
    ingridTexts: IngridTextReducer,
    currentScreen: ScreenReducer,
    favorites: FavoritesReducer,
    ownRating: OwnRatingReducer,
    strings: StringsReducer,
    imprint: ImprintReducer,
    faq: FAQReducer,
    adfree: AdReducer,
    privacy: PrivacyReducer,
});