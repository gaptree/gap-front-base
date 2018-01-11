import {Dto} from '../index.js';

test('dto', () => {
    const dto = new Dto({
        k1: 'v1'
    });

    expect(dto.get('k1')).toBe('v1');
});
