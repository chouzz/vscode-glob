import { sep } from 'path';
import { CharCode } from './charCode';

export function equals<T>(
    one: ReadonlyArray<T> | undefined,
    other: ReadonlyArray<T> | undefined,
    itemEquals: (a: T, b: T) => boolean = (a, b) => a === b
): boolean {
    if (one === other) {
        return true;
    }

    if (!one || !other) {
        return false;
    }

    if (one.length !== other.length) {
        return false;
    }

    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }

    return true;
}

export function isThenable<T>(obj: unknown): obj is Promise<T> {
    return !!obj && typeof (obj as unknown as Promise<T>).then === 'function';
}

export function isLowerAsciiLetter(code: number): boolean {
    return code >= CharCode.a && code <= CharCode.z;
}

export function compareSubstring(
    a: string,
    b: string,
    aStart: number = 0,
    aEnd: number = a.length,
    bStart: number = 0,
    bEnd: number = b.length
): number {
    for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        const codeA = a.charCodeAt(aStart);
        const codeB = b.charCodeAt(bStart);
        if (codeA < codeB) {
            return -1;
        } else if (codeA > codeB) {
            return 1;
        }
    }
    const aLen = aEnd - aStart;
    const bLen = bEnd - bStart;
    if (aLen < bLen) {
        return -1;
    } else if (aLen > bLen) {
        return 1;
    }
    return 0;
}

export function compareSubstringIgnoreCase(
    a: string,
    b: string,
    aStart: number = 0,
    aEnd: number = a.length,
    bStart: number = 0,
    bEnd: number = b.length
): number {
    for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
        let codeA = a.charCodeAt(aStart);
        let codeB = b.charCodeAt(bStart);

        if (codeA === codeB) {
            // equal
            continue;
        }

        if (codeA >= 128 || codeB >= 128) {
            // not ASCII letters -> fallback to lower-casing strings
            return compareSubstring(
                a.toLowerCase(),
                b.toLowerCase(),
                aStart,
                aEnd,
                bStart,
                bEnd
            );
        }

        // mapper lower-case ascii letter onto upper-case varinats
        // [97-122] (lower ascii) --> [65-90] (upper ascii)
        if (isLowerAsciiLetter(codeA)) {
            codeA -= 32;
        }
        if (isLowerAsciiLetter(codeB)) {
            codeB -= 32;
        }

        // compare both code points
        const diff = codeA - codeB;
        if (diff === 0) {
            continue;
        }

        return diff;
    }

    const aLen = aEnd - aStart;
    const bLen = bEnd - bStart;

    if (aLen < bLen) {
        return -1;
    } else if (aLen > bLen) {
        return 1;
    }

    return 0;
}

export function startsWithIgnoreCase(str: string, candidate: string): boolean {
    const candidateLength = candidate.length;
    if (candidate.length > str.length) {
        return false;
    }

    return compareSubstringIgnoreCase(str, candidate, 0, candidateLength) === 0;
}
/**
 * @deprecated please use `IUriIdentityService.extUri.isEqualOrParent` instead. If
 * you are in a context without services, consider to pass down the `extUri` from the
 * outside, or use `extUriBiasedIgnorePathCase` if you know what you are doing.
 */
export function isEqualOrParent(
    base: string,
    parentCandidate: string,
    ignoreCase?: boolean,
    separator = sep
): boolean {
    if (base === parentCandidate) {
        return true;
    }

    if (!base || !parentCandidate) {
        return false;
    }

    if (parentCandidate.length > base.length) {
        return false;
    }

    if (ignoreCase) {
        const beginsWith = startsWithIgnoreCase(base, parentCandidate);
        if (!beginsWith) {
            return false;
        }

        if (parentCandidate.length === base.length) {
            return true; // same path, different casing
        }

        let sepOffset = parentCandidate.length;
        if (parentCandidate.charAt(parentCandidate.length - 1) === separator) {
            sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
        }

        return base.charAt(sepOffset) === separator;
    }

    if (parentCandidate.charAt(parentCandidate.length - 1) !== separator) {
        parentCandidate += separator;
    }

    return base.indexOf(parentCandidate) === 0;
}

export function escapeRegExpCharacters(value: string): string {
    return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
}

/**
 * Removes all occurrences of needle from the beginning of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
export function ltrim(haystack: string, needle: string): string {
    if (!haystack || !needle) {
        return haystack;
    }

    const needleLen = needle.length;
    if (needleLen === 0 || haystack.length === 0) {
        return haystack;
    }

    let offset = 0;

    while (haystack.indexOf(needle, offset) === offset) {
        offset = offset + needleLen;
    }
    return haystack.substring(offset);
}

export function isLinux(): boolean {
    return process.platform === 'linux';
}
