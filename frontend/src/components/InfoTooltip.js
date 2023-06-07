import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container-info">
        <button
          className="popup__close-btn"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__img-info"
          src={props.isSuccess ? successImage : failImage}
          alt="#"
        />
        <h2 className="popup__title-info">{props.message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;