import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

@Component({
    selector: 'character-creator',
    templateUrl: './character-creator.component.html',
    styleUrls: ['./character-creator.component.scss']

})

export class CharacterCreatorComponent implements OnInit{
    race: string = "";
    class: string = "";
    alignment: string = "";
    background: string = "";
    
    name: string = "";

    constructor(){
    }

    ngOnInit(){}

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