import { ItemModel } from "models/ItemModel";
import { SizeEnum } from "services/enums/SizeEnum";
import { AbstractRule } from "./AbstractRule";

interface GetXForYDealRuleProps {
  items: ItemModel[];
  discountedSize: SizeEnum;
  xQuantity: number;
  yQuantity: number;
}

export class GetXForYDealRule implements AbstractRule {
  calculate(props: GetXForYDealRuleProps): number {
    const { items, xQuantity, yQuantity } = props;
    let finalPrice = 0;

    const quantity = items
      .map((item) => item.quantity)
      .reduce((total, current) => total + current);

    if (quantity < xQuantity) {
      return quantity * items[0].product.retailPrice;
    }

    const discountedTime = Math.floor(quantity / xQuantity);
    const discountCount = discountedTime * yQuantity;
    const nonDiscountCount = quantity % xQuantity;

    finalPrice +=
      (discountCount + nonDiscountCount) * items[0].product.retailPrice;

    return finalPrice;
  }
}
