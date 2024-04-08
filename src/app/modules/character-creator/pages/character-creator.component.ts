import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Race, Class, Alignment, Background} from "@data/enums/enum";

@Component({
    selector: 'character-creator',
    templateUrl: './character-creator.component.html',
    styleUrls: ['./character-creator.component.scss']

})

export class CharacterCreatorComponent implements OnInit{
    enumRace = Object.values(Race); 
    enumClass = Object.values(Class); 
    enumAlignment = Object.values(Alignment); 
    enumBackground = Object.values(Background); 

    race: string = "";
    class: string = "";
    alignment: string = "";
    background: string = "";
    name: string = "";

    nombresYValores: [string, number][] = [
            ['Strength', 0],
            ['Dexterity', 0],
            ['Constitution', 0],
            ['Intelligence', 0],
            ['Wisdom', 0],
            ['Charisma', 0],
    ];
    
    stats = new Map<string, number>(this.nombresYValores);
    modifiers = new Map<string, number>(this.nombresYValores);
    savingThrows = new Map<string, number>(this.nombresYValores);
    
    passivePerception: number = 0;

    hitPoints: number = 0;
    armorClass: number = 0;
    initiative: number = 0;
    speed: number = 0;
    hitDice: string = "";

    constructor(){
    }

    ngOnInit(){
    }

    zaWarudo(){
        if (!this.checkFields()){
            return;
        }

        this.generateRandomNumbersForStats();
        this.calculateStats();
        this.calculatePassivePerception();
        this.calculateCombatStats();

        this.racesTweaks();
        this.classesTweaks();

    }

    checkFields(){
        if (this.race != "" && this.class != "" && this.alignment != "" && this.background != "" && this.name != ""){
            return true;
        }

        return false;
    }

    generateRandomNumbersForStats(){
        let sum = 0;
        const minSum = 50;
    
        let keysArray = Array.from(this.stats.keys());

        keysArray.forEach( (key) => {
            let num = Math.floor(Math.random() * 20) + 1;
            this.stats.set(key, num);
            sum += num; 
        })

        while (sum < minSum) {
            let index = Math.floor(Math.random() * keysArray.length); 
            let key = keysArray[index]; 
            let value = this.stats.get(key); 
        
            if (value !== undefined && value < 20) {
                this.stats.set(key, value + 1); 
                sum++; 
            }
        }
    }
    
    calculateModifyer(valor: number): number {
        if (valor < 1 || valor > 20) {
            throw new Error("El valor debe estar entre 1 y 20.");
        }

        return Math.floor((valor - 10) / 2);
    }

    calculateStats(){
        
        this.stats.forEach( (value, key) => {
            this.modifiers.set(key, this.calculateModifyer(value));  
        })

    }

    racesTweaks(){

        this.speed = 30;
        switch (this.race) {
            case "dragonborn":
                this.modifiers.set('Strength', 2 + (this.modifiers.get('Strength') ?? 0));
                this.modifiers.set('Charisma', 1 + (this.modifiers.get('Charisma') ?? 0));
                break;

            case "dwarf":
                this.modifiers.set('Constitution', 2 + (this.modifiers.get('Constitution') ?? 0));
                this.speed = 25;
                break;

            case "elf":
                this.modifiers.set('Dexterity', 2 + (this.modifiers.get('Dexterity') ?? 0));
                break;

            case "gnome":
                this.modifiers.set('Intelligence', 2 + (this.modifiers.get('Intelligence') ?? 0));
                this.speed = 25;
                break;

            case "half-elf":
                this.modifiers.set('Charisma', 2 + (this.modifiers.get('Charisma') ?? 0));
                break;

            case "half-orc":
                this.modifiers.set('Strength', 2 + (this.modifiers.get('Strength') ?? 0));
                this.modifiers.set('Constitution', 1 + (this.modifiers.get('Constitution') ?? 0));
                break;
            
            case "halfling":
                this.modifiers.set('Dexterity', 2 + (this.modifiers.get('Dexterity') ?? 0));
                this.speed = 25;
                break;

            case "human":
                this.modifiers.set('Strength', 1 + (this.modifiers.get('Strength') ?? 0));
                this.modifiers.set('Dexterity', 1 + (this.modifiers.get('Dexterity') ?? 0));
                this.modifiers.set('Constitution', 1 + (this.modifiers.get('Constitution') ?? 0));
                this.modifiers.set('Intelligence', 1 + (this.modifiers.get('Intelligence') ?? 0));
                this.modifiers.set('Wisdom', 1 + (this.modifiers.get('Wisdom') ?? 0));
                this.modifiers.set('Charisma', 1 + (this.modifiers.get('Charisma') ?? 0));
                break;
            
            case "tiefling":
                this.modifiers.set('Intelligence', 1 + (this.modifiers.get('Intelligence') ?? 0));
                this.modifiers.set('Charisma', 1 + (this.modifiers.get('Charisma') ?? 0));
                break;

            default:
              console.log("error");
        }
    }

    classesTweaks(){

        this.savingThrows = new Map(this.modifiers);

        switch (this.class) {
            case "barbarian":
                this.hitDice = "1d12";
                this.hitPoints = 12 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Strength') ?? 0));
                this.savingThrows.set('Constitution', 2 + (this.savingThrows.get('Constitution') ?? 0));
                break;

            case "bard":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));
                break;

            case "cleric":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));
                break;

            case "druid":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Intelligence', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                break;

            case "fighter":
                this.hitDice = "1d10";
                this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Strength') ?? 0));
                this.savingThrows.set('Constitution', 2 + (this.savingThrows.get('Constitution') ?? 0));
                break;

            case "monk":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Strength') ?? 0));
                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));
                break;
            
            case "paladin":
                this.hitDice = "1d10";
                this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));
                break;

            case "ranger":
                this.hitDice = "1d10";
                this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));
                break;
            
            case "rogue":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));
                this.savingThrows.set('Intelligence', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                break;
            
            case "sorcerer":
                this.hitDice = "1d6";
                this.hitPoints = 6 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Constitution', 2 + (this.savingThrows.get('Constitution') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));
                break;
            
            case "warlock":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));
                break;
            
            case "wizard":
                this.hitDice = "1d6";
                this.hitPoints = 6 + (this.modifiers.get('Constitution') ?? 0);
                this.savingThrows.set('Intelligence', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                break;

            default:
              console.log("error");
        }
    }

    calculatePassivePerception(){
        this.passivePerception = 10 + (this.modifiers.get('Wisdom') ?? 0);
    }

    calculateCombatStats(){
        this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);
        this.armorClass = 10 + (this.modifiers.get('Dexterity') ?? 0);
        this.initiative = (this.modifiers.get('Dexterity') ?? 0);
 
    }

    modifyerParse(modifyer: number | undefined){
        if (modifyer == undefined) modifyer = 0;
        return modifyer >= 0 ? "+" + modifyer : modifyer;
    }

    enumParser(s: string){
        return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

}