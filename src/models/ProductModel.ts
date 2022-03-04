import { SizeEnum } from "services/enums/SizeEnum";

export type ProductModel = {
  id: string;
  name: string;
  description: string;
  image: string;
  size: SizeEnum;
  retailPrice: number;
  currency: string;
};
