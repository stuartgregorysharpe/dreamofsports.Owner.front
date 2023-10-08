import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CSocial } from 'src/app/model/entities/social';

@Component({
    selector: "the-social",
    templateUrl: "./social.component.html",
})
export class CSocialComponent extends CEntityComponent<CSocial> {}
