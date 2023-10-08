import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CBan } from 'src/app/model/entities/ban';

@Component({
    selector: "the-ban",
    templateUrl: "./ban.component.html",
})
export class CBanComponent extends CEntityComponent<CBan> {}
