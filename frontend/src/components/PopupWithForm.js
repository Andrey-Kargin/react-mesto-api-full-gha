import React from "react";

function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit, onCloseOverlay}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onCloseOverlay}>
      <div className="popup__container">
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button" type="submit">{buttonText}</button>
        </form>
        <button className="popup__close-btn" type="submit" onClick={onClose}/>
      </div>
        </div>
  )
}

export default PopupWithForm