import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { MemberService } from '../../../services/member.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Member } from '../../../models/member';

@Component({
  selector: 'admin-edit',
  templateUrl: './edit.component.html',
  providers: [UserService, MemberService, UploadService]
})
export class EditComponent implements OnInit{
  public title: string;
  public member: Member;
  public identity;
  public token;
  public url: string;
  public status;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _memberService: MemberService,
    private _uploadService: UploadService
  ){
    this.is_edit = true;
    this.title = 'Editar';
    this.member = new Member('','','','','','','','', false, '', '');
    this.identity = this._userService.getIdentity();
    this.token = GLOBAL.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('member-add component ha sido cargado!!');
    this.getMember();
  }

  getMember(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._memberService.getMember(id).subscribe(
        response => {
          if(!response.member){
            this._router.navigate(['/']);
          }else{
            this.member = response.member;
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/']);
        }
      );
    });
  }

  onSubmit(){
    var id = this.member._id;
    console.log(this.member);
    // Añadir Miembro en base de datos
    this._memberService.editMember(this.token, id, this.member).subscribe(
      response => {
        if(!response.member){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.member = response.member;

          // Subir la imagen del Miembro
          if(!this.filesToUpload){
            //this._router.navigate(['/member', this.member._id]);
          }else{
            // Subida de la imagen
            this._uploadService.makeFileRequest(this.url+'upload-image-member/'+this.member._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.member.image = result.image;
              console.log(this.member);
              //this._router.navigate(['/member', this.member._id]);
            });
          }
        }
      },
      error => {
          var errorMessage = <any>error;

          if(errorMessage !=null){
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
