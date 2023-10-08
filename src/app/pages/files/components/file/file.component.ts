import { Component } from '@angular/core';
import { CFile } from 'src/app/model/entities/file';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-file",
    templateUrl: "./file.component.html"
})
export class CFileComponent extends CEntityComponent<CFile> {}
