import { Alignment, Class, Race, Skill, Background } from "@data/enums/enum";

export interface User {
    uid:string,
    email:string,
    username:string,
    birthdate:Date,
    photoURL:string
}

export interface LogInData {
    email:string
    password:string
}

export interface Character {
    name:string,
    class:Class,
    race:Race,
    alignment:Alignment,
    backgroud:Background, 

    skills:Skill,
    abilityScore:AbilityScore,

}

export interface AbilityScore {
    Charisma:number,
    Constitution:number,
    Dexterity:number,
    Inteligence:number,
    Strength:number,
    Wisdom:number
}



export interface BaseClass {
    name: string;
    description: string;
    hit_die: string;
    proficiency_choices: string;
    proficiencies: string;
    saving_throws: string;
    starting_equipment: string;
    starting_equipment_options: string;
    subclasses: string;
    spellcasting_ability?: string;
    cantrips?: string;
    spell_slots?: string;
    spells_known_of_1st_level_and_higher?: string;
    spellcasting_focus?: string;
}