import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CComplaint } from 'src/app/model/entities/complaint';

@Component({
    selector: "the-complaint",
    templateUrl: "./complaint.component.html",
})
export class CComplaintComponent extends CEntityComponent<CComplaint> {}
