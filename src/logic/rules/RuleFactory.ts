import { CampaignEnum } from "logic/enums/CampaignEnum";
import { AbstractRule } from "./AbstractRule";
import { GetXForYDealRule } from "./GetXForYDealRule";
import { PriceDropsRule } from "./PriceDropsRule";

export class RuleFactory {
  static getRule(campaign: CampaignEnum): AbstractRule | null {
    switch (campaign) {
      case CampaignEnum.GetXForYDeal:
        return new GetXForYDealRule();

      case CampaignEnum.PriceDrops:
        return new PriceDropsRule();

      default:
        return null;
    }
  }
}
