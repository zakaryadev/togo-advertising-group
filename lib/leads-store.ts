export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

// In-memory store for leads so submitted leads are instantly available and manageable
const initialLeads: LeadItem[] = [
  {
    id: "lead-1",
    name: "Sardor Rahimov",
    phone: "+998 90 123 45 67",
    service: "LED Harflar",
    message: "Fasad uchun yoritiladigan harflar bo'yicha konsultatsiya kerak.",
    status: "new",
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "lead-2",
    name: "Madina Aliyeva",
    phone: "+998 97 765 43 21",
    service: "Lightbox",
    message: "Do'kon peshtoqi uchun lightbox tayyorlash narxi qancha?",
    status: "contacted",
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

const globalLeads: LeadItem[] = [...initialLeads];

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
