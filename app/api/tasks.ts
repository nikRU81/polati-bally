import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = '1iP1kbWky0zZk--cX-Q7DbDmEt8TssXfzJmoLC-Yk3ps';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');

    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;

    const tasks = rows.map(row => {
      const obj: Record<string, unknown> = {};
      headers.forEach(header => {
        // snake_case → camelCase
        const key = header.replace(/_([a-z])/g, (_: string, l: string) => l.toUpperCase());
        obj[key] = row.get(header);
      });
      return {
        taskId: String(obj.taskId ?? ''),
        category: String(obj.category ?? ''),
        taskName: String(obj.taskName ?? ''),
        basePoints: Number(obj.basePoints ?? 0),
        frequency: obj.frequency ?? 'once',
        condition: String(obj.condition ?? ''),
        probability: Number(obj.probability ?? 1),
        appliesToYear: String(obj.appliesToYear ?? 'all'),
        description: String(obj.description ?? ''),
      };
    });

    return res.status(200).json({ tasks, source: 'google' });
  } catch (error) {
    console.error('Google Sheets error:', error);
    return res.status(500).json({ error: 'Не удалось загрузить данные', tasks: [] });
  }
}
