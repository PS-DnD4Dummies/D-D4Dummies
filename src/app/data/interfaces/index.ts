import { Alignment, Class, Race, Skill } from "@data/enums/enum";

export interface User {
    uid:string,
    email:string,
    username:string,
    birthdate:string,
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
    subrace:string, //posible enum
    alignment:Alignment,
    backgroud:string, //posible enum (solo tiene un valor en la api)
    skills:Skill,
    abilityScore:AbilityScore,
    //proficiencies
    //
}

export interface AbilityScore {
    Charisma:number,
    Constitution:number,
    Dexterity:number,
    Inteligence:number,
    Strength:number,
    Wisdom:number
}