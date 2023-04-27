import React, { useEffect, useState, useMemo } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import { Link, useHistory } from "react-router-dom";
import "./LoginModal.css";

export const LoginModal = ({
  name,
  isOpen,
  isLoading,
  onCloseModal,
  onLogin,
  onToggleModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const isValid = useMemo(() => {
    return password.length >= 8 && email.length >= 8;
  }, [email, password]);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
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
      disabled={!isValid}
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
        onChange={handleEmail}
        required
      />
      <span className="modal__input-error email-error"></span>
      <label className="modal__label-password">Password</label>
      <input
        id="password"
        className={`modal__input modal__input-password`}
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={handlePassword}
        required
      />
      <span className="modal__input-error password-error"></span>
      <p className="modal__auth-text-login" onClick={onToggleModal}>
        or Register
      </p>
    </ModalWithForm>
  );
};
