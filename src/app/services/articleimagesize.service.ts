import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleimagesizeService {
  aritcleImageParentNodeWidth = null;
  aritcleImageParentNodeHeight = null;
  articleImageWidth = null;
  articleImageHeight = null;
  ImgRatio = null;
  constructor() { }

  findArticleImageService(pWidth, phight, iWidth, iHeight) {

      this.aritcleImageParentNodeWidth = pWidth;
      this.aritcleImageParentNodeHeight = phight;
      this.articleImageWidth = iWidth;
      this.articleImageHeight = iHeight;
      this.ImgRatio = (this.articleImageWidth / this.articleImageHeight);

      if ((this.articleImageWidth <= this.aritcleImageParentNodeWidth) && (this.articleImageHeight <= this.aritcleImageParentNodeHeight)) {
          return 1;

      } else if ((this.articleImageWidth <= this.aritcleImageParentNodeWidth) && (this.articleImageHeight >= this.aritcleImageParentNodeHeight)) {
        return 2;
      } else if ((this.articleImageWidth >= this.aritcleImageParentNodeWidth) && (this.articleImageHeight <= this.aritcleImageParentNodeHeight)) {
        return 2;
      } else if ((this.articleImageWidth >= this.aritcleImageParentNodeWidth) && (this.articleImageHeight >= this.aritcleImageParentNodeHeight) && this.ImgRatio <= 2.5 && this.ImgRatio >= 0.1) {
        return 2;
      } else if ((this.articleImageWidth >= this.aritcleImageParentNodeWidth) && (this.articleImageHeight >= this.aritcleImageParentNodeHeight) && this.ImgRatio <= 2.5 && this.ImgRatio >= 2.4) {
          return 3;
      } else if ((this.articleImageWidth >= this.aritcleImageParentNodeWidth) && (this.articleImageHeight >= this.aritcleImageParentNodeHeight)) {
         return 4;
      }

  }

}
