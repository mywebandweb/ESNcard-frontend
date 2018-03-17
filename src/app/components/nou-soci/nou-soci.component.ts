import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

import { GLOBAL } from '../../services/global';
import { MemberService } from '../../services/member.service';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Member } from '../../models/member';


import { AppComponent } from '../../app.component';

import {FormControl} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';

import * as moment from 'moment';

@NgModule({

  imports: [MatDatepickerModule],
  providers: [MatNativeDateModule]

})

@Component({
  selector: 'nou-soci',
  templateUrl: './nou-soci.component.html',
  styleUrls: [
      '../../../assets/css/form-orange.scss',
      './nou-soci.component.css',
      '../../../assets/css/matform.scss'
    ],
      providers: [UserService, MemberService, UploadService]
})

export class NouSociComponent implements OnInit {

  public title: string;
  public member: Member;
  public identity;
  public token;
  public url: string;
  public status;
  public is_edit;
  public id;

  genders = [
      {value: 'Male', viewValue: 'Hombre'},
      {value: 'Female', viewValue: 'Mujer'}
    ];


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _memberService: MemberService,
    private _uploadService: UploadService

  ){
    this.is_edit = true;
    this.title = 'Registrar';
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

          swal(
            'Creado!',
            'Has añadido un nuevo socio.',
            'success'
          )

          // Subir la imagen del Miembro
          if(!this.filesToUpload){
            //this._router.navigate(['/admin-panel/list']);
          }else{
            // Subida de la imagen
            this._uploadService.makeFileRequest(this.url+'upload-image-member/'+this.member._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.member.image = result.image;
              console.log(this.member);
              //this._router.navigate(['/admin-panel/list']);
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
