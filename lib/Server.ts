import Path from 'path';
import { AppRunner } from '@solid/community-server';

/**
 * Serves generated fragments over HTTP.
 */
export class Server {
  private readonly configPath: string;
  private readonly port: number;
  private readonly logLevel: string;

  public constructor(options: IServerOptions) {
    this.configPath = options.configPath;
    this.port = options.port;
    this.logLevel = options.logLevel;
  }

  public async serve(): Promise<void> {
    return new AppRunner().run(
      {
        mainModulePath: Path.join(__dirname, '..'),
        logLevel: <any> this.logLevel,
        typeChecking: false,
      },
      this.configPath,
      {
        'urn:solid-server:default:variable:port': this.port,
        'urn:solid-server:default:variable:rootFilePath': 'out-fragments/http/localhost_3000/',
        'urn:solid-server:default:variable:loggingLevel': this.logLevel,
        'urn:solid-server:default:variable:baseUrl': `http://localhost:${this.port}/`,
        'urn:solid-server:default:variable:seededPodConfigJson': '',
        'urn:solid-server:default:variable:showStackTrace': false,
      },
    );
  }
}

export interface IServerOptions {
  configPath: string;
  port: number;
  logLevel: string;
}
