import { ItemModel } from "models/ItemModel";
import { SizeEnum } from "services/enums/SizeEnum";
import { AbstractRule } from "./AbstractRule";

interface GetXForYDealRuleProps {
  items: ItemModel[];
  discountedSize: SizeEnum;
  discountPrice: number;
}

export class PriceDropsRule implements AbstractRule {
  calculate(props: GetXForYDealRuleProps): number {
    const { items, discountPrice } = props;
    let finalPrice = 0;

    const quantity = items
      .map((item) => item.quantity)
      .reduce((total, current) => total + current);

    finalPrice += quantity * discountPrice;

    return finalPrice;
  }
}
