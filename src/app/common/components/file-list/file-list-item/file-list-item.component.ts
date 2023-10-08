import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TFileListType, IFileListElement } from "../file-list.model";
import { cfg } from "src/app/app.config";

@Component({
    selector: "[fl-item]",
    templateUrl: "file-list-item.component.html",
    styleUrls: ["file-list-item.component.scss"],
})
export class CFileListItemComponent implements OnChanges {
    @Input() public item: IFileListElement;
    @Input() public type: TFileListType;
    @Input() public folder: string;
    @Input() public supabase: boolean;
    public url: string = "";

    public ngOnChanges(changes: SimpleChanges): void {
        this.buildUrl();
    }

    private buildUrl(): void {        
        if (this.item.url instanceof File) {
            this.url = URL.createObjectURL(this.item.url);            
            return;
        }

        const root = this.supabase ? cfg.supabaseUrl : "";
        this.url = `${root}/${this.type}/${this.folder}/${this.item.url}`;
    }
}
