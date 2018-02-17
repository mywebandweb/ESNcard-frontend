import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';


@Component({
  selector: 'member-detail',
  templateUrl: './member-detail.component.html',
  providers: [MemberService]
})
export class MemberDetailComponent implements OnInit{
  public member: Member[];
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _memberService: MemberService
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('member-detail componente cargado !!');
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
}
