import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlossaryRoutingModule } from './glossary-routing.module';
import {SharedModule} from "@shared/shared.module";
import { GlossaryComponent } from './pages/glossary/glossary.component';
import {DescriptiveGlossaryComponent} from "@shared/components/descriptive-glossary/descriptive-glossary.component";


@NgModule({
  declarations: [GlossaryComponent],
    imports: [
        CommonModule,
        GlossaryRoutingModule,
        SharedModule,
        DescriptiveGlossaryComponent
    ]
})
export class GlossaryModule { }
