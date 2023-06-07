function AuthForm(props) {
    return(
        <form name="props.name" className="auth__form" onSubmit={props.handleSubmit}>
          <h2 className="auth__title">{props.title}</h2>
          <input name="email" className="auth__input" type="email" placeholder="Email" value={props.email || ""} onChange={props.handleChange} />
          <input name="password" className="auth__input" type="password" placeholder="Пароль" value={props.password || ""} onChange={props.handleChange} />
          <button type="submit" className="auth__button">{props.buttonText}</button>
        </form>
    )
}

export default AuthForm