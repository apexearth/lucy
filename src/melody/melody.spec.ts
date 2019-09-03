import {expect} from 'chai'
import {IMelody} from "./IMelody";
import {IComposeInstruction} from "../compose/Composer";

describe('melodty', () => {
    it('basics', () => {
        const melody: IMelody = {
            get: (): IComposeInstruction[] => {
                return [
                    {duration: 2, transpose: 0}
                ]
            }
        };
        expect(melody).to.exist;
    })
});
