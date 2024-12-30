import { IQueries } from ".";

export interface IPageProps {
    params: { id: string; [key: string]: string };
    searchParams?: IQueries;
}
