import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WARNING: Disabling SSL verification to allow connection through corporate proxy/VPN
// This is necessary because of the "olimp.local" interception
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configuration
// ID from provided URL: https://docs.google.com/spreadsheets/d/1iP1kbWky0zZk--cX-Q7DbDmEt8TssXfzJmoLC-Yk3ps/edit
const SPREADSHEET_ID = '1iP1kbWky0zZk--cX-Q7DbDmEt8TssXfzJmoLC-Yk3ps';
const CREDENTIALS_PATH = path.join(__dirname, '../service_account.json');
const TARGET_PATH = path.join(__dirname, '../public/data/tasks.csv');

async function updateTasks() {
    console.log('Starting update process...');

    // 1. Load Credentials
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error('Error: service_account.json not found in app root.');
        process.exit(1);
    }

    const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // 2. Auth
    const serviceAccountAuth = new JWT({
        email: keys.client_email,
        key: keys.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    try {
        await doc.loadInfo();
        console.log(`Connected to sheet: ${doc.title}`);
    } catch (e) {
        console.error('Error connecting to Google Sheet. Make sure you shared the sheet with:', keys.client_email);
        console.error(e.message);
        process.exit(1);
    }

    // 3. Get Data
    const sheet = doc.sheetsByIndex[0]; // Assume first sheet
    const rows = await sheet.getRows();
    console.log(`Found ${rows.length} rows.`);

    // 4. Transform to Clean Objects
    // We extract the raw data mapping from the headers
    const headers = sheet.headerValues;
    const data = rows.map(row => {
        const obj = {};
        headers.forEach(header => {
            obj[header] = row.get(header);
        });
        return obj;
    });

    // 5. Convert to CSV
    const csv = Papa.unparse(data, {
        header: true,
        newline: '\r\n', // Common for Windows
    });

    // 6. Save
    fs.writeFileSync(TARGET_PATH, csv, 'utf8');
    console.log(`Updated ${TARGET_PATH}`);
}

updateTasks().catch(console.error);
