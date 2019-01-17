import React, {Component} from 'react';
import './Recipes.css';
import dbData from './recipeData.json';

class Recipes extends Component {

    constructor(props){
        super(props);
        this.state = {
            recipe: {
                name: '',
                source: '',
                sourceRef: '',
                cookingDuration: '',
                keyIngredients: '',
                imageUrl: ''
            }
        };
        this.nextRecipe = this.nextRecipe.bind(this);
        this.recipeData = dbData.recipes;
    }

    componentDidMount() {
        this.getRecipe();
    }

    getRecipe() {
        const savedRecipeIndex = localStorage.getItem('cachedrecipe');
        if (savedRecipeIndex) {
            this.setState({
                recipe: this.recipeData[savedRecipeIndex]
            });
        } else {
            this.nextRecipe();
        }
    }

    nextRecipe() {
        function getRandomArbitrary(min, max) {
            return parseInt(Math.random() * (max - min) + min, 10);
        }

        const randomIndex = getRandomArbitrary(0, this.recipeData.length);        
        this.setState({
            recipe: this.recipeData[randomIndex]
        });
        localStorage.setItem('cachedrecipe', randomIndex);
    }


    render() {

        const inlineStyles = {
            backgroundImage: `url(${this.state.recipe.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: '50%'
        };        
        return (
            <div className="Recipes applet">
                <div className="main-title">
                    Next Recipe
                </div>
                <div className="meal-detail">
                    <div className="image" style={inlineStyles}>
                        
                    </div>
                    <div className="details">
                        <h3>{this.state.recipe.name}</h3>
                        <div className="sauce">{this.state.recipe.source} {this.state.recipe.sourceRef}</div>
                        <div className="time-to-cook">
                            {this.state.recipe.cookingDuration}mins
                        </div>
                        <div className="ingredients">
                            {this.state.recipe.keyIngredients}
                        </div>
                        <button className="next-recipe" onClick={this.nextRecipe}>Done with this</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipes;