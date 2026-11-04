import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Find an Author</h2>

    <form (ngSubmit)="findAuthor()">
      <label for="authorId">Author ID:</label>
      <input
        id="authorId"
        name="authorId"
        type="number"
        [(ngModel)]="authorId"
        required
      />
      <button type="submit">Search</button>
    </form>

    <p *ngIf="message">{{ message }}</p>

    <section *ngIf="author">
      <h3>{{ author.firstName }} {{ author.lastName }}</h3>
      <p>Author ID: {{ author.id }}</p>
    </section>
  `
})
export class AuthorsComponent {
  authorId: number | null = null;
  author: any = null;
  message = '';

  constructor(private http: HttpClient) {}

  findAuthor(): void {
    if (this.authorId === null) {
      this.message = 'Enter an author ID.';
      return;
    }

    this.author = null;
    this.message = '';

    this.http
      .get<any>(`http://localhost:8080/books-api/authors/${this.authorId}`)
      .subscribe({
        next: (result) => {
          this.author = result;
          this.message = '';
        },
        error: () => {
          this.message = 'Author not found.';
        }
      });
  }
}