import { ItemModel } from "models/ItemModel";
import { PricingRule } from "../models/PricingRule";
import { RuleFactory } from "./rules/RuleFactory";

export class Checkout {
  private items: ItemModel[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  public add(item: ItemModel): void {
    this.items.push(item);
  }

  public total(): number {
    let total = 0;

    const groupedItems = this.groupItemsBySize();
    console.log("groupedItems", groupedItems);

    Object.values(groupedItems).forEach((groupItems) => {
      const item = groupItems[0];
      const pricingRules = this.pricingRules.filter(
        (pricingRule) =>
          pricingRule.customerId === item.customerId &&
          pricingRule.campaignParams.discountedSize === item.product.size
      );
      console.log("pricingRules", pricingRules);
      if (pricingRules.length === 0) {
        total += groupItems
          .map((item) => item.product.retailPrice * item.quantity)
          .reduce((total, current) => total + current);
      } else {
        pricingRules.forEach((pricingRule) => {
          const rule = RuleFactory.getRule(pricingRule.campaign);

          if (rule) {
            total += rule.calculate({
              ...pricingRule.campaignParams,
              items: groupItems,
            });
          }
        });
      }
    });

    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  private groupItemsBySize(): {
    [size: string]: ItemModel[];
  } {
    const items: { [size: string]: ItemModel[] } = {};

    this.items.forEach((item) => {
      const existing = items[item.product.size];

      if (!existing) {
        items[item.product.size] = [];
      }

      items[item.product.size].push(item);
    });

    return items;
  }
}
