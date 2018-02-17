export class Member {
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public birth: string,
    public gender: string,
    public numberesncard: string,
    public comments: string,
    public conditions: boolean,
    public image: string,
    public user: string
  ){}
}
