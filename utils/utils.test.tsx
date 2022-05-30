import { formatParams, parseArrayToDictionary } from '.';

describe('Utils', () => {
    test('formatParams', () => {
        expect(formatParams(undefined)).toBe('');
        expect(formatParams({})).toBe('');
        expect(
            formatParams({
                page: 1,
                query: 'Test',
                year: 2022,
            })
        ).toBe('page=1&query=Test&year=2022');
        expect(
            formatParams({
                page: 1,
                query: '',
                year: 2022,
            })
        ).toBe('page=1&year=2022');
    });

    test('parseArrayToDictionary', () => {
        expect(parseArrayToDictionary(undefined, 'id', 'name')).toBe(undefined);
        expect(parseArrayToDictionary([], 'id', 'name')).toStrictEqual({});
        expect(
            parseArrayToDictionary(
                [
                    { id: 1, name: 'test 1' },
                    { id: 2, name: 'test 2' },
                ],
                'id',
                'name'
            )
        ).toStrictEqual({ 1: 'test 1', 2: 'test 2' });
        expect(
            parseArrayToDictionary(
                [
                    { id: 1, name: 'test 1' },
                    { id: 1, name: 'test 1' },
                    { id: 2, name: 'test 2' },
                ],
                'id',
                'name'
            )
        ).toStrictEqual({ 1: 'test 1', 2: 'test 2' });
        expect(parseArrayToDictionary([{ id: 1, name: 'test 1', a: 'a', b: 'b' }], 'id', 'name')).toStrictEqual({
            1: 'test 1',
        });
    });
});
