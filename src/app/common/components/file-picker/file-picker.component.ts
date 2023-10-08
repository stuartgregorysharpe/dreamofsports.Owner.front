import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CUploadService } from "src/app/common/services/upload.service";
import { cfg } from "src/app/app.config";
import { IThelang } from "src/app/model/entities/thelang";
import { CFile } from "src/app/model/entities/file";

@Component({
    selector: "file-picker",
    templateUrl: "file-picker.component.html",
    styleUrls: ["file-picker.component.scss"],
})
export class CFilePickerComponent {
    @Input() file: CFile; 
    @Input() error: boolean = false;
    public innerError: boolean = false;
    public active: boolean = false;
    
    constructor(
        private appService: CAppService,
        private uploadService: CUploadService,        
    ) {}       
    
    get thelang(): IThelang {return this.appService.thelang;}     

    public async onSelect(): Promise<void> {
        try {
            this.innerError = false;
            const upload = await this.uploadService.selectFiles(false, "any") as File;
            this.file.filename = upload.name;
            this.file.filetype = upload.type;
            this.file.fileurl = upload;
        } catch (err) {
            this.innerError = true;
        }
    }

    public onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.innerError = false;
        this.active = false;        
        const droppedFiles = event.dataTransfer.items ? 
            Array.from(event.dataTransfer.items).filter(item => item.kind === "file").map(item => item.getAsFile()) : 
            Array.from(event.dataTransfer.files);        
        const acceptedFiles = droppedFiles.filter(f => f.size <= cfg.maxOtherFileSize);    
            
        if (!acceptedFiles.length) {
            this.innerError = true;
            return;
        }

        const upload = acceptedFiles[0];
        this.file.filename = upload.name;
        this.file.filetype = upload.type;
        this.file.fileurl = upload;        
    }

    public onDragOver(event: DragEvent): void {        
        event.preventDefault(); // by default we cant drop, just cancel this
        event.stopPropagation();
    }

    public onDragEnter(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.active = true;
    }

    public onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.active = false;
    }    
}