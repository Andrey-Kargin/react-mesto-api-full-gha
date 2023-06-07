import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace, onLoading, onCloseOverlay}) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }
  
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText={onLoading ? `Создание...` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}>
      <input
        name="name"
        type="text"
        className="popup__input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handleChangePlaceName}
      />
      <span className="popup__input-error placeName-error" />
      <input
        name="link"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        value={placeLink}
        required
        onChange={handleChangePlaceLink}
      />
      <span className="popup__input-error placeLink-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup