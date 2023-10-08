import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CMessage } from 'src/app/model/entities/message';

@Component({
    selector: "the-message",
    templateUrl: "./message.component.html",
})
export class CMessageComponent extends CEntityComponent<CMessage> {}
