import { useState } from "react";
import axios from "axios";
import { EditGiftForm } from "./EditGiftForm";
import { WishItem, WishListParentPropsCard } from "../interfaces/interface";
import gift from "../backgrounds/gift.png";
import "../css/giftCard.css";
export function Card({ wishItems, setWishItems }: WishListParentPropsCard) {
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const apiURL = import.meta.env.VITE_SEREVER_ADDRESS;
  //Sets id to useState to show the edit Form
  function editWish(id: string) {
    setEditItemId(id);
  }
  //Checks the updated wish and updates the wish that corrisponds with the id to update the state.
  const handleUpdateWish = (updatedWish: WishItem) => {
    setWishItems((prevWishes) =>
      prevWishes.map((wish) =>
        wish._id === updatedWish._id ? updatedWish : wish
      )
    );
  };

  async function deleteWish(id: string) {
    try {
      const response = await axios.delete(`${apiURL}/wishItem/${id}`);
      if (response) {
        setWishItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        setEditItemId(null);
      }
      console.log("önskningen är bortagen", response.data);
    } catch (error) {
      console.error("Fel vid bortagning av önskan", error);
    }
  }
  return (
    <>
      <div className="gift-outer-container">
        <div className="card-container">
          {wishItems.map((item) => (
            <div className="inner-card-container" key={item._id}>
              <img
                className="gift-display-image"
                src={item.image === "" ? gift : item.image}
              />
              {editItemId === item._id ? (
                <EditGiftForm
                  item={item}
                  setEditItemId={setEditItemId}
                  onWishUpdated={handleUpdateWish}
                />
              ) : (
                <>
                  <div className="gift-title">{item.title}</div>
                  <a className="gift-link" href={item.webpage} target="_blank">
                    Länk
                  </a>
                  <div className="gift-description">{item.description}</div>
                  <button
                    onClick={() => editWish(item._id)}
                    className="gift-edit-button"
                  >
                    Redigera
                  </button>
                  <button
                    onClick={() => deleteWish(item._id)}
                    className="gift-delete-button"
                  >
                    Ta bort
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
