export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

// In-memory store for runtime submitted leads
const initialLeads: LeadItem[] = [];

const globalLeads: LeadItem[] = [];

export function getLocalLeads(): LeadItem[] {
  return globalLeads;
}

export function addLocalLead(lead: { name: string; phone: string; service?: string | null; message?: string | null }): LeadItem {
  const newLead: LeadItem = {
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: lead.name,
    phone: lead.phone,
    service: lead.service || null,
    message: lead.message || null,
    status: "new",
    created_at: new Date().toISOString(),
  };
  globalLeads.unshift(newLead);
  return newLead;
}

export function updateLocalLeadStatus(id: string, status: "new" | "contacted" | "closed") {
  const item = globalLeads.find((l) => l.id === id);
  if (item) {
    item.status = status;
  }
}

export function deleteLocalLead(id: string) {
  const idx = globalLeads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    globalLeads.splice(idx, 1);
  }
}
