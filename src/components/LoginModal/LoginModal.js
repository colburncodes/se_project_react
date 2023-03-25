import React, { useEffect, useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import { Link, useHistory } from "react-router-dom";
import "./LoginModal.css";

export const LoginModal = ({
  name,
  isOpen,
  isLoading,
  onCloseModal,
  handleUserLogin,
  handleToggleModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUserLogin(email, password);
    history.push("/profile");
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  return (
    <ModalWithForm
      title={"Log in"}
      name={name}
      buttonText={isLoading ? "Logging in..." : "Login"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeModal={onCloseModal}
    >
      <label className="modal__label">Email</label>
      <input
        id="email"
        className={`modal__input modal__input-email`}
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        minLength="1"
        maxLength="30"
        onChange={handleEmailChange}
        required
      />
      <span className="modal__input-error email-error"></span>
      <label className="modal__label-password">Password</label>
      <input
        id="password"
        className={`modal__input modal__input-password`}
        type="text"
        name="password"
        value={password}
        placeholder="Password"
        onChange={handlePasswordChange}
        required
      />
      <span className="modal__input-error password-error"></span>
      <p className="modal__auth-text-login">
        or{" "}
        <Link
          className="modal__form-link"
          to="/signup"
          onClick={handleToggleModal}
        >
          Register
        </Link>
      </p>
    </ModalWithForm>
  );
};
