import { NextResponse } from 'next/server';
import { getLeadsLog } from '@/lib/leads-logger';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';

  try {
    const leads = await getLeadsLog();

    if (format === 'csv') {
      const headers = ['ID', 'Timestamp', 'Full Name', 'Email', 'Phone', 'Company', 'Industry', 'Solution', 'Project Scale', 'Source', 'Message', 'IP'];
      const csvRows = [
        headers.join(','),
        ...leads.map(lead => [
          `"${lead.id}"`,
          `"${lead.timestamp}"`,
          `"${(lead.fullName || '').replace(/"/g, '""')}"`,
          `"${(lead.email || '').replace(/"/g, '""')}"`,
          `"${(lead.phone || '').replace(/"/g, '""')}"`,
          `"${(lead.company || '').replace(/"/g, '""')}"`,
          `"${(lead.industry || '').replace(/"/g, '""')}"`,
          `"${(lead.solution || '').replace(/"/g, '""')}"`,
          `"${(lead.projectScale || '').replace(/"/g, '""')}"`,
          `"${(lead.source || '').replace(/"/g, '""')}"`,
          `"${(lead.message || '').replace(/"/g, '""')}"`,
          `"${(lead.ip || '').replace(/"/g, '""')}"`
        ].join(','))
      ];

      return new NextResponse(csvRows.join('\n'), {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="fct_leads_${new Date().toISOString().slice(0, 10)}.csv"`
        }
      });
    }

    return NextResponse.json({
      success: true,
      total: leads.length,
      data: leads
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
