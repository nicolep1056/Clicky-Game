import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./friends.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {
    
    state = {
        cards,
        correctGuesses,
        bestScore,
        clickMessage
    };

    isClicked = id => {

        const cards = this.state.cards;

        const clickedMatch = cards.filter(match => match.id === id);

        if (clickedMatch[0].clicked){

            correctGuesses = 0;
            clickMessage = "Game over, try again!"

            for (let i = 0 ; i < cards.length ; i++){
                cards[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({correctGuesses});
            this.setState({cards});

        } else if (correctGuesses < 11) {

            clickedMatch[0].clicked = true;
            correctGuesses++;
            
            clickMessage = "Good job!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({bestScore});
            }

            cards.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({cards});
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            clickedMatch[0].clicked = true;

            correctGuesses = 0;

            clickMessage = "YOU WIN!";
            bestScore = 12;
            this.setState({bestScore});
            
            for (let i = 0 ; i < cards.length ; i++){
                cards[i].clicked = false;
            }

            cards.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ cards });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Cartoon Clicky Game!</Title>

                <br></br>
        
                <h3 className="scoreTally">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreTally">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                <br></br>

                {this.state.cards.map(match => (
                    <FriendCard
                        isClicked={this.isClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper>
        );
    }
}

export default App;
