// Global type declarations for Node.js environment
declare var process: any;
declare var console: any;
declare var __dirname: string;
declare var __filename: string;
declare var Buffer: any;
declare var global: any;
declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
declare function clearTimeout(timeoutId: any): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
declare function clearInterval(intervalId: any): void;

// Node.js modules
declare module 'path';
declare module 'http';
declare module 'https';
declare module 'fs';
declare module 'os';
declare module 'crypto';
declare module 'util';

// NPM packages
declare module 'express' {
    const express: any;
    export = express;
}

declare module 'cors' {
    const cors: any;
    export = cors;
}

declare module 'compression' {
    const compression: any;
    export = compression;
}

declare module 'helmet' {
    const helmet: any;
    export = helmet;
}

declare module 'dotenv' {
    const dotenv: any;
    export = dotenv;
}

declare module 'axios' {
    const axios: any;
    export = axios;
}