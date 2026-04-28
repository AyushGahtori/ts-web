export interface TeamFrame {
  id: string;
  label: string;
  size: "small" | "medium" | "large";
}

export const centerTeamFrame: TeamFrame = {
  id: "prashant-highlight",
  label: "Featured",
  size: "large",
};

export const sideTeamFrames: TeamFrame[] = [
  { id: "team-1", label: "Member", size: "small" },
  { id: "team-2", label: "Member", size: "medium" },
  { id: "team-3", label: "Member", size: "medium" },
  { id: "team-4", label: "Member", size: "small" },
  { id: "team-5", label: "Member", size: "small" },
  { id: "team-6", label: "Member", size: "medium" },
  { id: "team-7", label: "Member", size: "small" },
];

export const customerLogoFrames = [
  { id: "customer-1", widthClass: "w-[220px]", heightClass: "h-[44px]" },
  { id: "customer-2", widthClass: "w-[183px]", heightClass: "h-[103px]", radiusClass: "rounded-[35px]" },
  { id: "customer-3", widthClass: "w-[167px]", heightClass: "h-[86px]", radiusClass: "rounded-[22px]" },
  { id: "customer-4", widthClass: "w-[212px]", heightClass: "h-[85px]", radiusClass: "rounded-[21px]" },
  { id: "customer-5", widthClass: "w-[222px]", heightClass: "h-[69px]", radiusClass: "rounded-[17px]" },
];

export const partnerLogoFrames = [
  { id: "partner-1", widthClass: "w-[243px]", heightClass: "h-[87px]", radiusClass: "rounded-[15px]" },
  { id: "partner-2", widthClass: "w-[186px]", heightClass: "h-[105px]" },
  { id: "partner-3", widthClass: "w-[160px]", heightClass: "h-[64px]" },
  { id: "partner-4", widthClass: "w-[197px]", heightClass: "h-[111px]" },
  { id: "partner-5", widthClass: "w-[185px]", heightClass: "h-[60px]", radiusClass: "rounded-[16px]" },
  { id: "partner-6", widthClass: "w-[109px]", heightClass: "h-[109px]" },
];
