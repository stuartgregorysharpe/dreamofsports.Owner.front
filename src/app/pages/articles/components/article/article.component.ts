import { Component } from '@angular/core';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';
import { CArticle } from 'src/app/model/entities/article';

@Component({
    selector: "the-article",
    templateUrl: "./article.component.html",
})
export class CArticleComponent extends CSlugableEntityComponent<CArticle> {}
