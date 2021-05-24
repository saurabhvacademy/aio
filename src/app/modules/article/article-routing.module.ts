import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleComponent} from './article.component';
import {MyarticleComponent} from './myarticle/myarticle.component';
import {ViewArticleComponent} from './view-article/view-article.component';
const routes: Routes = [
    {
        path: 'myarticle',
        component: MyarticleComponent
    },
    {
        path: 'myarticle/draft',
        component: MyarticleComponent
    },
    {
        path: 'myarticle/publish',
        component: MyarticleComponent
    },
    {
        path: '',
        component: ArticleComponent
    },
    {
        path: 'edit/:id',
        component: ArticleComponent
    },
    {
        path: 'page/:pageId',
        component: ArticleComponent
    },
    {
        path: ':id',
        component: ViewArticleComponent
    },
    {
        path: ':id/:url',
        component: ViewArticleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
