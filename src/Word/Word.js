import React, {Component} from 'react';
import './Word.css';

class Word extends Component {

    constructor() {
        super();
        this.words = [
            'This is a wise word',
            'This is another a wise word',
            'I have hte best wise words',
            'You would\'nt believe',
            'more words to go in there',
            'yet another wise saying',
            'peng',
            'hummus and fries'
        ];
    }

    componentDidMount() {
        // if cookie present do nothing else
        // load a random word
        // create cookie that expires in 12hrs
    }
    
    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * Math.floor(this.words.length-1));
        console.log(randomIndex, this.words.length);
        return this.words[randomIndex];
    }

    render() {

        return (
            <div className="OnThisDay applet active">
                {this.getRandomWord()}
            </div>
        );
    }
}

export default Word;