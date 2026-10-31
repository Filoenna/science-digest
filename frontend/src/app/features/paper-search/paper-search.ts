import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaperApiService } from '../../core/services/paper-api';
import { Paper, SimplePaper, FieldOfStudy, FIELDS_OF_STUDY } from '../../core/models/paper.model';


@Component({
  selector: 'app-paper-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paper-search.html',
  styleUrl: './paper-search.scss',
})
export class PaperSearch {
  private paperApiService = inject(PaperApiService);

  searchQuery = signal<string>('');
  selectedFields = signal<FieldOfStudy[]>([]);

  availableFields = signal<FieldOfStudy[]>(FIELDS_OF_STUDY);

  papers = signal<SimplePaper[]>([]);
  selectedPaper = signal<Paper | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  toggleFieldSelection(field: FieldOfStudy) {
    const currentSelection = this.selectedFields();
    if (currentSelection.includes(field)) {
      this.selectedFields.set(currentSelection.filter(f => f !== field));
    } else {
      this.selectedFields.set([...currentSelection, field]);
    }
  }

  onSearch(): void {
    if (!this.searchQuery().trim()) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.paperApiService.searchPapers({
      query: this.searchQuery(),
      fieldsOfStudy: this.selectedFields(),
    }).subscribe({
      next: (response) => {
        this.papers.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error fetching papers: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  selectPaper(paperId: string): void {
    this.isLoading.set(true);
    this.paperApiService.getPaperDetails(paperId).subscribe({
      next: (paper) => {
        this.selectedPaper.set(paper);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error fetching paper details: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

}
