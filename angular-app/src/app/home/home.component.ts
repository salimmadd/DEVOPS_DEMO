import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  usersList:User[]=[];

  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
      this.userService.getAllUsers().subscribe({
        next: (res) => {
          this.usersList = [];
          res.map(((obj: User) => {
            this.usersList.push(obj);
          }));
        },
        error: (error) => {
          console.error(error);
          const message = error?.error?.message ?? error?.message ?? 'Unable to load users.';
          alert(message);
        }
      });
  }

  addUser(firstname:string,lastname:string){
      this.userService.addUser(firstname,lastname).subscribe({
        next: () => window.location.reload(),
        error: (error) => {
          console.error(error);
          const message = error?.error?.message ?? error?.message ?? 'Unable to add user.';
          alert(message);
        }
      });
  }
  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe({
      next: () => window.location.reload(),
      error: (error) => {
        console.error(error);
        const message = error?.error?.message ?? error?.message ?? 'Unable to delete user.';
        alert(message);
      }
    });
  }


}
