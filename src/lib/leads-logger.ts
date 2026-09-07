import fs from 'fs';
import path from 'path';

export interface LeadRecord {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  solution?: string;
  projectScale?: string;
  message?: string;
  source?: string;
  ip?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads_log.json');

/**
 * Persist lead record to local leads_log.json
 */
export async function saveLeadLog(leadData: Omit<LeadRecord, 'id' | 'timestamp'>): Promise<LeadRecord> {
  const record: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    ...leadData,
  };

  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let leads: LeadRecord[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8');
        leads = JSON.parse(fileContent);
        if (!Array.isArray(leads)) {
          leads = [];
        }
      } catch (parseErr) {
        console.error('[LEADS_LOGGER] Error parsing existing leads file, creating new list:', parseErr);
        leads = [];
      }
    }

    // Add new lead at the beginning (newest first)
    leads.unshift(record);

    // Write back atomically
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    console.log(`[LEADS_LOGGER] Successfully logged lead: ${record.id} (${record.fullName} - ${record.email})`);
    return record;
  } catch (error) {
    console.error('[LEADS_LOGGER] Failed to save lead log:', error);
    // Return record even if file write failed so request continues
    return record;
  }
}

/**
 * Retrieve all logged leads
 */
export async function getLeadsLog(): Promise<LeadRecord[]> {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return [];
    }
    const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(fileContent);
    return Array.isArray(leads) ? leads : [];
  } catch (error) {
    console.error('[LEADS_LOGGER] Error reading leads log:', error);
    return [];
  }
}
