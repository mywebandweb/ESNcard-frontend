import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit{
  public title: string;
  public user: User;
  public identity;
  public token;
  public url: string;
  public status;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.is_edit = true;
    this.title = 'Editar';
    this.user = new User('','','','','','','');
    this.identity = this._userService.getIdentity();
    this.token = GLOBAL.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('user-edit component ha sido cargado!!');
    this.getUser();
  }

  getUser(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._userService.getUser(id).subscribe(
        response => {
          if(!response.user){
            this._router.navigate(['/']);
          }else{
            this.user = response.user;
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
    var id = this.user._id;
    console.log(this.user);
    // Añadir Miembro en base de datos
    this._userService.editUser(this.token, id, this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.user = response.user;

          swal(
            'Actualizado!',
            'El socio ha sido actualizado.',
            'success'
          )

          // Subir la imagen del Miembro
          if(!this.filesToUpload){
            this._router.navigate(['/user', this.user._id]);
          }else{
            // Subida de la imagen
            this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.user.image = result.image;
              console.log(this.user);
              this._router.navigate(['/user', this.user._id]);
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
