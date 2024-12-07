export interface WishItem {
  _id: string;
  userName: string;
  title: string;
  description: string;
  webpage: string;
  image: string;
}

export interface editWishItem {
  isEdit: boolean;
  toggleEdit: (editStatus: boolean) => void;
}

export interface editWishFormProps {
  item: WishItem;
  onWishUpdated: (updatedWish: WishItem) => void;
  setEditItemId: (editItemId: string | null) => void;
}

export interface WishListParentPropsCard {
  wishItems: WishItem[];
  setWishItems: React.Dispatch<React.SetStateAction<WishItem[]>>;
  userName: string | undefined;
}
export interface WishListParentPropsForm {
  handleNewWish: (newWish: WishItem) => void;
}

export interface FormItems {
  title: string;
  description: string;
  webpage: string;
  image: string;
}
