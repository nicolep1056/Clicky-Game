import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {
    
    // Setting this.state.cards to the cards json array
    state = {
        cards,
        correctGuesses,
        bestScore,
        clickMessage
    };

    isClicked = id => {

        const cards = this.state.cards;

        const clickedMatch = cards.filter(match => match.id === id);

        // If the cardd image's clicked value is already true, 
        // do the game over actions
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
          <Title score={this.state.score} highscore={this.state.highscore}>Cartoon Clicky Game</Title>
          {this.state.cards.map(card => (
            <FriendCard
              isClicked={this.isClicked}
              id={card.id}
              key={card.id}
              image={card.image}
            />
          ))}
        </Wrapper>
/*             <Wrapper>
                <Title>Cartoon Clicky Game!</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.cards.map(match => (
                    <Card
                        isClicked={this.isClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper> */
        );
    }
}

export default App;
/* class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.cards.find((o, i) => {
      if (o.id === id) {
        if(cards[i].count === 0){
          cards[i].count = cards[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.cards.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
        <Title score={this.state.score} highscore={this.state.highscore}>Clicky Game</Title>
        {this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

 */