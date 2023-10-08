import { Component, Input, ViewEncapsulation } from "@angular/core";
import { TFileListType, IFileListElement } from "./file-list.model";
import { cfg } from "src/app/app.config";
import { CAppService } from "../../services/app.service";
import { IThelang } from "src/app/model/entities/thelang";
import { CUploadService } from "../../services/upload.service";
import { CUserImage } from "src/app/model/entities/user.image";
import { CUserVideo } from "src/app/model/entities/user.video";
import { CUserOther } from "src/app/model/entities/user.other";

@Component({
    selector: "file-list",
    templateUrl: "file-list.component.html",
    styleUrls: ["file-list.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CFileListComponent {
    @Input() public data: IFileListElement[];
    @Input() public type: TFileListType;
    @Input() public folder: string;
    @Input() public supabase: boolean = false;
    public viewerImg: string = null;
    public viewerActive: boolean = false;
    public btnActive: boolean = false;

    constructor(
        private appService: CAppService,
        private uploadService: CUploadService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;}

    public itemUrl(item: IFileListElement): string {
        if (item.url instanceof File) return URL.createObjectURL(item.url);
        const root = this.supabase ? cfg.supabaseUrl : "";
        return `${root}/${this.type}/${this.folder}/${item.url}`;
    }    

    public onView(i: number): void {
        this.viewerImg = this.itemUrl(this.data[i]);
        this.viewerActive = true;
    }

    public onDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.data.splice(i, 1);
        }
    }

    public onDownload(i: number): void {
        const element = document.createElement("a");
        const url = this.itemUrl(this.data[i]);
        element.setAttribute("href", url);
        element.setAttribute("target", "_blank"); 
        element.click();
    }

    public onSelect(event: MouseEvent | TouchEvent): void {
        event.stopPropagation();
        if (event instanceof MouseEvent && event.button !== 0) return;
        this.type === "images" && this.loadImages();
        this.type === "videos" && this.loadVideos();
        this.type === "others" && this.loadOthers();
    }

    private async loadImages(): Promise<void> {
        try {
            const files = await this.uploadService.selectFiles(true, "image") as File[];

            for (let f of files) {
                const image = new CUserImage();
                image.url = f;
                image.pos = this.data.length ? Math.max(...this.data.map(d => d.pos)) + 1 : 0;
                this.data.push(image);
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    } 

    private async loadVideos(): Promise<void> {
        try {
            const files = await this.uploadService.selectFiles(true, "video") as File[];

            for (let f of files) {
                const video = new CUserVideo();
                video.url = f;
                video.pos = this.data.length ? Math.max(...this.data.map(d => d.pos)) + 1 : 0;
                this.data.push(video);
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    } 

    private async loadOthers(): Promise<void> {
        try {
            const files = await this.uploadService.selectFiles(true, "other") as File[];

            for (let f of files) {
                const other = new CUserOther();
                other.name = f.name;
                other.url = f;
                other.pos = this.data.length ? Math.max(...this.data.map(d => d.pos)) + 1 : 0;
                this.data.push(other);
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    } 

    public onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.btnActive = false;
        const droppedFiles = event.dataTransfer.items ? 
            Array.from(event.dataTransfer.items).filter(item => item.kind === "file").map(item => item.getAsFile()) : 
            Array.from(event.dataTransfer.files);       
        this.type === "images" && this.onDropImages(droppedFiles);
        this.type === "videos" && this.onDropVideos(droppedFiles);
        this.type === "others" && this.onDropOthers(droppedFiles);
    }

    private onDropImages(files: File[]): void {
        const acceptedFiles = files.filter(f => f.size <= cfg.maxImageFileSize && cfg.allowedImageTypes.includes(f.type)); 
        
        for (let f of acceptedFiles) {
            const image = new CUserImage();
            image.url = f;
            image.pos = this.data.length ? Math.max(...this.data.map(d => d.pos)) + 1 : 0;
            this.data.push(image);
        }
    }

    private onDropVideos(files: File[]): void {
        const acceptedFiles = files.filter(f => f.size <= cfg.maxVideoFileSize && cfg.allowedVideoTypes.includes(f.type)); 
        
        for (let f of acceptedFiles) {
            const video = new CUserVideo();
            video.url = f;
            video.pos = this.data.length ? Math.max(...this.data.map(d => d.pos)) + 1 : 0;
            this.data.push(video);
        }
    }

    private onDropOthers(files: File[]): void {
        const acceptedFiles = files.filter(f => f.size <= cfg.maxOtherFileSize); 
        
        for (let f of acceptedFiles) {
            const other = new CUserOther();
            other.name = f.name;
            other.url = f;
            other.pos = this.data.length ? Math.max(...this.data.map(d => d.pos)) + 1 : 0;
            this.data.push(other);
        }
    }

    public onDragOver(event: DragEvent): void {        
        event.preventDefault(); // by default we cant drop, just cancel this
        event.stopPropagation();
    }

    public onDragEnter(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.btnActive = true;
    }

    public onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.btnActive = false;
    }   
}