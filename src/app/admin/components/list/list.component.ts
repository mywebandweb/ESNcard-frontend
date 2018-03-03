import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { MemberService } from '../../../services/member.service';
import { UserService } from '../../../services/user.service';
import { Member } from '../../../models/member';


@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [MemberService, UserService]
})
export class ListComponent implements OnInit{
  public title: string;
  public members: Member[];
  public token;
  public busqueda;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _memberService: MemberService,
    private _userService: UserService
  ){
    this.title = 'Listado';
    this.token = GLOBAL.getToken();
  }

  ngOnInit(){
    this.getMembers();
  }

  getMembers(){
    this._memberService.getMembers().subscribe(
      response => {
        if(!response.members){

        }else{
          this.members = response.members;
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  deleteMember(id){
    $('#myModal-'+id).modal('hide');
    this._memberService.deleteMember(this.token, id).subscribe(
      response => {
        if(!response.member){
          alert('Error en el servidor');
        }
        this.getMembers();
      },
      error => {
        alert('Error en el servidor');
      }
    )
  }
}
