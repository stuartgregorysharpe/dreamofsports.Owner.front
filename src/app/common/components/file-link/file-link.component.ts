import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "file-link",
    templateUrl: "file-link.component.html",
    styleUrls: ["file-link.component.scss"],
})
export class CFileLinkComponent implements OnChanges {
    @Input() fileurl: string | File;
    @Input() filename: string;
    @Input() filetype: string; // not used for now
    public url: string = null;

    public ngOnChanges(changes: SimpleChanges): void {
        this.url = this.fileurl ? 
            (this.fileurl instanceof File ? URL.createObjectURL(this.fileurl) : `/others/${this.fileurl}`) : 
            null;
    }
}