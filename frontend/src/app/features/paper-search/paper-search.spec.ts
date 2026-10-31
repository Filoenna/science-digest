import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperSearch } from './paper-search';

describe('PaperSearch', () => {
  let component: PaperSearch;
  let fixture: ComponentFixture<PaperSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(PaperSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
