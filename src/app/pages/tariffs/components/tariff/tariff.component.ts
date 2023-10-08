import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CTariff } from 'src/app/model/entities/tariff';

@Component({
    selector: "the-tariff",
    templateUrl: "./tariff.component.html",
})
export class CTariffComponent extends CEntityComponent<CTariff> {}
