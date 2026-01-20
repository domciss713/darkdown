declare module "ssh2-sftp-client" {
  export type ConnectConfig = {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKey?: string | Buffer;
    readyTimeout?: number;
  };

  export default class SftpClient {
    constructor(name?: string);

    connect(config: ConnectConfig): Promise<void>;
    end(): Promise<void>;

    stat(path: string): Promise<{ size: number }>;
    get(path: string, dst?: any, options?: any): Promise<Buffer>;

    // optional helpers some versions expose
    exists?(path: string): Promise<boolean | string>;
  }
}
