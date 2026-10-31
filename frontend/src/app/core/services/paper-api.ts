import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paper, SimplePaper, PaperSearchQuery, PaperSearchResponse, FieldOfStudy } from '../models/paper.model';

@Injectable({
    providedIn: 'root'
})

export class PaperApiService {
    private http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:8000/papers';

    searchPapers(query: PaperSearchQuery): Observable<PaperSearchResponse> {
        let params = new HttpParams().set('query', query.query);

        if (query.fieldsOfStudy && query.fieldsOfStudy.length > 0) {
            query.fieldsOfStudy.forEach(field => {
                params = params.append('fieldsOfStudy', field);
            });
        }

        if (query.limit) {
            params = params.set('limit', query.limit.toString());
        }

        return this.http.get<PaperSearchResponse>(`${this.baseUrl}/search/`, { params });
    }

    getPaperDetails(paperId: string): Observable<Paper> {
        return this.http.get<Paper>(`${this.baseUrl}/${paperId}/`);
    }
}