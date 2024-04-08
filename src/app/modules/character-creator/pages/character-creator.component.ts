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

    constructor(){
    }

    ngOnInit(){
    }

    enumParser(s: string){
        return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    zaWarudo(){

        this.generateRandomNumbers();

        this.calculateStats();
        this.calculatePassivePerception();
        this.showSkills();
        this.showProficiencies();
        this.showTraits();
        this.showCombat();

    }

    generateRandomNumbers(){
        let numbers: number[] = [];
        let sum = 0;

        const minSum = 30;
    
        for (let i = 0; i < 6; i++) {
            let num = Math.floor(Math.random() * 20) + 1;
            numbers.push(num);
            sum += num;
        }
    
        while (sum < minSum) {
            let index = Math.floor(Math.random() * numbers.length);
            
            if (numbers[index] < 20) {
                numbers[index]++;
                sum++;
            }
        }
          
        return numbers;
    }

    calculateStats(){

    }

    calculatePassivePerception(){
        
    }
    
    showSkills(){
        
    }
    
    showProficiencies(){
        
    }
    
    showTraits(){
        
    }

    showCombat(){

    }
    
}