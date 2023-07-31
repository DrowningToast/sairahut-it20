import { getParticipantByStudentId } from './queries';
import { sophomoreParticipant } from './table';

interface IInsertHints {
    sophomoreId: string;
    content: string;
    hintSlugId: string;
}

export const insertHintsByStudentId = async (studentId: number, data: IInsertHints[]) => {
    const sophomore = await getParticipantByStudentId(studentId + '')

    const payload = data.map((value) => ({
        content: value.content, slug: value.hintSlugId
    }))

    await sophomoreParticipant.update([
        {
            fields: {
                hints: JSON.stringify(payload),
            },
            id: sophomore?.airtableId as string
        }
    ]);
}