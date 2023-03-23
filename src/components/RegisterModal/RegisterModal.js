import "./RegisterModal.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";

export const RegisterModal = ({
  isOpen,
  isLoading,
  onCloseModal,
  handleRegistration,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration({ name, avatar, email, password });
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Saving..." : "Next"}
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
        onChange={handleNameChange}
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
        onChange={handleAvatarChange}
        required
      />
      <span className="modal__input-error avatar-url-error"></span>
      <p className="modal__auth-text">
        or{" "}
        <Link className="modal__form-link" to="/signin">
          Login
        </Link>
      </p>
    </ModalWithForm>
  );
};
