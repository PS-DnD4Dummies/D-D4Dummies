import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlossaryRoutingModule } from './glossary-routing.module';
import { SharedModule } from "@shared/shared.module";
import { GlossaryComponent } from './pages/glossary/glossary.component';
import {DescriptiveGlossaryComponent} from "@modules/glossary/components/descriptive-glossary/descriptive-glossary.component";
import { components } from './components';



@NgModule({
  declarations: [GlossaryComponent, ...components],
    imports: [
        CommonModule,
        GlossaryRoutingModule,
        SharedModule,
    ]
})
export class GlossaryModule {}
