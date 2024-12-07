import { useState } from "react";
import { Form, useParams } from "react-router-dom";

import axios from "axios";
import { FormItems, WishListParentPropsForm } from "../interfaces/interface";
import "../css/giftForm.css";
export function GiftForm({ handleNewWish }: WishListParentPropsForm) {
  const [toggle, setToggle] = useState<boolean>(false);
  const { userName } = useParams<{ userName: string }>();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormItems>({
    title: "",
    description: "",
    webpage: "",
    image: "",
  });
  const apiURL = import.meta.env.VITE_SEREVER_ADDRESS;
  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleToggle() {
    setToggle((toggle) => !toggle);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.title === "") {
      setError("Titel behövs!");
      return;
    }

    setError(null);

    try {
      const response = await axios.post(`${apiURL}/wishes`, {
        userName,
        ...formData,
      });
      if (response) {
        handleNewWish(response.data);
        setFormData({ title: "", description: "", webpage: "", image: "" });
      }
      console.log("Önskingen har skickats till Jultomten.");
    } catch (error) {
      console.error(
        "Grinch har tagit över hemsidan för tillfället och stulit din önskan. Försök igen om ett litet tag.",
        error
      );
    }
  }

  return (
    <div className="gift-form-container">
      {toggle ? (
        <div className="gift-form-middle-container">
          <Form
            method="POST"
            className="form-container"
            onSubmit={handleSubmit}
          >
            <button className="form-close" onClick={handleToggle}>
              Stäng
            </button>
            <label htmlFor="title" className="gift-label">
              Titel:
            </label>
            <input
              type="text"
              name="title"
              className="gift-form-title gift-input"
              value={formData.title}
              onChange={handleInput}
            />
            {error && <div className="error-message">{error}</div>}{" "}
            {/* Felmeddelande */}
            <label htmlFor="description" className="gift-label">
              Beskrivning
            </label>
            <textarea
              name="description"
              rows={6}
              cols={30}
              className="gift-form-description"
              value={formData.description}
              onChange={handleInput}
            />
            <label htmlFor="webpage" className="gift-label">
              Länk
            </label>
            <input
              type="text"
              name="webpage"
              className="gift-url gift-input"
              value={formData.webpage}
              onChange={handleInput}
            />
            <label htmlFor="image" className="gift-label">
              Bild
            </label>
            <input
              type="text"
              name="image"
              className="gift-image gift-input"
              value={formData.image}
              onChange={handleInput}
            />
            <button type="submit" className="gift-button">
              Lägg Till!
            </button>
          </Form>
        </div>
      ) : (
        <button onClick={handleToggle} className="form-open-button">
          Lägg till en önskning
        </button>
      )}
    </div>
  );
}
