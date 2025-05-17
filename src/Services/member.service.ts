import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';

// Decorateur qui permet d'indiquer que le service accepte d'etre injecté (utilisé) dans autre
// service ou dans un composant
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient){ }


  // fonction qui envoie une requete en mode GET vers le backend
  GetAllMembers():Observable<Member[]>
  {
    return this.http.get<Member[]>("http://localhost:3000/member")
  }
  addMember(member:Member): Observable<void> {
    return this.http.post<void>("http://localhost:3000/member", member);
  }
  deleteMemberById(memberId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/member/${memberId}`);
  }
  getMemberByID(memberId:string):Observable<Member>
  {
    return this.http.get<Member>(`http://localhost:3000/member/${memberId}`)
  }
  updateMember(memberId:string,member:Member):Observable<void>
  {
    return this.http.put<void>(`http://localhost:3000/member/${memberId}`, member)
  }
  
}
