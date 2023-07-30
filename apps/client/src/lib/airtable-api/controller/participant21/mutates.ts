import type { Branch, NameTitle } from "database"
import { freshmenParticipant } from "./table"

interface IInsertFreshmen {
    title: NameTitle,
    student_id: number,
    first_name: string,
    last_name: string,
    phone: string,
    nickname: string,
    branch: Branch,
    facebook_link: string,
    instagram_link: string
}

export const insertFreshmen = async (freshmenDetails: IInsertFreshmen) => {
    const { student_id, first_name, last_name, phone, nickname, branch, facebook_link, instagram_link, title } = freshmenDetails;

    const data = {
        title: title === 'MR' ? 'นาย' : 'นางสาว',
        student_id,
        name: first_name,
        surname: last_name,
        phone,
        nickname,
        branch,
        facebook: facebook_link as string,
        instagram: instagram_link as string
    }

    await freshmenParticipant.create([{
        fields: data,
    }])
}