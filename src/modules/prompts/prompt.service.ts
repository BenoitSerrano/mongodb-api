import { DataSource } from 'typeorm';
import { Prompt } from './Prompt.entity';
import { promptDtoType } from './types';

function buildPromptService(dataSource: DataSource) {
    const promptRepository = dataSource.getRepository(Prompt);

    return {
        getPrompts,
        createPrompt,
    };

    async function getPrompts() {
        return promptRepository.find({});
    }

    async function createPrompt(promptDto: promptDtoType) {
        const result = await promptRepository.insert(promptDto);
        return result.identifiers.length === 1;
    }
}

export { buildPromptService };
