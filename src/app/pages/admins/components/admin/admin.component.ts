import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CAdmin } from 'src/app/model/entities/admin';

@Component({
    selector: "the-admin",
    templateUrl: "./admin.component.html"
})
export class CAdminComponent extends CEntityComponent<CAdmin> {}
