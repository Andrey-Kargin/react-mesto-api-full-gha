import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading, onCloseOverlay }) {
  const inputRef = useRef();
    
  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleChangeAvatar() {
    return inputRef.current.value;
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}>
      <input
        name="avatar"
        className="popup__input"
        type="url"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={inputRef}
        onChange={handleChangeAvatar}
      />
      <span className="popup__input-error avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;