import { DataSource } from 'typeorm';
import { buildPromptService } from './prompt.service';
import { promptDtoType } from './types';

function buildPromptController(dataSource: DataSource) {
    const promptService = buildPromptService(dataSource);
    return { getPrompts, createPrompt };

    function getPrompts() {
        return promptService.getPrompts();
    }

    function createPrompt(params: { body: promptDtoType }) {
        return promptService.createPrompt(params.body);
    }
}

export { buildPromptController };
