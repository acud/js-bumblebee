import * as bunyan from 'bunyan';


export interface Logger {
    trace(...args: any[])
    debug(...args: any[])
    info(...args: any[])
    warn(...args: any[])
    error(...args: any[])
    fatal(...args: any[])

    childLogger(context: string): Logger
}


export class BunyanLogger implements Logger {

    private logger: any
    private level: number
    /**
     *
     */
    constructor(level: number, parent?: any, context?: string) {
        this.level = level
        let bunyanLevel = 'error'
        // possible verbosity values are: "fatal" (60), "error" (50), "warn" (40), info (30), debug (20), trace (10)
        switch (level) {
            case 1:
                bunyanLevel = 'error'
                break;
            case 2:
                bunyanLevel = 'warn'
                break;
            case 3:
                bunyanLevel = 'info'
                break;
            case 4:
                bunyanLevel = 'debug'
                break;
            case 5:
                bunyanLevel = 'trace'
                break;
            default:
                throw new Error("invalid verbosity level");
        }
        if (parent === undefined) {
            this.logger = bunyan.createLogger({
                name: "bumblebee-logger",                     // Required
                level: bunyanLevel,      // Optional, see "Levels" section
                stream: process.stdout,           // Optional, see "Streams" section
            });
        } else {
            parent.child({ component: context })

        }
    }


    trace(...args: any[]): void {
        this.logger.trace(...args)
    }

    debug(...args: any[]): void {
        this.logger.debug(...args)
    }

    info(...args: any[]): void {
        this.logger.info(...args)
    }

    warn(...args: any[]): void {
        this.logger.warn(...args)
    }

    error(...args: any[]): void {
        this.logger.error(...args)
    }

    fatal(...args: any[]): void {
        this.logger.fatal(...args)
    }

    childLogger(context: string): Logger {
        return new BunyanLogger(this.level, this.logger, context)
    }
}