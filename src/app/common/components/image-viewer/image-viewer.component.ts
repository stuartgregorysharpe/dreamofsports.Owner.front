import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "image-viewer",
    templateUrl: "image-viewer.component.html",
    styleUrls: [
        "image-viewer.component.scss",
        "../../styles/wins.scss",
    ],
})
export class CImageViewerComponent implements OnInit {
    @Input() url: string;
    @Input() type: "images" | "videos";
    @Input() active: boolean;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild("video", {static: false}) videoRef: ElementRef; 
    public unique: number = 0;

    constructor(private appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}

    public ngOnInit(): void {
        this.unique = this.appService.rndId();
    }

    public onClose(): void {
        this.activeChange.emit(false);
        this.type === "videos" && (this.videoRef.nativeElement as HTMLVideoElement).pause();
    }

    public onClick(event: PointerEvent): void {        
        if (this.active && !this.appService.pathHasIds(event.composedPath() as HTMLElement[], [`win-${this.unique}`])) {
            this.onClose();
        }
    }  
}
