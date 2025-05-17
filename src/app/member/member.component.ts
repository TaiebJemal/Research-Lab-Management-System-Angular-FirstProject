import { Component, OnInit } from '@angular/core';
import { Member } from 'src/Modeles/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmeDialogComponent } from '../confirme-dialog/confirme-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
  dataSource: Member[] = [];


  // injection de dependances
  constructor(private MS:MemberService,private dialog:MatDialog){}

  ngOnInit(){
    this.MS.GetAllMembers().subscribe((a)=>{
      this.dataSource=a
    })
  }
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'createdDate','icon'];
  delete(memberId: string): void {
    let dialogRef = this.dialog.open(ConfirmeDialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.MS.deleteMemberById(memberId).subscribe(()=>{
      
          this.MS.GetAllMembers().subscribe((a)=>{
            this.dataSource=a
          })
           
        });
      }
      console.log(`Dialog result: ${result}`); 
    });
    
    // dialogRef.close('Pizza!');
    
  }
  
}
