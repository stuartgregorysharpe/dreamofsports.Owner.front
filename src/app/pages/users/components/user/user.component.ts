import { Component } from '@angular/core';
import { CReward } from 'src/app/model/entities/reward';
import { CUser } from 'src/app/model/entities/user';
import { CUserEmail } from 'src/app/model/entities/user.email';
import { CUserLink } from 'src/app/model/entities/user.link';
import { CUserPhone } from 'src/app/model/entities/user.phone';
import { CUserSocial } from 'src/app/model/entities/user.social';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-user",
    templateUrl: "user.component.html",
})
export class CUserComponent extends CEntityComponent<CUser> {
    // rewards
    public rewardsSortBy: string = "date";
    public rewardsSortDir: number = -1;     

    public rewardsAdd(): void {
        this.x.athlet.rewards.push(new CReward().init(this.ll));
    }

    public rewardsChangeSorting(rewardsSortBy): void {
        if (rewardsSortBy === this.rewardsSortBy) {
            this.rewardsSortDir *= -1;            
        } else {
            this.rewardsSortBy = rewardsSortBy;
            this.rewardsSortDir = 1;
        }

        this.appService.sort(this.x.athlet.rewards, this.rewardsSortBy, this.rewardsSortDir);        
    }

    public rewardsDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.athlet.rewards.splice(i, 1);            
        }        
    }

    // phones
    public phonesSortBy: string = "pos";
    public phonesSortDir: number = 1;     

    public phonesAdd(): void {
        const pos = this.x.phones.length ? Math.max(...this.x.phones.map(w => w.pos)) + 1 : 0;
        this.x.phones.push(new CUserPhone().init(pos));
        this.appService.sort(this.x.phones, this.phonesSortBy, this.phonesSortDir);
    }

    public phonesChangeSorting(phonesSortBy): void {
        if (phonesSortBy === this.phonesSortBy) {
            this.phonesSortDir *= -1;            
        } else {
            this.phonesSortBy = phonesSortBy;
            this.phonesSortDir = 1;
        }

        this.appService.sort(this.x.phones, this.phonesSortBy, this.phonesSortDir);        
    }

    public phonesDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.phones.splice(i, 1);            
        }        
    }

    // emails
    public emailsSortBy: string = "pos";
    public emailsSortDir: number = 1;     

    public emailsAdd(): void {
        const pos = this.x.emails.length ? Math.max(...this.x.emails.map(w => w.pos)) + 1 : 0;
        this.x.emails.push(new CUserEmail().init(pos));
        this.appService.sort(this.x.emails, this.emailsSortBy, this.emailsSortDir);
    }

    public emailsChangeSorting(emailsSortBy): void {
        if (emailsSortBy === this.emailsSortBy) {
            this.emailsSortDir *= -1;            
        } else {
            this.emailsSortBy = emailsSortBy;
            this.emailsSortDir = 1;
        }

        this.appService.sort(this.x.emails, this.emailsSortBy, this.emailsSortDir);        
    }

    public emailsDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.emails.splice(i, 1);            
        }        
    }

    // links
    public linksSortBy: string = "pos";
    public linksSortDir: number = 1;     

    public linksAdd(): void {
        const pos = this.x.links.length ? Math.max(...this.x.links.map(w => w.pos)) + 1 : 0;
        this.x.links.push(new CUserLink().init(pos));
        this.appService.sort(this.x.links, this.linksSortBy, this.linksSortDir);
    }

    public linksChangeSorting(linksSortBy): void {
        if (linksSortBy === this.linksSortBy) {
            this.linksSortDir *= -1;            
        } else {
            this.linksSortBy = linksSortBy;
            this.linksSortDir = 1;
        }

        this.appService.sort(this.x.links, this.linksSortBy, this.linksSortDir);        
    }

    public linksDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.links.splice(i, 1);            
        }        
    }
    
    // socials
    public socialsSortBy: string = "pos";
    public socialsSortDir: number = 1;     

    public socialsAdd(): void {
        const pos = this.x.socials.length ? Math.max(...this.x.socials.map(w => w.pos)) + 1 : 0;
        this.x.socials.push(new CUserSocial().init(pos));
        this.appService.sort(this.x.socials, this.socialsSortBy, this.socialsSortDir);
    }

    public socialsChangeSorting(socialsSortBy): void {
        if (socialsSortBy === this.socialsSortBy) {
            this.socialsSortDir *= -1;            
        } else {
            this.socialsSortBy = socialsSortBy;
            this.socialsSortDir = 1;
        }

        this.appService.sort(this.x.socials, this.socialsSortBy, this.socialsSortDir);        
    }

    public socialsDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.socials.splice(i, 1);            
        }        
    }
}
