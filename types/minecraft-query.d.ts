declare module "minecraft-query" {
  export type QueryOptions = {
    port?: number;
    timeout?: number;
    enableSRV?: boolean;
  };

  export class Query {
    constructor(host: string, port?: number, timeout?: number);
    constructor(host: string, options?: QueryOptions);
    fullStat(): Promise<any>;
    basicStat(): Promise<any>;
    close(): void;
  }
}
