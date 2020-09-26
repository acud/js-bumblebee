const listenPortLabel = "listen-port"
const debugapiPortLabel = "debugapi-port"
const debugapiEnabledLabel = "debugapi-enabled"
const beeListenAddressLabel = "bee-endpoint"
const verbosityLabel = "verbosity"
const jaegerServiceLabel = "verbosity"

export class Config {
    public readonly ListenPort: number
    public readonly DebugApiPort: number
    public readonly DebugApiEnabled: boolean
    public readonly BeeListenAddress: string
    public readonly Verbosity: number
    public readonly JaegerServiceName : string

    constructor(port: number,debugApiPort: number,debugApiEnable: boolean, beeAddr: string, verbosity: number, jaegerServiceName: string) {
        this.ListenPort = port
        this.DebugApiPort = debugApiPort
        this.DebugApiEnabled = debugApiEnable
        this.BeeListenAddress = beeAddr
        this.Verbosity = verbosity
        this.JaegerServiceName = jaegerServiceName
    }
}

export function parseArgs(args: any): Config {
    const port = checkPropertyOrDefault(args, listenPortLabel, 3000);
    const debugPort = checkPropertyOrDefault(args, debugapiPortLabel, 3005);
    const debugEnable = checkPropertyOrDefault(args, debugapiEnabledLabel, true);
    const beeAddr = checkPropertyOrDefault(args, beeListenAddressLabel, "localhost:8080")
    const verbosity = checkPropertyOrDefault(args, verbosityLabel, 5)
    const jaegerServiceName = checkPropertyOrDefault(args, jaegerServiceLabel, "bumblebee")

    return new Config(port,debugPort,debugEnable, beeAddr, verbosity,jaegerServiceName)
}


function checkPropertyOrDefault(obj: any, label: string, fallback: any): any {

    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(label)) {
        return obj[label]
    }
    return fallback
}