import { Component } from '@angular/core';
import { CSetting } from 'src/app/model/entities/setting';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-setting",
    templateUrl: "./setting.component.html",    
})
export class CSettingComponent extends CEntityComponent<CSetting> {}
