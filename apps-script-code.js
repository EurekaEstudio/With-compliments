// ===================================================
// EUREKA ESTUDIO CREATIVO — GOOGLE APPS SCRIPT (v5 - FINAL ULTIMATE)
// ===================================================
// INSTRUCCIONES:
// 1. Reemplaza todo el código en tu Apps Script con este.
// 2. Si tu script es "Standalone", pega el ID de tu sheet en SPREADSHEET_ID.
// 3. Dale a Implementar -> Nueva Versión.
// ===================================================

const CONFIG = {
  EMAIL_DESTINO: 'info@eurekaestudiocreativo.com',
  NOMBRE_HOJA: 'Leads Landing', // Asegúrate de que tu pestaña se llame así
  RECAPTCHA_SECRET: '6LeLlXUsAAAAADUxHJvl33mXaMqjqxAVGz7rS-bQ',
  // Si usas el script desde el Sheet, esto funciona solo. 
  // Si no, pega aquí el ID de la URL entre /d/ y /edit
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet() ? SpreadsheetApp.getActiveSpreadsheet().getId() : null
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    Logger.log('--- NUEVO LEAD RECIBIDO (v5) ---');

    // 1. Extracción de datos ultra-flexible (JSON o Form)
    var data = {};
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
      Logger.log('Formato: parameter');
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log('Formato: JSON');
      } catch (f) {
        data = { raw_data: e.postData.contents };
        Logger.log('Formato: Desconocido');
      }
    }

    // Normalizar campos
    data.nombre = data.nombre || data.nombre_form || data.name || 'Sin nombre';
    data.whatsapp = data.whatsapp || data.telefono || data.phone || '';
    data.email = data.email || '';
    data.plan = data.plan || '';
    data.rubro = data.rubro || '';
    data.recaptcha_status = 'NO_VALIDATED';

    // 2. Validación reCAPTCHA (AHORA NO BLOQUEANTE)
    if (data.recaptcha_token && data.recaptcha_token !== 'not_configured') {
      try {
        if (verificarRecaptcha(data.recaptcha_token)) {
          data.recaptcha_status = 'VALID';
          Logger.log('✅ reCAPTCHA Válido');
        } else {
          data.recaptcha_status = 'INVALID';
          Logger.log('⚠️ reCAPTCHA Inválido (pero continuamos)');
        }
      } catch (err) {
        data.recaptcha_status = 'ERROR: ' + err.message;
        Logger.log('⚠️ reCAPTCHA Error técnico: ' + err.message);
      }
    }

    // 3. Guardar en Sheet (con protección contra fallos totales)
    var sheetError = null;
    try {
      guardarEnSheet(data);
    } catch (err) {
      sheetError = err.message;
      Logger.log("❌ Error Sheet: " + err.message);
    }

    // 4. Enviar Emails (Independientes)
    try {
      enviarEmailNotificacion(data, sheetError);
    } catch (err) {
      Logger.log("❌ Error Email Notif: " + err.message);
    }

    try {
      if (data.email) enviarEmailConfirmacion(data);
    } catch (err) {
      Logger.log("❌ Error Email Confirm: " + err.message);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead procesado',
        recaptcha: data.recaptcha_status,
        sheet_status: sheetError ? 'FAILED: ' + sheetError : 'OK'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ ERROR CRÍTICO: ' + error.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function verificarRecaptcha(token) {
  if (CONFIG.RECAPTCHA_SECRET === 'TU_SECRET_KEY_AQUI') return true;
  var response = UrlFetchApp.fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "post",
    payload: {
      secret: CONFIG.RECAPTCHA_SECRET,
      response: token
    }
  });
  var result = JSON.parse(response.getContentText());
  return result.success;
}

function guardarEnSheet(data) {
  var ss;
  try {
    ss = CONFIG.SPREADSHEET_ID ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('No se detectó Spreadsheet activo. Configura el ID manualmente en el script.');
  } catch (e) {
    throw new Error('Error abriendo el Sheet: ' + e.message);
  }

  var sheet = ss.getSheetByName(CONFIG.NOMBRE_HOJA);
  if (!sheet) {
    Logger.log('⚠️ Pestaña no encontrada, usando la primera.');
    sheet = ss.getSheets()[0];
  }
  if (!sheet) throw new Error('El documento no tiene pestañas.');

  sheet.getRange('C:C').setNumberFormat('@'); // WhatsApp como texto

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'WhatsApp', 'Email', 'Plan', 'Rubro', 'reCAPTCHA', 'Fuente']);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#0a0a0a').setFontColor('#22C6EA');
  }

  sheet.appendRow([
    Utilities.formatDate(new Date(), 'America/Santiago', 'dd/MM/yyyy HH:mm'),
    data.nombre,
    data.whatsapp,
    data.email,
    data.plan,
    data.rubro,
    data.recaptcha_status,
    'landing_formulario'
  ]);
}

function enviarEmailNotificacion(data, errorSheet) {
  const planesMap = {
    'base': '🚀 Smart Landing Base — $249.990',
    'agente': '🤖 Pack Agente IA — $499.990',
    'growth': '📈 Ecosistema Growth — $999.990',
    'orientacion': '💬 Quiere orientación gratuita'
  };
  const planNombre = planesMap[data.plan] || data.plan || 'No especificado';
  const waLink = 'https://wa.me/' + (data.whatsapp || '').replace(/\D/g, '');

  let statusMsg = errorSheet ?
    `<div style="background:#ff000022; color:#ff4444; padding:10px; border-radius:8px; margin-bottom:15px; border:1px solid #ff444433;">
       ⚠️ ATENCIÓN: No se pudo guardar en el Excel automáticamente. Error: ${errorSheet}
     </div>` : '';

  MailApp.sendEmail({
    to: CONFIG.EMAIL_DESTINO,
    subject: '⚡ Nuevo Lead Eureka: ' + data.nombre,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #222;color:#eee;">
        <div style="background:linear-gradient(135deg,#0a0a0a,#0d1a1f);padding:28px 24px;text-align:center;border-bottom:1px solid #22C6EA33;">
          <h2 style="color:#22C6EA;margin:0;">⚡ Nuevo Lead desde la Landing</h2>
        </div>
        <div style="padding:24px;">
          ${statusMsg}
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">👤 Nombre</div>
              <div style="font-size:15px;">${data.nombre}</div>
            </td></tr>
            <tr><td style="padding:4px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">📱 WhatsApp</div>
              <div style="font-size:15px;"><a href="${waLink}" style="color:#22C6EA;">${data.whatsapp}</a></div>
            </td></tr>
            <tr><td style="padding:4px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">🎯 Plan</div>
              <div style="font-size:15px;color:#22C6EA;font-weight:bold;">${planNombre}</div>
            </td></tr>
             <tr><td style="padding:4px 0;"></td></tr>
            <tr><td style="padding:10px;background:#1a1a1a;border-radius:6px;">
              <div style="font-size:11px;color:#555;text-transform:uppercase;">🛡️ reCAPTCHA</div>
              <div style="font-size:13px; color: ${data.recaptcha_status === 'VALID' ? '#44ff44' : '#ff4444'}">${data.recaptcha_status}</div>
            </td></tr>
          </table>
        </div>
      </div>
    `
  });
}

function enviarEmailConfirmacion(data) {
  if (!data.email) return;
  const planesMap = {
    'base': 'Smart Landing Base ($249.990 CLP)',
    'agente': 'Pack Agente IA ($499.990 CLP)',
    'growth': 'Ecosistema Growth ($999.990 CLP)',
    'orientacion': 'Auditoría Gratuita'
  };
  const planNombre = planesMap[data.plan] || 'nuestros servicios';

  MailApp.sendEmail({
    to: data.email,
    subject: '✅ Recibimos tu consulta — Eureka Estudio Creativo',
    htmlBody: `
      <div style="font-family:Arial,sans-serif;background:#f4f4f5;padding:20px;">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
          <div style="background:#000;padding:32px 24px;text-align:center;">
            <h2 style="color:#22C6EA;margin:0;">Eureka Estudio Creativo</h2>
          </div>
          <div style="padding:32px 24px;color:#333;">
            <p>Hola <strong>${data.nombre}</strong>,</p>
            <p>Ya recibimos tu interés por el <strong>${planNombre}</strong>. Un especialista te contactará por WhatsApp a la brevedad.</p>
            <p style="font-size:12px;color:#999;border-top:1px solid #eee;padding-top:16px;">© ${new Date().getFullYear()} Eureka Estudio Creativo</p>
          </div>
        </div>
      </div>
    `
  });
}

function testScript() {
  doPost({
    parameter: {
      nombre: 'Test Robusto v5',
      whatsapp: '+56 9 9999 9999',
      email: 'info@eurekaestudiocreativo.com',
      plan: 'agente',
      rubro: 'Test',
      recaptcha_token: 'not_configured'
    }
  });
}
