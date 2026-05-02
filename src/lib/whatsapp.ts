export function buildWhatsAppUrl(params: {
  phoneE164: string;
  message: string;
}): string {
  const base = "https://wa.me/";
  const phone = params.phoneE164.replace(/[^\d]/g, "");
  const text = encodeURIComponent(params.message);
  return `${base}${phone}?text=${text}`;
}

