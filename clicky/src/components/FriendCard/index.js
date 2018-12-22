import React from "react";
import "./style.css";

const FriendCard = props => (
	<div onClick={() => props.isClicked(props.id)} className="card">
		<div className="img-container">
      		<img alt={props.name} src={props.image} />
    	</div>
  </div>
);

export default FriendCard;