import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CFile } from 'src/app/model/entities/file';
import { CFileRepository } from 'src/app/common/services/repositories/file.repository';
import { CAppService } from 'src/app/common/services/app.service';

@Component({
	selector: 'files-edit-page',
	templateUrl: './files.edit.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CFilesEditPage extends CEntityPage<CFile> implements OnInit {	
	public homeUrl: string = "/files";
	public requiredFields: string[] = ["mark", "fileurl"];	

	constructor(		
		protected fileRepository: CFileRepository,
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(fileRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {		
			this.appService.setTitle(`${this.thelang.words["files-head"]} - ${this.thelang.words["common-edit"]}`); 		
			this.x = await this.fileRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[files edit] page loaded");
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
