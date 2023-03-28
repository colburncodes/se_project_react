import React, { useState } from "react";
import { ModalWithForm } from "../ModalWithForm/ModalWithForm";
import { useHistory } from "react-router-dom";

export function EditProfileModal({
  isOpen,
  isLoading,
  onEditProfile,
  onCloseModal,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  function handleName(e) {
    setName(e.target.value);
  }

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(name, avatar);
    history.push("/profile");
  }
  return (
    <ModalWithForm
      title="Change profile"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeModal={onCloseModal}
    >
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
        placeholder="Avatar"
        pattern="https://.*"
        onChange={handleAvatar}
        required
      />
      <span className="modal__input-error avatar-url-error"></span>
    </ModalWithForm>
  );
}
