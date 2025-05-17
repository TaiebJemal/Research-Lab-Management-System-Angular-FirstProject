import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit{
  constructor(private MS:MemberService,private router:Router,private activatedRoute:ActivatedRoute){

  }
  form!:FormGroup

  ngOnInit(){
  // Initialiser le formulaire
  this.form = new FormGroup({
    cin: new FormControl(null),
    name: new FormControl(null),
    type: new FormControl(null),
    createdDate: new FormControl(null)
  });
    // 1. recuperer la route active
    const idCourant=this.activatedRoute.snapshot.params['id']
    if(idCourant){
      this.MS.getMemberByID(idCourant).subscribe((member)=>{
        // redirection vers le path home
        console.log('member',member)
        this.form.patchValue({
          cin: member.cin,
          name: member.name,
          type: member.type,
          createdDate: member.createdDate
        });
      });

    }else{
      this.form=new FormGroup({
        cin: new FormControl(null),
        name: new FormControl(null),
        type: new FormControl(null),
        createdDate:new FormControl(null)
    })

    }
    // 2. chercher id dans la route
    // 3. si id exsite => je suis dans edit => GetMemberByID()
    // 4. si id n'existe oas je suis dans create

    

  }
  onSub():void{
    console.log(this.form.value);
    const idCourant=this.activatedRoute.snapshot.params['id']
    if(idCourant){
      this.MS.updateMember(idCourant,this.form.value).subscribe(()=>{
        this.router.navigate([''])
      })
    }else{
    this.MS.addMember(this.form.value).subscribe(()=>{
      // redirection vers le path home

      this.router.navigate([''])
    });
  }
  }
}
