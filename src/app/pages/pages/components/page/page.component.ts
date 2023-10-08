import { Component, Input } from '@angular/core';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';
import { CPage } from 'src/app/model/entities/page';
import { CPageWord } from 'src/app/model/entities/page.word';

@Component({
    selector: "the-page",
    templateUrl: "./page.component.html",
})
export class CPageComponent extends CSlugableEntityComponent<CPage> {      
    // words
    public wordsSortBy: string = "pos";
    public wordsSortDir: number = 1;     

    public wordsAdd(): void {
        const pos = this.x.words.length ? Math.max(...this.x.words.map(w => w.pos)) + 1 : 0;
        this.x.words.push(new CPageWord().init(pos, this.ll));
        this.appService.sort(this.x.words, this.wordsSortBy, this.wordsSortDir);
    }

    public wordsChangeSorting(wordsSortBy): void {
        if (wordsSortBy === this.wordsSortBy) {
            this.wordsSortDir *= -1;            
        } else {
            this.wordsSortBy = wordsSortBy;
            this.wordsSortDir = 1;
        }

        this.appService.sort(this.x.words, this.wordsSortBy, this.wordsSortDir);        
    }

    public wordsDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.words.splice(i, 1);            
        }        
    }
}
