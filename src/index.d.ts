// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace formatRMB;

/*~ If this module has methods, declare them as functions like so.
 */
export function _interpolateUnit(segment: string, unitIdx: number): string;
export function _parseDecimal(decimal: string): string;
export function formatRMB(num: number, prefix: string): response;

/*~ You can declare types that are available via importing the module */
export interface response {
    errCode: number;
    msg: string;
    value: string;
}

/*~ You can declare properties of the module using const, let, or var */
export const DigitalList: string[];
export const TailSepartorLabel: string[];
export const MiddleSepartorLabel: string[];