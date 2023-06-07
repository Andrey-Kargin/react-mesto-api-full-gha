import React from 'react';

function ImagePopup({card, onClose, onCloseOverlay}) {
  return (
    <div className={`popup img ${card.link && 'popup_opened'}`} onClick={onCloseOverlay}>
      <div className="popup__container-img">
        <img className="popup__image" src={card.link} alt={card.name}/>
        <h2 className="popup__description">{card.name}</h2>
        <button className="popup__close-btn" type="button" onClick={onClose}/>
      </div>
    </div>
  )
}

export default ImagePopup;