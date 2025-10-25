// Global type declarations for Node.js environment
declare var process: NodeJS.Process;
declare var console: Console;
declare var __dirname: string;
declare var __filename: string;
declare var Buffer: BufferConstructor;
declare var global: NodeJS.Global;
declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timeout;
declare function clearTimeout(timeoutId: NodeJS.Timeout): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timeout;
declare function clearInterval(intervalId: NodeJS.Timeout): void;

// Node.js modules
declare module 'path';
declare module 'http';
declare module 'https';
declare module 'fs';
declare module 'os';
declare module 'crypto';
declare module 'util';