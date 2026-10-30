import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  usersList: User[] = [];
  searchTerm = '';
  firstName = '';
  lastName = '';
  isLoading = true;
  isSubmitting = false;
  deletingUserId: string | null = null;
  feedbackMessage = '';
  feedbackType: 'success' | 'error' = 'success';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get filteredUsers(): User[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return this.usersList;
    }

    return this.usersList.filter((user) =>
      `${user.firstName ?? ''} ${user.lastName ?? ''} ${user.id ?? ''}`
        .toLowerCase()
        .includes(query)
    );
  }

  getAllUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.usersList = users ?? [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.setFeedback(error?.error?.message ?? error?.message ?? 'Unable to load people.', 'error');
        this.isLoading = false;
      }
    });
  }

  addUser(form: NgForm): void {
    const firstName = this.firstName.trim();
    const lastName = this.lastName.trim();
    if (!firstName || !lastName || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.feedbackMessage = '';
    this.userService.addUser(firstName, lastName).subscribe({
      next: (user: User) => {
        this.usersList = [user, ...this.usersList];
        this.firstName = '';
        this.lastName = '';
        form.resetForm();
        this.setFeedback(`${firstName} ${lastName} was added.`, 'success');
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error(error);
        this.setFeedback(error?.error?.message ?? error?.message ?? 'Unable to add this person.', 'error');
        this.isSubmitting = false;
      }
    });
  }

  deleteUser(id: string): void {
    if (this.deletingUserId) {
      return;
    }

    this.deletingUserId = id;
    this.feedbackMessage = '';
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.usersList = this.usersList.filter((user) => String(user.id) !== id);
        this.setFeedback('Person removed from the directory.', 'success');
        this.deletingUserId = null;
      },
      error: (error) => {
        console.error(error);
        this.setFeedback(error?.error?.message ?? error?.message ?? 'Unable to remove this person.', 'error');
        this.deletingUserId = null;
      }
    });
  }

  private setFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }

}
