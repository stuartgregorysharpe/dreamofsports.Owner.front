import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CFavorite } from 'src/app/model/entities/favorite';

@Component({
    selector: "the-favorite",
    templateUrl: "./favorite.component.html",
})
export class CFavoriteComponent extends CEntityComponent<CFavorite> {}
