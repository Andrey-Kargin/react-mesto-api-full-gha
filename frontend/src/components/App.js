import Main from "./Main";
import api from '../utils/Api';
import auth from '../utils/auth';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ selectedCard, setSelectedCard ] = useState({});
  const [ cards, setCards ] = useState([]);
  const [ cardToDelete, setCardToDelete ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt"); 

  useEffect(() => { 
    if (jwt) { 
      auth 
        .checkToken(jwt) 
        .then((res) => { 
          if (res) { 
            setLoggedIn(true); 
            navigate("/react-mesto-auth"); 
            setEmail(res.data.email); 
          } 
        }) 
        .catch((err) => console.log(err)); 
    } 
  }, [jwt]); 
 
  useEffect(() => { 
    Promise.all([ api.getUserInfo(), api.getInitialCards() ]) 
      .then(res => { 
        const [ userInfo, cardsArray ] = res; 
        setCards(cardsArray); 
        setCurrentUser(userInfo); 
      }) 
      .catch(err => console.log(err)); 
     
  }, [jwt])

  //авторизация пользователя на странице
  function handleLogin(userData) {
    auth
      .login(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setEmail(userData.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  //register users
  function handleRegister(regUserData) {
    auth
      .register(regUserData)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsRegistrationSuccess(true);
        handleSignup("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setCardToDelete(null)
    setIsInfoTooltipOpen(false)
  }

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  const popupOpened =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (popupOpened) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [popupOpened]);


  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);

    api.updateAvatar(avatarData)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);

    api.setUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(isLiked, card.id )
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setCardToDelete(card.id);
  }

  function handleConfirmDelete() {
    api.deleteCard(cardToDelete)
    .then(() => {
      setCards(cards.filter(c => c._id !== cardToDelete))
      closeAllPopups();
    })
    .catch(err => console.log(err));
}

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api.addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <Header
     onSignOut={handleSignout}
     email={email}
    />
        <Routes>
          <Route exact path="/" element={loggedIn ? <Navigate to="/react-mesto-auth" replace /> : <Navigate to="/sign-in" replace />}/>
          <Route exact path='/sign-up' element={<Register onRegister={handleRegister} title="Регистрация" buttonText="Зарегистрироваться" />} />
          <Route exact path='/sign-in' element={<Login onLogin={handleLogin} title="Вход" buttonText="Войти" />} />
          <Route path='/react-mesto-auth' element ={<ProtectedRouteElement
            element={Main}
            path="/"
            onEditProfile={setIsEditProfilePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            cards={cards}
            onCardLike={handleCardLike}
            onCardClick={setSelectedCard}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            email={email}
          />} />
        </Routes>
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
          onCloseOverlay={closeByOverlay}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
          onCloseOverlay={closeByOverlay}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
          onCloseOverlay={closeByOverlay}
        />       
        <ConfirmPopup
          isOpen={!!cardToDelete}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          message={isInfoTooltipMessage}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;