import { Component, OnInit } from '@angular/core';
import { CWord } from 'src/app/model/entities/word';
import { CWordbook } from 'src/app/model/entities/wordbook';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-wordbook",
    templateUrl: "./wordbook.component.html"
})
export class CWordbookComponent extends CEntityComponent<CWordbook> implements OnInit {
    // words
    public wordsSortBy: string = "pos";
    public wordsSortDir: number = 1;     

    public wordsAdd(): void {
        const pos = this.x.words.length ? Math.max(...this.x.words.map(w => w.pos)) + 1 : 0;
        this.x.words.push(new CWord().init(pos, this.ll));
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
