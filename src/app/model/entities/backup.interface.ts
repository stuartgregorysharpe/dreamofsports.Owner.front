import { IEntity } from "./_entity.interface";

export interface IBackup extends IEntity {
    filename: string;
    type: TBackupType;
    ready: boolean;
    created_at: string;
}

export type TBackupType = "files" | "db";
