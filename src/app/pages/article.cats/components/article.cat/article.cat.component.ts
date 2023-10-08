import { Component } from '@angular/core';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';
import { CArticleCat } from 'src/app/model/entities/article.cat';

@Component({
    selector: "the-articlecat",
    templateUrl: "./article.cat.component.html",
})
export class CArticleCatComponent extends CSlugableEntityComponent<CArticleCat> {}
