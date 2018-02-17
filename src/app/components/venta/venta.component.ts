import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { MemberService } from '../../services/member.service';
import { UserService } from '../../services/user.service';
import { Member } from '../../models/member';

@Component({
  selector: 'venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers: [MemberService, UserService]
})
export class VentaComponent {
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
    this.title = 'Venta Tickets';
    this.token = this._userService.getToken();
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
