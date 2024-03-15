export interface Field {
  key: string;
  label: string;
  value?: string;
}

export interface RaceInfo {
  age: string;
  alignment: string;
  size_description: string;
  language_desc: string;
  traits: [];
}

export interface AlignmentInfo {
  desc: string;
}

export interface WeaponInfo {
  category_range: string;
  range: [];
  weight: string;
}

export interface SpellInfo {
  desc: string;
  duration: string;
  range: string;
}

export interface ArmorInfo {
  armor_category?: string;
  stealth_disadvantage?: string
  weight?: string;
  desc?: string;
}

export interface ToolInfo {
  tool_category: string;
  desc: string;
  weight: string;
}

export interface AdventuringGearInfo {
  gear_category: [];
  desc: string;
  weight: string;
}
