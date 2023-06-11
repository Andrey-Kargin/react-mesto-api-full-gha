import Card from './Card';
import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return(
    <>
    <main className="content">  
      <section aria-label="Профиль" className="profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar} alt='Аватар'className="profile__avatar" />
          <button className="profile__avatar-edit" onClick={() => {props.onEditAvatar(true)}}></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Изменить Профиль" onClick={() => {props.onEditProfile(true)}}></button>
          </div>
          <p className="profile__caption">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={() => {props.onAddPlace(true)}}></button>
      </section>
      <section className="places" aria-label="Фотокарточки">
        {props.cards.map(card => (
          <Card
            card={card}
            key={card._id}
            onCardClick={(card) => {
              props.onCardClick(card);
            }}
            onCardDelete={(card) => {
              props.onCardDelete(card);
            }}
            onCardLike={(card) => {
              props.onCardLike(card);
            }}
          />
        ))}
      </section>
    </main>
    <Footer />
    </>
  )
} 

export default Main