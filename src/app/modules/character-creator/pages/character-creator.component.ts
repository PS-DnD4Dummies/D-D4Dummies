import { Component, ViewChild } from "@angular/core";
import { DiceComponent } from "@shared/components/dice/dice.component";
import { randomInt } from "crypto";

@Component({
    selector: 'character-creator',
    templateUrl: './character-creator.component.html',
    styleUrls: ['./character-creator.component.scss']

})

export class CharacterCreatorComponent{

    @ViewChild('diceComponent') diceComponent!: DiceComponent;


    constructor(){
        
    }

    callRollDice(){
        
        this.diceComponent.rollDice(20);
    }
}