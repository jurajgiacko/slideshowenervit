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
    html = applyGeneralOverrides(html, data);
  }

  return html;
}

function applyGeneralOverrides(html: string, data: PresentationData): string {
  const d = String(data.discount);

  // Hide partner logos, x separators
  const hideCSS = `<style>.logo-sep,.logo-img.partner,.plus{display:none!important}</style>`;
  html = html.replace('</head>', hideCSS + '\n</head>');

  const hideJS = `<script>(function(){document.querySelectorAll('.partner-box').forEach(function(el){var img=el.querySelector('img');if(img&&img.src.startsWith('data:')){var prev=el.previousElementSibling;if(prev)prev.remove();el.remove()}})})();</script>`;
  html = html.replace('</body>', hideJS + '\n</body>');

  // Footer: "ENERVIT x [name]" → "ENERVIT"
  html = html.replaceAll(`ENERVIT x ${data.partnerName}`, 'ENERVIT');

  // Cover: "Obchodní nabídka pro [name]" → "Obchodní nabídka"
  html = html.replace(
    `Obchodní nabídka pro ${data.partnerName}`,
    'Obchodní nabídka',
  );

  // Closing slide: fix grammatically awkward "sortimentu vás"
  html = html.replace(
    `bude skvělým doplněním sortimentu ${data.partnerNameShort}`,
    'bude skvělým doplněním vašeho sortimentu',
  );

  // Conditions intro: "pro [name] bezriziková" → "bezriziková"
  html = html.replace(
    `aby spolupráce byla pro ${data.partnerNameShort} bezriziková`,
    'aby spolupráce byla bezriziková',
  );

  // Remove planogram slides (slide-10, slide-11) — not relevant for general presentations
  html = html.replace(
    /\n\s*<!-- SLIDE 11: Doporučený planogram[\s\S]*?(?=\n\s*<!-- SLIDE (?!11))/,
    '\n',
  );
  html = html.replace(
    /\n\s*<!-- SLIDE 11b: Planogram[\s\S]*?(?=\n\s*<!-- SLIDE)/,
    '\n',
  );

  // Remove corresponding nav dots
  html = html.replace(
    /\s*<div class="nav-dot" data-slide="10" title="Planogram"><\/div>/,
    '',
  );
  html = html.replace(
    /\s*<div class="nav-dot" data-slide="11" title="Sortiment"><\/div>/,
    '',
  );

  // Pricing slide: replace specific table with generic "co nabízíme"
  html = html.replace(
    /<h3[^>]*>Nákupní podmínky<\/h3>[\s\S]*?<\/table>/,
    GENERIC_PRICING_HTML,
  );

  // Pricing slide stat card (has margin-bottom: 20px)
  html = html.replace(
    new RegExp(
      `(<div class="stat-card highlight" style="margin-bottom: 20px;">\\s*<div class="number">)${d} %(<\\/div>\\s*<div class="label">)Sleva z MOC(<\\/div>)`,
    ),
    '$1Na míru$2Cenové podmínky$3',
  );

  // Summary slide stat card (no margin-bottom)
  html = html.replace(
    new RegExp(
      `(<div class="stat-card highlight">\\s*<div class="number">)${d} %(<\\/div>\\s*<div class="label">)Sleva z MOC(<\\/div>)`,
    ),
    '$1Na míru$2Cenové podmínky$3',
  );

  // Benefit card: "XX % sleva z MOC" → generic
  html = html.replace(
    `<strong>${d} % sleva z MOC.</strong> Vyšší prodejní cena = vyšší absolutní zisk na kus.`,
    '<strong>Individuální cenové podmínky.</strong> Prémiové produkty s atraktivní marží pro vaši síť.',
  );

  // Conditions slide: "Sleva: XX %" → generic
  html = html.replace(
    `<li><strong>Sleva:</strong> ${d} % z doporučené MOC</li>`,
    '<li><strong>Sleva:</strong> individuální — připravíme na míru</li>',
  );

  // Summary list: "XX % slevu z doporučené maloobchodní ceny" → generic
  html = html.replace(
    `${d} % slevu z doporučené maloobchodní ceny`,
    'Individuální slevu z doporučené maloobchodní ceny',
  );

  return html;
}

const GENERIC_PRICING_HTML = `<h3 style="color: var(--enervit-dark); margin-bottom: 18px;">Co nabízíme</h3>
                    <p style="margin-bottom: 18px;">Prémiová italská sportovní výživa <strong>ENERVIT</strong> — kompletní portfolio pro aktivní zákazníky vašich prodejen.</p>
                    <div style="margin-top: 10px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px; padding: 12px 14px; background: rgba(255,193,7,0.08); border-radius: 8px;">
                            <span style="color: var(--c21-yellow); font-weight: bold; font-size: 1.1rem; min-width: 50px;">C2:1</span>
                            <span>Inovativní řada s poměrem sacharidů 2:1 — gely, tyčinky, nápoje</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px; padding: 12px 14px; background: rgba(227,6,19,0.05); border-radius: 8px;">
                            <span style="color: var(--enervit-red); font-weight: bold; font-size: 1.1rem; min-width: 50px;">Sport</span>
                            <span>Klasická sportovní výživa — gely, iontové nápoje, tyčinky, proteiny</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px; padding: 12px 14px; background: rgba(0,180,180,0.05); border-radius: 8px;">
                            <span style="color: var(--purepro-teal); font-weight: bold; font-size: 1.1rem; min-width: 50px;">PURE</span>
                            <span>Přírodní řada — elektrolyty, vitamíny, minerály pro každodenní výkon</span>
                        </div>
                    </div>
                    <div class="highlight-box" style="margin-top: 22px; text-align: center; padding: 22px;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: var(--enervit-dark); margin-bottom: 8px;">Cenové podmínky připravíme na míru</div>
                        <p style="margin: 0; opacity: 0.85;">Kontaktujte nás pro individuální nabídku přizpůsobenou vašim potřebám.</p>
                    </div>`;
