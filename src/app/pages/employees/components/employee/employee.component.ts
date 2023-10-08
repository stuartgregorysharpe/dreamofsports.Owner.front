import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CEmployee } from 'src/app/model/entities/employee';

@Component({
    selector: "the-employee",
    templateUrl: "./employee.component.html",
})
export class CEmployeeComponent extends CEntityComponent<CEmployee> {}
