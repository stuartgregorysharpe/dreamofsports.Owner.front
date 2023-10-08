import { NgModule } from '@angular/core';
import { CAppService } from './app.service';
import { CAuthGuard } from './guards/auth.guard';
import { CDataService } from './data.service';
import { CLangRepository } from './repositories/lang.repository';
import { CSettingRepository } from './repositories/setting.repository';
import { CUploadService } from './upload.service';
import { CAuthService } from './auth.service';
import { CThelangRepository } from './repositories/thelang.repository';
import { CAdminRepository } from './repositories/admin.repository';
import { CWordbookRepository } from './repositories/wordbook.repository';
import { CSlugService } from './slug.service';
import { CFileRepository } from './repositories/file.repository';
import { CBackupRepository } from './repositories/backup.repository';
import { CAdminGroupRepository } from './repositories/admin.group.repository';
import { CPageRepository } from './repositories/page.repository';
import { CMailtemplateRepository } from './repositories/mailtemplate.repository';
import { CEmployeeRepository } from './repositories/employee.repository';
import { CMessageRepository } from './repositories/message.repository';
import { CArticleRepository } from './repositories/article.repository';
import { CArticleCatRepository } from './repositories/article.cat.repository';
import { CCountryRepository } from './repositories/country.repository';
import { CCatRepository } from './repositories/cat.repository';
import { CUserRepository } from './repositories/user.repository';
import { CSocialRepository } from './repositories/social.repository';
import { CFavoriteRepository } from './repositories/favorite.repository';
import { CBanRepository } from './repositories/ban.repository';
import { CTariffRepository } from './repositories/tariff.repository';
import { CPaysystemRepository } from './repositories/paysystem.repository';
import { CPaymentRepository } from './repositories/payment.repository';
import { CStatRepository } from './repositories/stat.repository';
import { CComplaintRepository } from './repositories/complaint.repository';
import { CModerableImageRepository } from './repositories/moderable.image.repository';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        CAppService,
        CDataService,      
        CAuthService,
        CAuthGuard,      
        CUploadService,    
        CSlugService,
        // repo
        CThelangRepository,    
        CLangRepository,        
        CSettingRepository,   
        CAdminRepository,
        CAdminGroupRepository,
        CWordbookRepository,
        CFileRepository,
        CPageRepository,
        CBackupRepository,    
        CMailtemplateRepository,
        CEmployeeRepository,
        CMessageRepository,
        CArticleRepository,
        CArticleCatRepository,
        CCountryRepository,
        CCatRepository,
        CUserRepository,
        CSocialRepository,
        CFavoriteRepository,
        CBanRepository,
        CTariffRepository,
        CPaysystemRepository,
        CPaymentRepository,
        CStatRepository,
        CComplaintRepository,
        CModerableImageRepository,
    ],
})
export class CServicesModule {}
