import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading, onCloseOverlay }) {
  const currentUser = useContext(CurrentUserContext);
  
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  
  function handleChangeName(e) {
    setName(e.target.value);
  }
  
  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}>
      <input
        name="name"
        className="popup__input"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-error" />
      <input
        name="about"
        className="popup__input"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error about-error" />
    </PopupWithForm>
  )
}
  
export default EditProfilePopup