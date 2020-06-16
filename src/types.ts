export interface IDataGetter {
    (data: object): string;
}

export interface IStore {
    pushData<T>(data: Array<string>): void;
}

export type fetcherReturnType = Array<string>;

export interface Ifetcher {
    fetchAndParse(): Promise<fetcherReturnType>;
}