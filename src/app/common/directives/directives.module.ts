import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { CSortableDirective } from "./sortable.directive";
import { CTrimDirective } from "./trim.directive";

@NgModule({
    declarations: [     
        CTrimDirective,
        CSortableDirective,
    ],
    exports: [   
        CTrimDirective,
        CSortableDirective,
    ],    
    providers: [
        NgModel,
    ]
})
export class CDirectivesModule {}
