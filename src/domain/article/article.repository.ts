import { Article } from './article.entity';

export interface IArticleRepository {
    create(article: Article): Promise<void>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');