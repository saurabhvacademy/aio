import { PdfReaderModule } from './pdf-reader.module';

describe('PdfReaderModule', () => {
  let pdfReaderModule: PdfReaderModule;

  beforeEach(() => {
    pdfReaderModule = new PdfReaderModule();
  });

  it('should create an instance', () => {
    expect(pdfReaderModule).toBeTruthy();
  });
});
