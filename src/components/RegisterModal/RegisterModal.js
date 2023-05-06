import "./RegisterModal.css";
import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

export const RegisterModal = ({
  isOpen,
  isLoading,
  onCloseModal,
  onRegistration,
  handleToggleModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
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

  function handleName(e) {
    setName(e.target.value);
  }

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegistration({ name, avatar, email, password });
    history.push("/profile");
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  return (
    <ModalWithForm
      type="register"
      title="Sign up"
      buttonText={isLoading ? "Registered..." : "Next"}
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
      <label className="modal__label">Name</label>
      <input
        id="name"
        className={`modal__input modal__input-name`}
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        minLength="1"
        maxLength="30"
        onChange={handleName}
        required
      />
      <span className="modal__input-error name-error"></span>
      <label className="modal__label">Avatar URL</label>
      <input
        id="avatar-url"
        className={`modal__input modal__input-avatar-url`}
        type="url"
        name="avatar"
        value={avatar}
        placeholder="Avatar URL"
        pattern="https://.*"
        onChange={handleAvatar}
        required
      />
      <span className="modal__input-error avatar-url-error"></span>
      <p className="modal__auth-text" onClick={handleToggleModal}>
        or Login
      </p>
    </ModalWithForm>
  );
};
