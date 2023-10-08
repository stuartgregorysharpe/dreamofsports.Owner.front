import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CFile } from 'src/app/model/entities/file';
import { CFileRepository } from 'src/app/common/services/repositories/file.repository';
import { CAppService } from 'src/app/common/services/app.service';

@Component({
	selector: 'files-create-page',
	templateUrl: './files.create.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CFilesCreatePage extends CEntityPage<CFile> implements OnInit {	
	public homeUrl: string = "/files";
	public requiredFields: string[] = ["mark", "fileurl"];	

	constructor(		
		protected fileRepository: CFileRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) {
		super(fileRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["files-head"]} - ${this.thelang.words["common-create"]}`); 
			this.x = new CFile().init();		
			this.appService.monitorLog("[files create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.mark = null;
		this.errors.fileurl = null;

		if (!this.x.mark) {
			this.errors.mark = "common-error-required";
			error = true;
		}

		if (!this.x.fileurl) {
			this.errors.fileurl = "common-error-required";
			error = true;
		}

		return !error;
	}
}
