import {IComposeInstruction} from "../compose/Composer";

enum MelodyTag {
    Max
}

export interface IMelody {
    tags?: MelodyTag[];
    get: () => IComposeInstruction[];
}
