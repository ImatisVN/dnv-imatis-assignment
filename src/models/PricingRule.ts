import { CampaignEnum } from "logic/enums/CampaignEnum";

export type PricingRule = {
  customerId: string;
  campaign: CampaignEnum;
  campaignParams: any;
};
