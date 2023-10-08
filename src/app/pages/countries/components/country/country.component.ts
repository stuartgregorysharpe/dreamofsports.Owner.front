import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CCountry } from 'src/app/model/entities/country';

@Component({
    selector: "the-country",
    templateUrl: "./country.component.html",
})
export class CCountryComponent extends CEntityComponent<CCountry> {}
