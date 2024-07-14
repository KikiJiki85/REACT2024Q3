export interface ItemDetailsType {
  name: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  skinColor: string;
}

export interface OutletContext {
  closeDetails: () => void;
}
