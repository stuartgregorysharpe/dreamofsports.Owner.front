import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CModerableImage } from 'src/app/model/entities/moderable.image';
import { CAppService } from 'src/app/common/services/app.service';
import { CModerableImagesListService } from '../../services/moderable.images.list.service';
import { CModerableImageRepository } from 'src/app/common/services/repositories/moderable.image.repository';
import { CSomePage } from 'src/app/pages/some.page';
import { CChunk } from 'src/app/model/dto/chunk';
import { cfg } from 'src/app/app.config';

@Component({
	selector: 'moderable-images-list-page',
	templateUrl: './moderable.images.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CModerableImagesListPage extends CSomePage implements OnInit {    
    public homeUrl: string = "/moderation/moderable-images"; 
    public chunk: CChunk<CModerableImage> = new CChunk();
    public ready: boolean = false;
    public reloading: boolean = false;    
    public allSelected: boolean = false;   
    public viewerImg: string = "";
    public viewerActive: boolean = false;
    
    constructor(        
        protected moderableImageRepository: CModerableImageRepository, 
        protected appService: CAppService,        
        protected listService: CModerableImagesListService,  
    ) 
    {      
        super(appService);
    }   

    get part(): number {return this.listService.part;}
    set part(v: number) {this.listService.part = v;}
    get chunkLength(): number {return this.appService.options.chunkLength;}
    get elementsQuantity(): number {return this.chunk.elementsQuantity;}   
    get pagesQuantity(): number {return this.chunk.pagesQuantity;}    
    get xl(): CModerableImage[] {return this.chunk.data;}    
    get sortBy(): string {return this.listService.sortBy;}
    set sortBy(v: string) {this.listService.sortBy = v;}
    get sortDir(): number {return this.listService.sortDir;}
    set sortDir(v: number) {this.listService.sortDir = v;}    
    get supabaseUrl(): string {return cfg.supabaseUrl;}

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["moderable-images-head"]); 
            await this.initList();    
            this.appService.monitorLog("[moderable-images] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    

    public async initList(reloading: boolean = false): Promise<void> {
        try {
            this.reloading = reloading;
            this.allSelected = false; 
            this.chunk = await this.moderableImageRepository.loadChunk(this.part, this.chunkLength, this.sortBy, this.sortDir);
            this.appService.monitorLog(`data loaded, currentPart=${this.part}, sortBy=${this.sortBy}, sortDir=${this.sortDir}`);

            if (this.part > 0 && this.part > Math.ceil(this.elementsQuantity / this.chunkLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.part = 0;
                this.initList();
            } else {
                await this.appService.pause(500);
                this.reloading = false;               
            } 
        } catch (err) {
            this.appService.monitorLog(err, true);
            await this.appService.pause(500);
            this.reloading = false;
        }        
    }    

    public changeSorting(sortBy: string): void {
        if (this.sortBy === sortBy) {
            this.sortDir *= -1;
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.initList(true);
    }

    public onViewImg(x: CModerableImage): void {
        this.viewerImg = `${cfg.supabaseUrl}/images/users/${x.url}`;
        this.viewerActive = true;
    }
}

