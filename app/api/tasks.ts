import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
    // Only allow GET
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Get Credentials from Vercel Env
        const rawCreds = process.env.GOOGLE_SERVICE_ACCOUNT;
        if (!rawCreds) {
            throw new Error('Missing GOOGLE_SERVICE_ACCOUNT environment variable');
        }

        // Handle potential escaped newlines in env vars (common Vercel issue)
        const keys = JSON.parse(rawCreds);

        // 2. Auth
        const serviceAccountAuth = new JWT({
            email: keys.client_email,
            key: keys.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet('1iP1kbWky0zZk--cX-Q7DbDmEt8TssXfzJmoLC-Yk3ps', serviceAccountAuth);
        await doc.loadInfo();

        // 3. Get Data
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        // 4. Transform to Clean Objects
        const headers = sheet.headerValues;
        const tasks = rows.map((row) => {
            const obj: Record<string, any> = {};
            headers.forEach((header) => {
                obj[header] = row.get(header);
            });
            return obj;
        });

        // Return compatible format for `utils/googleSheets.ts`
        return response.status(200).json({
            tasks: tasks,
            source: 'google'
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return response.status(500).json({
            error: 'Failed to fetch tasks',
            details: error.message
        });
    }
}
