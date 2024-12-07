import { useEffect, useRef, useState } from "react";
import { WishItem } from "../interfaces/interface";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GiftForm } from "./GiftForm";
import { Card } from "./Card";

export function WishListparent() {
  const { userName } = useParams<{ userName: string }>();
  const [wishItems, setWishItems] = useState<WishItem[]>([]);
  const apiURL = useRef(import.meta.env.VITE_SEREVER_ADDRESS);
  //Loads the users wishes from the server
  useEffect(() => {
    axios
      .get(`${apiURL}/wishItem/${userName}`)
      .then((res) => setWishItems(res.data))
      .catch((error) => {
        console.log("Inga önskningar finns", error);
      });
  }, [userName]);

  const handleNewWish = (newWish: WishItem) => {
    setWishItems([...wishItems, newWish]);
  };

  return (
    <>
      <GiftForm handleNewWish={handleNewWish} />
      {wishItems.length > 0 ? (
        <Card
          wishItems={wishItems}
          setWishItems={setWishItems}
          userName={userName}
        />
      ) : (
        <div className="empty-list">
          {userName} har inte lagt till några julklapps önskningar än!
        </div>
      )}
    </>
  );
}
