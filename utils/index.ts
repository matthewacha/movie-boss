import { OptionType } from '../types';

/**
 * @param opts Params object.
 * @returns A query string with format &{key}={value} for each parameter
 */
export function formatParams(opts: OptionType | undefined) {
    if (!opts) return '';
    return Object.entries(opts)
        .map(([key, value]) => (value ? `&${key}=${value}` : ''))
        .join('')
        .slice(1);
}

/**
 * @param optionsArr Array of generic objects T.
 * @param key The parameter value used as key in the dictionary
 * @param value The parameter value used as value in the dictionary
 *  @returns A dictionary object with format {[key: keyof T]: value: keyof T}
 */
export const parseArrayToDictionary = <T extends OptionType>(optionsArr: T[] | undefined, key: keyof T, value: keyof T) => {
    if (!optionsArr) return;
    const options: OptionType = {};
    for (const opt of optionsArr) {
        if (!options[opt[key]]) options[opt[key]] = opt[value];
    }
    return options;
};
