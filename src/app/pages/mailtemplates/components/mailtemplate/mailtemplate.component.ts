import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CMailtemplate } from 'src/app/model/entities/mailtemplate';

@Component({
    selector: "the-mailtemplate",
    templateUrl: "./mailtemplate.component.html",
})
export class CMailtemplateComponent extends CEntityComponent<CMailtemplate> {}
