import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Race, Class, Alignment, Background, Skill} from "@data/enums/enum";
import { RaceInfo } from "@data/interfaces/api_parameters";
import {DndApiService} from "@core/services/dnd-api/dnd-api.service";
import { FirestoreService } from "@core/services/firebase/firestore/firestore.service";

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
    enumSkill = Object.values(Skill);

    arrayArmors: string[] = ["Light armor", "Medium armor", "Heavy armor", "Shield"];
    arrayWeapons: string[] = [];
    arrayTools: string[] = [];
    arrayLanguages: string[] = [];

    race: string = "";
    class: string = "";
    alignment: string = "";
    background: string = "";
    name: string = "";

    armor: string = "";
    weapon: string = "";
    tool: string = "";
    language: string = "";

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

    skillsModifiers = new Map<string, number>();
    skillsOptions = new Map<string, number>();
    
    
    passivePerception: number = 0;

    hitPoints: number = 0;
    armorClass: number = 0;
    initiative: number = 0;
    speed: number = 0;
    hitDice: string = "0d0";

    numChecked: number = 0;
    maxCheck: number = 5;
    isChecked: boolean = false;
    isDisabled: boolean = false;

    proficiencies: string | any = "";
    feats: string | any = "";

    constructor(private dndApiService: DndApiService, private firestoreService:FirestoreService){
    }

    ngOnInit(){
        this.resetProficienciesArrays();
    }

    zaWarudo(){

        if (!this.checkFields()){
            return;
        }

        this.getProficienciesFromFirestore();
        this.getFeatsFromAPI();
        
        this.generateRandomNumbersForStats();
        this.calculateModifiersAndSavingThrows();

        this.restartSkillOptions();

        this.racesTweaks();
        this.classesTweaks();
        
        this.calculatePassivePerception();
        this.calculateCombatStats();
        
    }

    checkFields(){
        if (this.race != "" && this.class != "" && this.alignment != "" && this.background != "" && this.name != ""){
            return true;
        }

        return false;
    }


    
    //----- BASIC STAT CALCULATIONS -----
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

    calculateModifiersAndSavingThrows(){
        
        this.stats.forEach( (value, key) => {
            this.modifiers.set(key, this.calculateModifyer(value));  
            this.savingThrows.set(key, this.calculateModifyer(value)); 
        })

    }

    calculatePassivePerception(){
        this.passivePerception = 10 + (this.modifiers.get('Wisdom') ?? 0);
    }

    calculateCombatStats(){
        this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);
        this.armorClass = 10 + (this.modifiers.get('Dexterity') ?? 0);
        this.initiative = (this.modifiers.get('Dexterity') ?? 0);
 
    }


    //----- USER CHOICE TWEAKS -----
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

        this.setSkillsModifiers();
    }

    classesTweaks(){
        switch (this.class) {
            case "barbarian":
                this.hitDice = "1d12";
                this.hitPoints = 12 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Strength') ?? 0));
                this.savingThrows.set('Constitution', 2 + (this.savingThrows.get('Constitution') ?? 0));

                this.skillsOptions.set(Skill.Perception, 0);
                this.skillsOptions.set(Skill.Intimidation, 0);
                this.skillsOptions.set(Skill.Survival, 0);
                this.skillsOptions.set(Skill.Animal_handling, 0);
                this.skillsOptions.set(Skill.Athletics, 0);
                this.skillsOptions.set(Skill.Nature, 0);
                this.maxCheck = 2;
                
                break;

            case "bard":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));

                this.enumSkill.forEach(skill =>{ this.skillsOptions.set(skill, 0); })
                this.maxCheck = 3;
                
                break;

            case "cleric":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));
                
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Medicine, 0);
                this.skillsOptions.set(Skill.History, 0);
                this.skillsOptions.set(Skill.Persuasion, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.maxCheck = 2;
                
                break;

            case "druid":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Intelligence', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));

                this.skillsOptions.set(Skill.Arcana, 0);
                this.skillsOptions.set(Skill.Animal_handling, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Medicine, 0);
                this.skillsOptions.set(Skill.Nature, 0);
                this.skillsOptions.set(Skill.Perception, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.skillsOptions.set(Skill.Survival, 0);
                this.maxCheck = 2;
                
                break;

            case "fighter":
                this.hitDice = "1d10";
                this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Strength') ?? 0));
                this.savingThrows.set('Constitution', 2 + (this.savingThrows.get('Constitution') ?? 0));

                this.skillsOptions.set(Skill.Acrobatics, 0);
                this.skillsOptions.set(Skill.Animal_handling, 0);
                this.skillsOptions.set(Skill.Athletics, 0);
                this.skillsOptions.set(Skill.History, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Intimidation, 0);
                this.skillsOptions.set(Skill.Perception, 0);
                this.skillsOptions.set(Skill.Survival, 0);
                this.maxCheck = 2;
                
                break;

            case "monk":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Strength') ?? 0));
                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));

                this.skillsOptions.set(Skill.Acrobatics, 0);
                this.skillsOptions.set(Skill.Athletics, 0);
                this.skillsOptions.set(Skill.History, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.skillsOptions.set(Skill.Stealth, 0);
                this.maxCheck = 2;

                break;
            
            case "paladin":
                this.hitDice = "1d10";
                this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));

                this.skillsOptions.set(Skill.Athletics, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Intimidation, 0);
                this.skillsOptions.set(Skill.Medicine, 0);
                this.skillsOptions.set(Skill.Persuasion, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.maxCheck = 2;

                break;

            case "ranger":
                this.hitDice = "1d10";
                this.hitPoints = 10 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Strength', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));

                this.skillsOptions.set(Skill.Animal_handling, 0);
                this.skillsOptions.set(Skill.Athletics, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Investigation, 0);
                this.skillsOptions.set(Skill.Nature, 0);
                this.skillsOptions.set(Skill.Perception, 0);
                this.skillsOptions.set(Skill.Stealth, 0);
                this.skillsOptions.set(Skill.Survival, 0);
                this.maxCheck = 3;

                break;
            
            case "rogue":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Dexterity', 2 + (this.savingThrows.get('Dexterity') ?? 0));
                this.savingThrows.set('Intelligence', 2 + (this.savingThrows.get('Intelligence') ?? 0));

                this.skillsOptions.set(Skill.Acrobatics, 0);
                this.skillsOptions.set(Skill.Athletics, 0);
                this.skillsOptions.set(Skill.Deception, 0);
                this.skillsOptions.set(Skill.Deception, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Intimidation, 0);
                this.skillsOptions.set(Skill.Investigation, 0);
                this.skillsOptions.set(Skill.Perception, 0);
                this.skillsOptions.set(Skill.Performance, 0);
                this.skillsOptions.set(Skill.Persuasion, 0);
                this.skillsOptions.set(Skill.Sleight_of_hand, 0);
                this.skillsOptions.set(Skill.Stealth, 0);
                this.maxCheck = 4;
                
                break;
            
            case "sorcerer":
                this.hitDice = "1d6";
                this.hitPoints = 6 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Constitution', 2 + (this.savingThrows.get('Constitution') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));

                this.skillsOptions.set(Skill.Arcana, 0);
                this.skillsOptions.set(Skill.Deception, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Intimidation, 0);
                this.skillsOptions.set(Skill.Persuasion, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.maxCheck = 2;
                
                break;
            
            case "warlock":
                this.hitDice = "1d8";
                this.hitPoints = 8 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));
                this.savingThrows.set('Charisma', 2 + (this.savingThrows.get('Charisma') ?? 0));

                this.skillsOptions.set(Skill.Arcana, 0);
                this.skillsOptions.set(Skill.Deception, 0);
                this.skillsOptions.set(Skill.History, 0);
                this.skillsOptions.set(Skill.Intimidation, 0);
                this.skillsOptions.set(Skill.Investigation, 0);
                this.skillsOptions.set(Skill.Nature, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.maxCheck = 2;
                
                break;
            
            case "wizard":
                this.hitDice = "1d6";
                this.hitPoints = 6 + (this.modifiers.get('Constitution') ?? 0);

                this.savingThrows.set('Intelligence', 2 + (this.savingThrows.get('Intelligence') ?? 0));
                this.savingThrows.set('Wisdom', 2 + (this.savingThrows.get('Wisdom') ?? 0));

                this.skillsOptions.set(Skill.Arcana, 0);
                this.skillsOptions.set(Skill.History, 0);
                this.skillsOptions.set(Skill.Insight, 0);
                this.skillsOptions.set(Skill.Investigation, 0);
                this.skillsOptions.set(Skill.Medicine, 0);
                this.skillsOptions.set(Skill.Religion, 0);
                this.maxCheck = 2;

                break;

            default:
              console.log("error");
        }

        this.disableNotUsedAndMarkUsed();
        this.changeSkillLabel();
    }

    disableNotUsedAndMarkUsed(){
        this.enumSkill.forEach( (skill) => {
            if(this.skillsOptions.has(skill)){
                const checkbox = document.querySelector("." + skill) as HTMLInputElement;
                checkbox.disabled = false;
                
                const box = document.querySelector(".skill-type-" + skill) as HTMLInputElement;
                box.classList.add('marked');
            }
        })
    }

    changeSkillLabel(){
        const label = document.querySelector('.skills__place-name')
        if (label != null){ label.classList.add('marked-label'); label.textContent = "Choose " + this.maxCheck + " Skills!"; } 
    }



    //----- SKILLS RELATED -----
    setSkillsModifiers(){
        this.skillsModifiers.set("acrobatics", (this.modifiers.get('Dexterity') ?? 0));
        this.skillsModifiers.set("animal-handling", (this.modifiers.get('Wisdom') ?? 0));
        this.skillsModifiers.set("arcana", (this.modifiers.get('Intelligence') ?? 0));
        this.skillsModifiers.set("athletics", (this.modifiers.get('Strength') ?? 0));
        this.skillsModifiers.set("deception", (this.modifiers.get('Charisma') ?? 0));
        this.skillsModifiers.set("history", (this.modifiers.get('Intelligence') ?? 0));
        this.skillsModifiers.set("insight", (this.modifiers.get('Wisdom') ?? 0));
        this.skillsModifiers.set("intimidation", (this.modifiers.get('Charisma') ?? 0));
        this.skillsModifiers.set("investigation", (this.modifiers.get('Intelligence') ?? 0));
        this.skillsModifiers.set("medicine", (this.modifiers.get('Wisdom') ?? 0));
        this.skillsModifiers.set("nature", (this.modifiers.get('Intelligence') ?? 0));
        this.skillsModifiers.set("perception", (this.modifiers.get('Wisdom') ?? 0));
        this.skillsModifiers.set("performance", (this.modifiers.get('Charisma') ?? 0));
        this.skillsModifiers.set("persuasion", (this.modifiers.get('Charisma') ?? 0));
        this.skillsModifiers.set("religion", (this.modifiers.get('Intelligence') ?? 0));
        this.skillsModifiers.set("sleight-of-hand", (this.modifiers.get('Dexterity') ?? 0));
        this.skillsModifiers.set("stealth", (this.modifiers.get('Dexterity') ?? 0));
        this.skillsModifiers.set("survival", (this.modifiers.get('Wisdom') ?? 0));
    }
    
    restartSkillOptions(){
        let keysArray = Array.from(this.skillsOptions.keys());

        console.log(keysArray);

        if(keysArray.length == 0) return;

        keysArray.forEach( (key) => {
            const checkbox = document.querySelector("." + key) as HTMLInputElement;
            checkbox.checked = false;
            checkbox.disabled = true;
            
            const box = document.querySelector(".skill-type-" + key) as HTMLInputElement;
            box.classList.remove('marked');
        })

        this.maxCheck = 0;
        this.numChecked = 0;
        this.skillsOptions.clear();

        const label = document.querySelector('.skills__place-name');
        if (label != null){ label.classList.remove('marked-label'); label.textContent = "Skills"; }  
        
    }

    checkboxManager(skill: string){

        const checkbox = document.querySelector("." + skill) as HTMLInputElement;

        if (!checkbox.checked) {
            this.deleteCompetence(skill);

            this.skillsOptions.set(skill, 0);

            this.numChecked--;

        } else {
            this.giveCompetence(skill);

            this.skillsOptions.set(skill, 1);

            this.numChecked++;
        }

        if (this.numChecked >= this.maxCheck){
            this.isDisabled = true;

            this.disableCheckboxes();

        } else if (this.isDisabled) {
            this.isDisabled = false;

            this.enableCheckboxes();
        }
    }

    giveCompetence(skill: string){
        this.skillsModifiers.set(skill, (this.skillsModifiers.get(skill) ?? 0) + 2);
    }

    deleteCompetence(skill: string){
        this.skillsModifiers.set(skill, (this.skillsModifiers.get(skill) ?? 0) - 2);
    }

    enableCheckboxes(){
        let keysArray = Array.from(this.skillsOptions.keys());
        let helper;
        let box;

        keysArray.forEach( (key) => {
            if (!this.skillsOptions.get(key)){
                helper = document.querySelector("." + key) as HTMLInputElement;
                helper.disabled = false;

                box = document.querySelector(".skill-type-" + key) as HTMLInputElement;
                box.classList.add('marked');
            }
        })

        const label = document.querySelector('.skills__place-name')
        if (label != null){ label.classList.add('marked-label'); label.textContent = "Choose " + this.maxCheck + " Skills!"; } 
    }

    disableCheckboxes(){
        let keysArray = Array.from(this.skillsOptions.keys());
        let helper;
        let box;

        keysArray.forEach( (key) => {
            if (!this.skillsOptions.get(key)){
                helper = document.querySelector("." + key) as HTMLInputElement;
                helper.disabled = true;

                box = document.querySelector(".skill-type-" + key) as HTMLInputElement;
                box.classList.remove('marked');
            }
        })

        const label = document.querySelector('.skills__place-name')
        if (label != null){ label.classList.remove('marked-label'); label.textContent = "Done!"; } 
    }


    //----- PROFICIENCIES RELATED -----
    resetProficienciesArrays(){
        this.arrayTools = [];
        this.arrayLanguages = [];
    }

    getProficienciesFromFirestore(){
        this.firestoreService.readClass((this.class).toLowerCase()).then(baseClass => {
            this.proficiencies = baseClass?.proficiencies.replace(/ \\n/g, ", ");
            this.proficiencies = this.proficiencies.replace("- ", "");

            this.dndApiService.getRace(this.race).subscribe((data: RaceInfo) => {
                (data as {languages: {name: string}[]}).languages.forEach(element => {
                    this.proficiencies = this.proficiencies + ", " + element.name;
                  });

                console.log(this.proficiencies);
            });

            
        });
    }

    getFeatsFromAPI(){
        this.dndApiService.getRace(this.race).subscribe((data: RaceInfo) => {
            (data as {traits: {name: string}[]}).traits.forEach(element => {
                this.feats = this.feats + ", " + element.name;
            });

            this.feats = this.feats.replace(", ", "");

            console.log(this.feats);
        });

    }
    


    //----- DATA PARSERS -----
    modifyerParse(modifyer: number | undefined){
        if (modifyer == undefined) modifyer = 0;
        return modifyer >= 0 ? "+" + modifyer : modifyer;
    }

    enumParser(s: string){
        return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

}