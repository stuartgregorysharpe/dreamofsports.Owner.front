export interface IFileListElement {
    url: string | File;
    name?: string;
    pos: number;
}

export type TFileListType = "images" | "videos" | "others";
