import { SafeUrl } from "@angular/platform-browser";


export interface FileHandle{
  // userImage:File
  file: File,
  url: SafeUrl
  picByte: string;
  type:string;
  
}