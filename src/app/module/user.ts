import { FileHandle } from "./file-handle-model";


export class User{
    [x: string]: any;

    public  userName:string='';
    public  firstName:string='';
    public  lastName:string='';
    public role:string='';
    public email:string='';
    public enable?:boolean ;
    public userImages: FileHandle[]=[];
    public hasPic:boolean = true;

}

  export interface UserModel{
    list: User[],
    userObj: User,
    errormessage: string
  }