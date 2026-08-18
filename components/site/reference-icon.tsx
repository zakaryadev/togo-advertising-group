import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };
export function ReferenceIcon({ children, className }: Props) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{children}</svg>;
}

export function DirectionIcon({ index }: { index: number }) {
  const icons = [
    <><path d="M4 19L9.4 5h2.6L17.4 19" /><path d="M6.6 14h8.2M19 9v10" /></>,
    <><path d="M3 20h8M7 20V5M7 5h13l-3.4 4H7M7 5L3.5 9" /><path d="M16.6 9v3.2M14.8 12.2h3.6v3.2h-3.6z" /></>,
    <><rect x="3" y="9" width="18" height="8" rx="2" /><path d="M7 9V4h10v5M7 17v3h10v-3M7.5 12.5h.01" /></>,
    <><path d="M6 3.5h8.5L19 8v12.5H6z" /><path d="M14 3.5V8h5M9 12.5h7M9 16h4.5" /></>,
    <><path d="M3 5.5h18v10H3z" /><path d="M8 20l4-4.5 4 4.5M12 3v2.5" /></>,
    <><circle cx="12" cy="12" r="8.6" /><path d="M12 3.4v17.2M3.4 12h17.2M7.6 6a12 12 0 000 12M16.4 6a12 12 0 010 12" /></>,
  ];
  return <ReferenceIcon>{icons[index]}</ReferenceIcon>;
}

export function EventIcon({ index }: { index: number }) {
  const icons = [
    <><rect x="6" y="3" width="12" height="13" rx="1.5" /><path d="M9 20l3-4 3 4M12 16v.5" /></>,
    <><path d="M3 6.5q9-3 18 0v9q-9-3-18 0z" /><path d="M9 4.6v13M15 4.6v13" /></>,
    <><path d="M7 21V3M7 4q6-2.4 10 0v9q-4-2.4-10 0z" /></>,
    <><rect x="3.5" y="9" width="17" height="11.5" rx="2" /><path d="M2.5 6h19v3h-19zM12 6v14.5" /><path d="M12 6q-4-4.5-5.5-2T12 6q4-4.5 5.5-2T12 6z" /></>,
    <><path d="M3 5.5h18v10H3z" /><path d="M8 20l4-4.5 4 4.5M12 3v2.5" /></>,
    <><path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5" /></>,
    <><rect x="3" y="3" width="7.5" height="7.5" rx="1.6" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" /></>,
    <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="M7.5 10h9M7.5 14h5.5" /></>,
  ];
  return <ReferenceIcon>{icons[index]}</ReferenceIcon>;
}

export function ServiceIcon({ index }: { index: number }) {
  const icons = [
    <><path d="M3 20h7M6.5 20V5M6.5 5h13l-3.2 4H6.5M6.5 5L3.4 9M16 9v3M14.4 12h3.2v3.2h-3.2z" /></>,
    <><path d="M3.5 19L8 5h2.2L14.7 19M5.7 14.6h6.8M17.5 8.5V19" /></>,
    <><rect x="3" y="6.5" width="18" height="11" rx="2.5" /><path d="M12 3.5V6M6 4.4l1 2M18 4.4l-1 2M7 11h10M7 14h6" /></>,
    <><rect x="2.5" y="4.5" width="19" height="13" rx="2" /><path d="M9 20.5h6M12 17.5v3M6 8h3M11 8h3M16 8h2M6 12h2M10 12h4M16 12h2" /></>,
    <><path d="M4 15c0-4.4 3.6-8 8-8s8 3.6 8 8" /><path d="M4 19h16" /><path d="M8.5 11.6a5 5 0 017 0" /></>,
    <><rect x="3" y="5" width="18" height="12" rx="1.5" /><path d="M6 20l1.5-3M18 20l-1.5-3M7 9h7M7 12.5h4" /></>,
    <><path d="M6 4h12a2.5 2.5 0 010 5H6z" /><path d="M6 4a2.5 2.5 0 000 5v11l3-2 3 2 3-2 3 2V9" /></>,
    <><path d="M4 4.5h11l5 5v10H4z" /><path d="M15 4.5v5h5M8 13h7M8 16h4" /></>,
    <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M5.2 18.8l1.9-1.9M16.9 7.1l1.9-1.9" /></>,
    <><path d="M6 3.5h12v17H6z" /><path d="M9 7.5h6M9 11h6M9 14.5h3.5" /></>,
    <><path d="M12 5.5v14M12 5.5c-2-1.6-4.5-2-7-1.6v13.6c2.5-.4 5 0 7 1.5M12 5.5c2-1.6 4.5-2 7-1.6v13.6c-2.5-.4-5 0-7 1.5" /></>,
    <><rect x="2.5" y="6" width="19" height="12" rx="2.5" /><circle cx="8" cy="11.5" r="2" /><path d="M5.5 15.6c.6-1.4 4.4-1.4 5 0M14 10h4.5M14 13.5h3" /></>,
    <><path d="M7 21V3" /><path d="M7 4c4-1.8 8-1.8 11 0v8.6c-3-1.8-7-1.8-11 0z" /></>,
    <><path d="M5 4l14 15M19 4L5 19" /><rect x="8" y="6" width="8" height="11" rx="1" /></>,
    <><path d="M4 20l1.5-4.5L16 5a2.6 2.6 0 013.6 3.6L9 19.2z" /><path d="M14 7l3.6 3.6" /></>,
    <><path d="M8.6 3.2L4 5.4l1.6 3.6 2.4-1V20h8V8l2.4 1L20 5.4l-4.6-2.2-1.2 1.2a3 3 0 01-4.4 0z" /></>,
    <><path d="M3 16.5v-3l1.8-4.6A2 2 0 016.7 7.5h10.6a2 2 0 011.9 1.4l1.8 4.6v3" /><path d="M3 16.5h18M4.6 16.5V19h3v-2.5M16.4 16.5V19h3v-2.5M6.4 12.6h11.2" /></>,
  ];
  return <ReferenceIcon>{icons[index % icons.length]}</ReferenceIcon>;
}

export const contactIcons = {
  phone: <ReferenceIcon><path d="M6.8 3.5h3l1.6 4-2 1.4a12 12 0 005.7 5.7l1.4-2 4 1.6v3a1.8 1.8 0 01-2 1.8A16.6 16.6 0 015 5.5a1.8 1.8 0 011.8-2z" /></ReferenceIcon>,
  telegram: <ReferenceIcon><path d="M21 4.5L2.9 11.3c-.9.3-.9 1.5.1 1.7l4.5 1.2 1.7 5c.3.8 1.3 1 1.8.3l2.4-2.9 4.6 3.4c.7.5 1.6.1 1.8-.7L22.4 5.6c.2-.9-.6-1.5-1.4-1.1z" /><path d="M7.5 14.2L18.4 7" /></ReferenceIcon>,
  mail: <ReferenceIcon><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.6 6.6L12 12.6l8.4-6" /></ReferenceIcon>,
  location: <ReferenceIcon><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></ReferenceIcon>,
  chat: <ReferenceIcon><path d="M21 11.5a8.4 8.4 0 01-9 8.4 9.3 9.3 0 01-2.9-.4L4 21l1.4-4.1A8.2 8.2 0 013 11.5C3 6.9 7 3.2 12 3.2s9 3.7 9 8.3z" /></ReferenceIcon>,
};
