import Airtable from 'airtable'

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
})

export const sophomoreParticipant = airtable
    .base('appbzEGuRMvyaUfOD/tblp5dpoleZrCmClI')
    .table('20 - participant')