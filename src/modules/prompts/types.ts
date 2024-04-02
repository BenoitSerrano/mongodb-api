import { Prompt } from './Prompt.entity';

type promptDtoType = Omit<Prompt, '_id'>;

export type { promptDtoType };
