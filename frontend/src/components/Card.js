import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( `place__like-button ${isLiked && 'place__like-button_active'}` );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }
  
  return(
    <article className="place">
      {isOwn && <button className="place__trash-button" type="button" onClick={handleDeleteClick} />}
      <img className="place__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-info">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card