import fs from 'fs';
import path from 'path';

export interface PresentationData {
  id: string;
  slug: string;
  partnerName: string;
  partnerNameShort: string;
  partnerLogoPath: string;
  discount: number;
  pinCode: string;
  salesperson: {
    name: string;
    role: string;
    initials: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  status: 'active' | 'archived';
}

const MOC_PRICES = [87, 54, 48, 339, 239];
const VAT_RATE = 1.12;

function calculateNC(moc: number, discountPercent: number): string {
  const nc = (moc * (1 - discountPercent / 100)) / VAT_RATE;
  return nc.toFixed(2).replace('.', ',');
}

export function renderPresentation(data: PresentationData): string {
  const templatePath = path.join(process.cwd(), 'src', 'templates', 'presentation.html');
  let html = fs.readFileSync(templatePath, 'utf-8');

  const ncPrices = MOC_PRICES.map((moc) => calculateNC(moc, data.discount));

  const noLogo = !data.partnerLogoPath;

  const replacements: Record<string, string> = {
    '{{PARTNER_NAME}}': data.partnerName,
    '{{PARTNER_NAME_SHORT}}': data.partnerNameShort,
    '{{PARTNER_LOGO_PATH}}': noLogo ? 'data:,' : data.partnerLogoPath,
    '{{DISCOUNT}}': String(data.discount),
    '{{PIN_CODE}}': data.pinCode,
    '{{SALESPERSON_NAME}}': data.salesperson.name,
    '{{SALESPERSON_ROLE}}': data.salesperson.role,
    '{{SALESPERSON_INITIALS}}': data.salesperson.initials,
    '{{SALESPERSON_PHONE}}': data.salesperson.phone,
    '{{SALESPERSON_EMAIL}}': data.salesperson.email,
    '{{NC_PRICE_1}}': ncPrices[0],
    '{{NC_PRICE_2}}': ncPrices[1],
    '{{NC_PRICE_3}}': ncPrices[2],
    '{{NC_PRICE_4}}': ncPrices[3],
    '{{NC_PRICE_5}}': ncPrices[4],
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    html = html.replaceAll(placeholder, value);
  }

  if (noLogo) {
    html = stripPartnerLogos(html);
  }

  return html;
}

function stripPartnerLogos(html: string): string {
  const hideCSS = `<style>.logo-sep,.logo-img.partner,.plus{display:none!important}</style>`;
  html = html.replace('</head>', hideCSS + '\n</head>');

  const hideJS = `<script>(function(){document.querySelectorAll('.partner-box').forEach(function(el){var img=el.querySelector('img');if(img&&img.src.startsWith('data:')){var prev=el.previousElementSibling;if(prev)prev.remove();el.remove()}})})();</script>`;
  html = html.replace('</body>', hideJS + '\n</body>');

  return html;
}
