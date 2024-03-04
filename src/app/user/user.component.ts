import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { error } from 'console';
import { flip } from '@popperjs/core';
import { response } from 'express';
import { User } from '../module/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandle } from '../module/file-handle-model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService, private sanitizer: DomSanitizer ,private router:Router) {
    this.user = new User();
    this.user.userImages = [
      {
        file: new File([], 'filename'), 
        url: '',
        picByte: "/9j/6zLhSlD9AAAAAAAAADLXanVtYgAAAB5qdW1kYzJwYQARA",
        type: "image/jpeg",
      }
    ];
   }

ngOnInit(): void {
  this.loadUserProfile();
  
}

userProfile: any;

loadUserProfile() {
  this.userService.getUserProfile().subscribe(
    (userProfile) => {
      // console.log(userProfile);
      this.userProfile = userProfile;

      const firstImage = userProfile.userImages[1];
      this.user.userImages = [{
        file: new File([], 'filename'),
        url: '', 
        picByte: firstImage.picByte, 
        type: firstImage.type,
      }];
    },
    (error) => {
      console.error('Error retrieving user profile:', error);
    }
  );
}

  editMode: boolean = false;
  changeValue :any;
  editUserData(editUser:any){
    this.editMode = true;
    this.changeValue = editUser;
    // console.log(this.changeValue);
  }

  saveValue(){
    this.userService.updateUser(this.changeValue).subscribe(
      (updatedUser) => {
        console.log('User updated successfully:  ', updatedUser);
        // this.getAllUser();
        // this.changeValue = null;
        this.editMode=false;
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
    
  }
  cancel(){
    this.editMode=false;
    this.loadUserProfile();
  }

  // selectedImage ?:string;
  save:boolean = false;

  hasPic(): boolean {
    return this.user && this.user.userImages && this.user.userImages.length > 0;
  }
  
  selectedImageIndex: number = 0;
  loadImage?:any;
  onFileSelected(event: any): void {

    this.save=true;
    console.log('File selected:', event);
    this.loadImage = event.target.files.name
    const files: FileList = event.target.files;
    
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        
        if (file) {
          const fileHandle: FileHandle = {
            file: file,
            url: this.sanitizeUrl(window.URL.createObjectURL(file)),
            picByte: '',
            type: file.type,
          };
          this.user.userImages.push(fileHandle);
        //  console.log(this.user.userImages);
        this.loadImage = fileHandle.url;
     
        }
      }
    }
  }


  onSubmit(): void {
    this.save = false;
    const filesToUpload: File[] = this.user.userImages.map(fileHandle => fileHandle.file);
    // console.log(filesToUpload);
    this.userService.saveImages(filesToUpload)
      .subscribe(
        response => {
          console.log('Images uploaded successfully!', response);
          this.user.hasPic = true;

          // this.router.navigate(['/user']);

          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/user']);
          });
                  },
        error => {
          console.error('Error uploading images:', error);
        }
      );
  }

  private sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }



  hasProfilePhoto(): boolean {
    return this.user && this.user.userImages && this.user.userImages.length > 0;
  }

  nextImage(): void {
    if (this.user.userImages && this.user.userImages.length > 0) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.user.userImages.length;
    }
  }


  getImageSrc(image: any): SafeUrl {
    try {
      const base64String = image.picByte;
  
      if (/^[A-Za-z0-9+/=]+$/.test(base64String)) {
        const dataUrl = `data:${image.type};base64,${base64String}`;
  
        return this.sanitizer.bypassSecurityTrustUrl(dataUrl) as SafeUrl;
      } else {
        console.error('Invalid base64 string:', base64String);
        return this.loadImage;  
      }
    } catch (error) {
      console.error('Error decoding base64:', error);
      console.error('Base64 string that caused the error:', image.picByte);
      return '';  
    }
  }
  
  


}

