import { TestBed } from '@angular/core/testing';

import { ArticleimagesizeService } from './articleimagesize.service';

describe('ArticleimagesizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleimagesizeService = TestBed.get(ArticleimagesizeService);
    expect(service).toBeTruthy();
  });
});
