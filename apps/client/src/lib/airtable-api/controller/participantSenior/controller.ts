import { getParticipantByStudentId } from "./queries";
import { insertHintsByStudentId } from './mutates';
export const participantSenior = {
    getParticipantByStudentId,
    insertHintsByStudentId
}