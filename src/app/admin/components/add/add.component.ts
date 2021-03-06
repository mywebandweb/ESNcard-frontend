import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { MemberService } from '../../../services/member.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Member } from '../../../models/member';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  providers: [UserService, MemberService, UploadService]
})
export class AddComponent implements OnInit{
  public title: string;
  public member: Member;
  public identity;
  public token;
  public url: string;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _memberService: MemberService,
    private _uploadService: UploadService
  ){
    this.title = 'Añadir';
    this.member = new Member('','','','','','','','', false, '', '');
    this.identity = this._userService.getIdentity();
    this.token = GLOBAL.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('member-add component ha sido cargado!!');
  }

  onSubmit(){
    console.log(this.member);
    // Añadir Miembro en base de datos
    this._memberService.addMember(this.token, this.member).subscribe(
      response => {
        if(!response.member){
          this.status = 'error;'
        }else{
          this.status = 'success';
          this.member = response.member;

          // Subir la imagen del Miembro
          if(!this.filesToUpload){
            this._router.navigate(['/admin-panel/list']);
          }else{
            // Subida de la imagen
            this._uploadService.makeFileRequest(this.url+'upload-image-member/'+this.member._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.member.image = result.image;
              console.log(this.member);
              this._router.navigate(['/admin-panel/list']);
            });
          }
        }
      },
      error => {
          var errorMessage = <any>error;

          if(errorMessage != null){
            this.status = 'error';
          }
      }
    );
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
