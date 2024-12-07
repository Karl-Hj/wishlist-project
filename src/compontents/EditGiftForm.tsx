import { Form } from "react-router-dom";
import { editWishFormProps } from "../interfaces/interface";
import { FormEvent, useState } from "react";
import axios from "axios";
import "../css/editForm.css";

export function EditGiftForm({
  item,
  setEditItemId,
  onWishUpdated,
}: editWishFormProps) {
  const [formWishData, setFormWishData] = useState({
    title: item.title,
    description: item.description,
    webpage: item.webpage,
    image: item.image,
  });
  const apiURL = import.meta.env.VITE_SEREVER_ADDRESS;
  //Handles changes in the input fields. Checkes the name attribute to know which field is being typed in.
  function handleDataChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormWishData({
      ...formWishData,
      [name]: value,
    });
  }

  //Restores data to orginal state if user aborts the edit
  function handleCancel() {
    setFormWishData({
      title: item.title,
      description: item.description,
      webpage: item.webpage,
      image: item.image,
    });
    setEditItemId(null);
  }

  //Sends an update request to the server
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiURL}/wishItem/${item._id}`,
        formWishData
      );
      if (response) {
        onWishUpdated(response.data);
        setEditItemId(null);
      }
    } catch (error) {
      console.error("Fel vid uppdatering av önskan", error);
    }
  }

  return (
    <div className="gift-outer-container">
      <div className="card-edit-container">
        <Form
          method="POST"
          className="form-edit-container"
          onSubmit={handleSubmit}
        >
          <button className="form-edit-close" onClick={handleCancel}>
            Avbryt
          </button>
          <label htmlFor="title" className="gift-edit-label">
            Titel:
          </label>
          <input
            type="text"
            name="title"
            className="gift-form-title gift-edit-input"
            value={formWishData.title}
            onChange={handleDataChange}
          />
          <label htmlFor="description" className="gift-edit-label">
            Beskrivning
          </label>
          <textarea
            name="description"
            rows={6}
            cols={30}
            className="gift-form-edit-description"
            value={formWishData.description}
            onChange={handleDataChange}
          />
          <label htmlFor="webpage" className="gift-edit-label">
            Länk
          </label>
          <input
            type="text"
            name="webpage"
            className="gift-edit-url gift-edit-input"
            value={formWishData.webpage}
            onChange={handleDataChange}
          />
          <label htmlFor="image" className="gift-edit-label">
            Bild
          </label>
          <input
            type="text"
            name="image"
            className="gift-edit-image gift-edit-input"
            value={formWishData.image}
            onChange={handleDataChange}
          />
          <button type="submit" className="edit-gift-form-button">
            Uppdatera!
          </button>
        </Form>
      </div>
    </div>
  );
}
