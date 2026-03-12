import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPresentationBySlug } from '@/lib/store';

const PRICELIST_DIR = path.join(process.cwd(), 'src', 'templates', 'pricelists');

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const filePath = path.join(PRICELIST_DIR, `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    return new Response(
      '<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#1a1a2e;color:white"><h1>Ceník nenalezen</h1></body></html>',
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const presentation = getPresentationBySlug(slug);
  const pin = presentation?.pinCode || 'enervit2026';

  let html = fs.readFileSync(filePath, 'utf-8');

  const pinGate = buildPinGate(pin);
  html = html.replace('</body>', pinGate + '\n</body>');

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function buildPinGate(pin: string): string {
  return `
<div id="pin-gate" style="
    position:fixed;inset:0;z-index:99999;
    background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);
    display:flex;align-items:center;justify-content:center;
    transition:opacity 0.5s ease,visibility 0.5s ease;
">
  <div style="text-align:center;max-width:400px;width:90%;padding:48px 40px;
      background:rgba(255,255,255,0.05);border-radius:20px;
      border:1px solid rgba(255,255,255,0.08);
      backdrop-filter:blur(20px);box-shadow:0 25px 60px rgba(0,0,0,0.3);">
    <div style="display:inline-block;background:#E30613;padding:12px 28px;margin-bottom:32px;">
      <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:2px;">ENERVIT</span>
    </div>
    <p style="color:rgba(255,255,255,0.5);font-size:13px;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px;">
      Ceník
    </p>
    <div style="position:relative;margin-bottom:16px;">
      <input id="pin-input" type="password" placeholder="Zadejte přístupový kód"
        autocomplete="off" autofocus
        style="width:100%;padding:16px 20px;font-size:16px;
          background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
          border-radius:10px;color:#fff;text-align:center;
          letter-spacing:2px;outline:none;
          transition:border-color 0.3s ease,box-shadow 0.3s ease;"
        onfocus="this.style.borderColor='rgba(227,6,19,0.6)';this.style.boxShadow='0 0 20px rgba(227,6,19,0.15)'"
        onblur="this.style.borderColor='rgba(255,255,255,0.15)';this.style.boxShadow='none'"
      >
    </div>
    <button id="pin-submit" style="
        width:100%;padding:14px;font-size:15px;font-weight:600;
        background:#E30613;color:#fff;border:none;border-radius:10px;
        cursor:pointer;letter-spacing:1px;text-transform:uppercase;
        transition:background 0.3s ease,transform 0.1s ease;"
      onmouseover="this.style.background='#c7050f'"
      onmouseout="this.style.background='#E30613'"
    >Vstoupit</button>
    <p id="pin-error" style="color:#ff6b6b;font-size:13px;margin-top:12px;opacity:0;transition:opacity 0.3s ease;">
      Nesprávný kód. Zkuste to znovu.
    </p>
    <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:32px;">
      VITAR Sport s.r.o. &bull; Důvěrný obsah
    </p>
  </div>
</div>
<script>
(function(){
  var PIN='${pin}',KEY='enervit_pricelist_pin';
  if(sessionStorage.getItem(KEY)==='true'){document.getElementById('pin-gate').style.display='none';return}
  var g=document.getElementById('pin-gate'),i=document.getElementById('pin-input'),
      s=document.getElementById('pin-submit'),e=document.getElementById('pin-error');
  function tryUnlock(){
    if(i.value.trim().toLowerCase()===PIN){
      sessionStorage.setItem(KEY,'true');g.style.opacity='0';g.style.visibility='hidden';
      setTimeout(function(){g.remove()},600);
    }else{
      e.style.opacity='1';i.style.borderColor='#ff6b6b';i.value='';
      setTimeout(function(){e.style.opacity='0';i.style.borderColor='rgba(255,255,255,0.15)'},2500);
    }
  }
  s.addEventListener('click',tryUnlock);
  i.addEventListener('keydown',function(ev){if(ev.key==='Enter')tryUnlock()});
})();
</script>`;
}
