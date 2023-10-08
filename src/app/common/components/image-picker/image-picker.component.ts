import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CUploadService } from "src/app/common/services/upload.service";
import { cfg } from "src/app/app.config";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "image-picker",
    templateUrl: "image-picker.component.html",
    styleUrls: ["image-picker.component.scss"],
})
export class CImagePickerComponent implements OnChanges {
    @Input() folder: string;
    @Input() error: boolean = false;
    @Input() supabase: boolean = false;
    @Input() img: string | File;
    @Output() imgChange: EventEmitter<File> = new EventEmitter();

    public innerError: boolean = false;
    public active: boolean = false;
    public viewerActive: boolean = false;
    public imgOut: string = null;

    constructor(
        private appService: CAppService,
        private uploadService: CUploadService,
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        this.buildImgOut();
    }

    get thelang(): IThelang {return this.appService.thelang;}

    private buildImgOut(): void {
        this.imgOut = this.img ? 
            (this.img instanceof File ? 
                URL.createObjectURL(this.img) : 
                (this.supabase ? `${cfg.supabaseUrl}/images/${this.folder}/${this.img}` : `/images/${this.folder}/${this.img}`)) : 
            null;
    }

    public async onSelect(): Promise<void> {
        try {
            this.innerError = false;
            this.imgChange.emit(await this.uploadService.selectFiles(false, "image") as File);            
        } catch (err) {
            this.innerError = true;
        }        
    }    

    public onDelete(): void {
        this.imgChange.emit(null);
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

    public onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.innerError = false;
        this.active = false;     
        const droppedFiles = event.dataTransfer.items ? 
            Array.from(event.dataTransfer.items).filter(item => item.kind === "file").map(item => item.getAsFile()) : 
            Array.from(event.dataTransfer.files);       
        const acceptedFiles = droppedFiles.filter(f => f.size <= cfg.maxImageFileSize && cfg.allowedImageTypes.includes(f.type)); 
        
        if (!acceptedFiles.length) {
            this.innerError = true;
            return;
        }

        this.imgChange.emit(acceptedFiles[0]);
    }
}