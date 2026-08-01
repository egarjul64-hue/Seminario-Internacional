"use strict";

const SUPABASE_URL = "https://ylkimxuygknonlfalcxl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZOBnu6GwCPUzvlxVGrFLqw_MYHY9kdR";

// El CDN crea window.supabase, así que guardaremos nuestro cliente en otra variable (db) para evitar conflictos de nombres
let db = null;
try {
  db = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
} catch (err) {
  console.error("Error inicializando Supabase:", err);
}

const defaultSchedule = [
  {id:"d10-welcome",day:"10",time:"09:00",type:"Apertura",title:"Recepción y apertura del seminario",description:"Acreditación, bienvenida institucional y presentación de objetivos.",panel:null},
  {id:"d10-gt1",day:"10",time:"10:00",type:"Grupo de trabajo 1",title:"Gobierno y rewiring de las organizaciones",description:"Adaptación organizativa y cultural al dominio ciberespacial y a la IA. Director: Cor. Eduardo García Julián.",panel:null},
  {id:"d10-gt2",day:"10",time:"12:30",type:"Grupo de trabajo 2",title:"Cultura y talento: habilitar al aviador",description:"Cultura organizacional, algoritmo de combate, reskilling y upskilling.",panel:null},
  {id:"d11-gt",day:"11",time:"09:00",type:"Grupos de trabajo",title:"Sesiones de análisis y elaboración de conclusiones",description:"Continuación de los grupos con representantes del Ministerio de Defensa y aliados OTAN.",panel:null},
  {id:"d11-close",day:"11",time:"16:30",type:"Síntesis",title:"Puesta en común de los grupos de trabajo",description:"Consolidación de hallazgos para alimentar las mesas redondas.",panel:null},
  {id:"d12-p1",day:"12",time:"09:00",type:"Panel 1",title:"Ciberespacio y transición al combate algorítmico",description:"Director: Cor. Roberto García Arroba · Estado Mayor del Aire.",panel:1},
  {id:"d12-p2",day:"12",time:"12:00",type:"Panel 2",title:"Computación, conectividad y ciberdefensa post-cuántica",description:"Industria, CESTIC y especialistas en tecnologías de nueva generación.",panel:2},
  {id:"d13-p3",day:"12",time:"09:00",type:"Panel 3",title:"El reto de la cultura, la organización y el talento",description:"Director: GD Fernando Carrillo Cremades – GJSTCIBER.",panel:3},
  {id:"d13-p4",day:"13",time:"11:00",type:"Panel 4",title:"Las ciberoperaciones en los conflictos actuales",description:"Dirección: especialista del Mando Conjunto del Ciberespacio.",panel:4},
  {id:"d13-p5",day:"13",time:"13:00",type:"Panel 5",title:"Transformación, gobernanza e interoperabilidad",description:"CESTIC, EMA/SEGE y representantes de países OTAN.",panel:5},
  {id:"d13-close",day:"13",time:"16:30",type:"Conferencia de clausura",title:"Conclusiones y clausura institucional",description:"Vicealmirante Roca · Mando Conjunto del Ciberespacio.",panel:null}
];

// Estado en memoria
const store = {
  schedule: defaultSchedule,
  panels: [],
  attendees: []
};
const SUPER_ADMIN_EMAIL = "egjulian@hotmail.com"; // Cambia esto por tu correo real de administrador

const escapeHTML = value => String(value ?? "").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const qs=(s,c=document)=>c.querySelector(s);const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
let selectedDay="10";let adminAuthenticated=false;

async function fetchSchedule() {
  if (!db) return;
  const { data, error } = await db.from('schedule').select('*');
  if (!error && data && data.length > 0) {
    store.schedule = data.sort((a,b) => {
      if (a.day !== b.day) return a.day.localeCompare(b.day);
      return a.time.localeCompare(b.time);
    });
  }
}

async function fetchPanels() {
  if (!db) return;
  const { data, error } = await db.from('panels').select('*').order('id');
  if (!error && data && data.length > 0) {
    store.panels = data;
  }
}

async function fetchAttendees() {
  if (!db || !adminAuthenticated) return;
  const { data, error } = await db.from('attendees').select('*').order('registeredAt', { ascending: false });
  if (!error && data) {
    store.attendees = data;
  }
}

async function renderSchedule(){
  const isEn = window.I18N.language === 'en';
  const items=store.schedule.filter(item=>item.day===selectedDay);
  qs("#day-panel").innerHTML=items.map(item=>{
    const type = (isEn && item.type_en) ? item.type_en : item.type;
    const title = (isEn && item.title_en) ? item.title_en : item.title;
    const desc = (isEn && item.description_en) ? item.description_en : item.description;
    return `<article class="timeline-item"><time class="timeline-time">${escapeHTML(item.time)}</time><div><span class="timeline-type">${escapeHTML(type)}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(desc)}</p></div>${item.panel?`<button type="button" data-panel="${item.panel}">Ver panel →</button>`:""}</article>`;
  }).join("")||'<p class="empty-state">No hay actividades programadas.</p>';
}

function renderPanelCards() {
  const isEn = window.I18N.language === 'en';
  qs("#panel-grid").innerHTML = store.panels.map(p => {
    const title = (isEn && p.title_en) ? p.title_en : p.title;
    const summary = (isEn && p.summary_en) ? p.summary_en : p.summary;
    return `<article class="topic-card"><span class="number">0${p.id}</span><span class="date">${p.date}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(summary)}</p><button type="button" data-panel="${p.id}">Explorar temas →</button></article>`;
  }).join("");
}
function openPanel(id) {
  const p = store.panels.find(x => x.id === Number(id));
  if (!p) return;
  const isEn = window.I18N.language === 'en';
  const title = (isEn && p.title_en) ? p.title_en : p.title;
  const summary = (isEn && p.summary_en) ? p.summary_en : p.summary;
  const director = (isEn && p.director_en) ? p.director_en : p.director;
  const participants = (isEn && p.participants_en) ? p.participants_en : p.participants;
  qs("#detail-content").innerHTML = `<p class="eyebrow">${p.date}</p><h2>${escapeHTML(title)}</h2><p class="detail-intro">${escapeHTML(summary)}</p><div class="detail-meta"><strong>${isEn ? 'Direction:' : 'Dirección:'}</strong> ${escapeHTML(director)}<br><strong>${isEn ? 'Participants:' : 'Participantes:'}</strong> ${escapeHTML(participants)}</div><h3>${isEn ? 'Analysis topics' : 'Temas de análisis'}</h3><ol class="topic-list">${p.topics.map(t => { const tTitle = (isEn && t[2]) ? t[2] : t[0]; const tDesc = (isEn && t[3]) ? t[3] : t[1]; return `<li><strong>${escapeHTML(tTitle)}</strong><p>${escapeHTML(tDesc)}</p></li>` }).join("")}</ol>`;
  qs("#detail-modal").showModal();
}
function showToast(message){const toast=qs("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),4200)}
function generateCode(){return "EA26-"+crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0,6).padStart(6,"0")}

async function register(form){
  const data=Object.fromEntries(new FormData(form));
  if (!db) { showToast("Error: Configura Supabase en app.js"); return; }
  
  const code = generateCode();
  
  // Extraer los campos específicos a details
  const attendanceType = data.attendance_type;
  const details = {};
  
  if (attendanceType === "panel") {
    details.rank = data.rank?.trim() || "";
    details.passport = data.passport?.trim() || "";
    details.arrival_dtg = data.arrival_dtg || "";
    details.departure_dtg = data.departure_dtg || "";
    details.lodging = data.lodging ? "Yes" : "No";
    details.allergies = data.allergies?.trim() || "";
    details.visit = data.visit || "";
    details.companion = data.companion?.trim() || "";
  } else if (attendanceType === "public") {
    details.activity_gt = data.activity_gt ? "Yes" : "No";
    details.activity_p1 = data.activity_p1 ? "Yes" : "No";
    details.activity_p2 = data.activity_p2 ? "Yes" : "No";
    details.activity_p3 = data.activity_p3 ? "Yes" : "No";
    details.activity_p4 = data.activity_p4 ? "Yes" : "No";
    details.activity_p5 = data.activity_p5 ? "Yes" : "No";
    details.activity_close = data.activity_close ? "Yes" : "No";
  }

  const attendee = {
    name:data.name.trim(),
    role:data.role.trim(),
    organization:data.organization.trim(),
    email:data.email.trim(),
    phone:data.phone.trim(),
    status:"En proceso",
    code:code,
    attendance_type: attendanceType,
    registration_details: details
  };

  const { error } = await db.from('attendees').insert([attendee]);
  
  if (error) {
    showToast("Hubo un error al registrar su solicitud. Inténtelo más tarde.");
    console.error(error);
  } else {
    form.reset();
    qs("#section-panel").hidden = true;
    qs("#section-public").hidden = true;
    showToast(`Solicitud registrada. Guarde su código de acceso: ${code}`);
    if(adminAuthenticated) {
      await fetchAttendees();
      renderAdminAttendees();
    }
  }
}

async function attendeeLogin(form){
  const data=Object.fromEntries(new FormData(form));
  if (!db) return;
  
  const { data: attendeesData, error } = await db.rpc('get_attendee_by_code', {
    p_email: data.email.trim(),
    p_code: data.code.trim()
  });

  if (error || !attendeesData || attendeesData.length === 0) {
    qs(".form-message",form).textContent="No se ha encontrado una solicitud con esos datos o hubo un error.";
    return;
  }
  
  form.hidden=true;
  renderProfile(attendeesData[0]);
}

function renderProfile(a){
  const statusClass=a.status==="Autorizada"?"authorized":a.status==="Denegada"?"denied":"";
  const el=qs("#attendee-profile");el.hidden=false;
  
  let detailsHTML = "";
  if (a.attendance_type === "panel") {
    detailsHTML = `<div><span>Asistencia</span><strong>Participante en paneles</strong></div>
    <div><span>Empleo / Rango</span><strong>${escapeHTML(a.registration_details?.rank)}</strong></div>
    <div><span>Llegada (DTG)</span><strong>${escapeHTML(a.registration_details?.arrival_dtg)}</strong></div>
    <div><span>Salida (DTG)</span><strong>${escapeHTML(a.registration_details?.departure_dtg)}</strong></div>
    <div><span>Alojamiento Residencia</span><strong>${escapeHTML(a.registration_details?.lodging==="Yes"?"Sí":"No")}</strong></div>`;
  } else if (a.attendance_type === "public") {
    detailsHTML = `<div><span>Asistencia</span><strong>Público general</strong></div>`;
  }
  
  el.innerHTML=`<div class="profile-card"><span class="profile-status ${statusClass}">${escapeHTML(a.status)}</span><h3>${escapeHTML(a.name)}</h3><div class="profile-grid"><div><span>Organismo</span><strong>${escapeHTML(a.organization)}</strong></div><div><span>Cargo</span><strong>${escapeHTML(a.role)}</strong></div><div><span>Correo</span><strong>${escapeHTML(a.email)}</strong></div><div><span>Teléfono</span><strong>${escapeHTML(a.phone)}</strong></div><div><span>Código</span><strong>${escapeHTML(a.code)}</strong></div><div><span>Solicitud</span><strong>${new Date(a.registeredAt).toLocaleDateString(window.I18N?.locale||"es-ES")}</strong></div>${detailsHTML}</div></div><button class="button" id="profile-exit" type="button" style="margin-top:18px">Salir</button>`;
  qs("#profile-exit").onclick=()=>{el.hidden=true;qs("#attendee-login").hidden=false;qs("#attendee-login").reset()}
}

async function openAdmin(){
  // Check active session
  if (db) {
    const { data: { session } } = await db.auth.getSession();
    adminAuthenticated = !!session;
  }
  
  qs("#admin-login-view").hidden=adminAuthenticated;
  qs("#admin-dashboard").hidden=!adminAuthenticated;
  if(adminAuthenticated){
    await fetchAttendees();
    renderAdminActivities();
    renderAdminPanels();
    renderAdminAttendees();
  }
  qs("#admin-modal").showModal();
}

function renderAdminActivities(){
  const root=qs("#admin-activities");
  root.innerHTML=`<div class="admin-list">${store.schedule.map(i=> {
    const typeEn = i.type_en || (window.getTranslation ? window.getTranslation(i.type, 'en') : '');
    const titleEn = i.title_en || (window.getTranslation ? window.getTranslation(i.title, 'en') : '');
    const descEn = i.description_en || (window.getTranslation ? window.getTranslation(i.description, 'en') : '');
    return `<div><div class="admin-row"><strong>${escapeHTML(i.day)} NOV<br><small>${escapeHTML(i.time)}</small></strong><div><span class="timeline-type">${escapeHTML(i.type)}</span><b>${escapeHTML(i.title)}</b></div><button type="button" data-edit="${escapeHTML(i.id)}">Editar</button></div><form class="admin-edit" data-edit-form="${escapeHTML(i.id)}" hidden><label>Día (Número)<input name="day" value="${escapeHTML(i.day)}" required></label><label>Hora<input name="time" value="${escapeHTML(i.time)}" required></label><label>Tipo (Español)<input name="type" value="${escapeHTML(i.type)}" required></label><label>Tipo (Inglés)<input name="type_en" value="${escapeHTML(typeEn)}" style="border-color:#bbf;margin-bottom:15px"></label><label>Título (Español)<input name="title" value="${escapeHTML(i.title)}" required></label><label>Título (Inglés)<input name="title_en" value="${escapeHTML(titleEn)}" style="border-color:#bbf;margin-bottom:15px"></label><label>Descripción (Español)<textarea name="description" required>${escapeHTML(i.description)}</textarea></label><label>Descripción (Inglés)<textarea name="description_en" style="border-color:#bbf">${escapeHTML(descEn)}</textarea></label><button class="button" type="submit">Guardar cambios</button></form></div>`;
  }).join("")}</div>`;
}
function renderAdminPanels() {
  const root = qs("#admin-panels");
  root.innerHTML = `<div class="admin-list">${store.panels.map(p => {
    const titleEn = p.title_en || (window.getTranslation ? window.getTranslation(p.title, 'en') : '');
    const summaryEn = p.summary_en || (window.getTranslation ? window.getTranslation(p.summary, 'en') : '');
    const directorEn = p.director_en || (window.getTranslation ? window.getTranslation(p.director, 'en') : '');
    const partEn = p.participants_en || (window.getTranslation ? window.getTranslation(p.participants, 'en') : '');
    
    return `<div><div class="admin-row"><strong>${escapeHTML(p.date)}</strong><div><b>${escapeHTML(p.title)}</b></div><button type="button" data-edit-panel="${escapeHTML(p.id)}">Editar</button></div><form class="admin-edit" data-edit-panel-form="${escapeHTML(p.id)}" hidden>
    <label>Fecha<input name="date" value="${escapeHTML(p.date)}" required></label>
    <label>Título (Español)<input name="title" value="${escapeHTML(p.title)}" required></label>
    <label>Título (Inglés)<input name="title_en" value="${escapeHTML(titleEn)}" style="border-color:#bbf;margin-bottom:15px"></label>
    <label>Resumen (Español)<textarea name="summary" required>${escapeHTML(p.summary)}</textarea></label>
    <label>Resumen (Inglés)<textarea name="summary_en" style="border-color:#bbf;margin-bottom:15px">${escapeHTML(summaryEn)}</textarea></label>
    <label>Director (Español)<input name="director" value="${escapeHTML(p.director)}" required></label>
    <label>Director (Inglés)<input name="director_en" value="${escapeHTML(directorEn)}" style="border-color:#bbf;margin-bottom:15px"></label>
    <label>Participantes (Español)<input name="participants" value="${escapeHTML(p.participants)}" required></label>
    <label>Participantes (Inglés)<input name="participants_en" value="${escapeHTML(partEn)}" style="border-color:#bbf;margin-bottom:15px"></label>
    <label style="margin-bottom:8px">Temas de análisis (ES / EN)</label><div data-idx="${p.topics.length}">${p.topics.map((t,i)=>{const enTitle=t[2]||(window.getTranslation?window.getTranslation(t[0],'en'):'');const enDesc=t[3]||(window.getTranslation?window.getTranslation(t[1],'en'):'');return`<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;padding:10px;background:#f0f4f8;border:1px solid #ddd;border-radius:4px;position:relative"><button type="button" onclick="this.parentElement.remove()" style="position:absolute;top:5px;right:5px;background:none;border:none;color:red;cursor:pointer;font-weight:bold" title="Eliminar tema">X</button><input name="topic_title_${i}" placeholder="Título (Español)" value="${escapeHTML(t[0]||'')}" style="margin-right:20px"><textarea name="topic_desc_${i}" placeholder="Descripción (Español)">${escapeHTML(t[1]||'')}</textarea><input name="topic_title_en_${i}" placeholder="Título (Inglés)" value="${escapeHTML(enTitle)}" style="margin-right:20px;margin-top:10px;border-color:#bbf"><textarea name="topic_desc_en_${i}" placeholder="Descripción (Inglés)" style="border-color:#bbf">${escapeHTML(enDesc)}</textarea></div>`}).join("")}</div><button type="button" onclick="const d=this.previousElementSibling;const i=parseInt(d.dataset.idx);d.dataset.idx=i+1;const n=document.createElement('div');n.style.cssText='display:flex;flex-direction:column;gap:5px;margin-bottom:10px;padding:10px;background:#f0f4f8;border:1px solid #ddd;border-radius:4px;position:relative';n.innerHTML='<button type=\\'button\\' onclick=\\'this.parentElement.remove()\\' style=\\'position:absolute;top:5px;right:5px;background:none;border:none;color:red;cursor:pointer;font-weight:bold\\' title=\\'Eliminar tema\\'>X</button><input name=\\'topic_title_'+i+'\\' placeholder=\\'Título (Español)\\' style=\\'margin-right:20px\\'><textarea name=\\'topic_desc_'+i+'\\' placeholder=\\'Descripción (Español)\\'></textarea><input name=\\'topic_title_en_'+i+'\\' placeholder=\\'Título (Inglés)\\' style=\\'margin-right:20px;margin-top:10px;border-color:#bbf\\'><textarea name=\\'topic_desc_en_'+i+'\\' placeholder=\\'Descripción (Inglés)\\' style=\\'border-color:#bbf\\'></textarea>';d.appendChild(n)" style="margin-bottom:15px;padding:6px 12px;font-size:14px;background:none;border:1px dashed var(--blue);color:var(--blue);cursor:pointer;border-radius:4px;">+ Añadir Tema</button><button class="button" type="submit">Guardar cambios del Panel</button></form></div>`;
  }).join("")}</div>`;
}
function renderAdminAttendees(){
  const data=store.attendees;
  qs("#attendee-count").textContent=data.length;
  if (!data.length) {
    qs("#admin-attendees").innerHTML = '<p class="empty-state">Todavía no se ha recibido ninguna inscripción.</p>';
    return;
  }
  const buttonsHtml = `<div style="display:flex; justify-content:flex-end; gap:8px; margin-bottom:16px;">
    <button class="button button-ghost" type="button" onclick="exportAttendeesToExcel()" style="padding:8px 16px; font-size:14px; color:var(--blue); border-color:var(--blue);">Exportar a Excel</button>
    <button class="button button-ghost" type="button" onclick="exportAttendeesToPDF()" style="padding:8px 16px; font-size:14px; color:var(--blue); border-color:var(--blue);">Exportar a PDF</button>
  </div>`;
  const tableHtml = `<table class="attendee-table"><thead><tr><th>Asistente</th><th>Organismo / cargo</th><th>Modalidad</th><th>Contacto</th><th>Estado</th></tr></thead><tbody>${data.map(a=>`<tr><td data-label="Asistente"><strong>${escapeHTML(a.name)}</strong><br><small>${escapeHTML(a.code)}</small></td><td data-label="Organismo">${escapeHTML(a.organization)}<br><small>${escapeHTML(a.role)}</small></td><td data-label="Modalidad">${a.attendance_type==="panel"?"Participante":"Público"}<br><small><a href="#" data-details="${a.id}" style="color:var(--blue);text-decoration:underline;">Ver detalles</a></small></td><td data-label="Contacto">${escapeHTML(a.email)}<br>${escapeHTML(a.phone)}</td><td data-label="Estado"><select data-status="${a.id}" aria-label="Estado de ${escapeHTML(a.name)}"><option value="En proceso"${a.status==="En proceso"?" selected":""}>En proceso</option><option value="Autorizada"${a.status==="Autorizada"?" selected":""}>Autorizada</option><option value="Denegada"${a.status==="Denegada"?" selected":""}>Denegada</option></select></td></tr>`).join("")}</tbody></table>`;
  qs("#admin-attendees").innerHTML = buttonsHtml + tableHtml;
}

qsa("[data-day]").forEach(button=>button.addEventListener("click",()=>{selectedDay=button.dataset.day;qsa("[data-day]").forEach(b=>b.setAttribute("aria-selected",String(b===button)));renderSchedule()}));
qsa("[data-language]").forEach(button=>button.addEventListener("click", () => {
  setTimeout(() => renderSchedule(), 50);
}));
document.addEventListener("click",e=>{
  const panelButton=e.target.closest("[data-panel]");if(panelButton)openPanel(panelButton.dataset.panel);
  const opener=e.target.closest("[data-open]");if(opener){if(opener.dataset.open==="admin-modal")openAdmin();else qs(`#${opener.dataset.open}`).showModal()}
  const closer=e.target.closest("[data-close]");if(closer)closer.closest("dialog").close();
  const detailsBtn=e.target.closest("[data-details]");if(detailsBtn){e.preventDefault();showAttendeeDetails(Number(detailsBtn.dataset.details));}
});
qsa("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
qs(".menu-toggle").addEventListener("click",e=>{const open=qs("#nav-links").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",String(open))});qsa("#nav-links a").forEach(a=>a.addEventListener("click",()=>qs("#nav-links").classList.remove("open")));
qs("#registration-form").addEventListener("submit",e=>{e.preventDefault();register(e.currentTarget)});
qs("#attendee-login").addEventListener("submit",e=>{e.preventDefault();attendeeLogin(e.currentTarget)});

// Toggle dynamic form sections
qs("#registration-form").addEventListener("change", e => {
  if(e.target.name === "attendance_type") {
    qs("#section-panel").hidden = e.target.value !== "panel";
    qs("#section-public").hidden = e.target.value !== "public";
  }
});

function showAttendeeDetails(id) {
  const a = store.attendees.find(x => x.id === id);
  if(!a) return;
  const d = a.registration_details || {};
  let content = `<h2>Detalles de Inscripción</h2><p class="eyebrow">${escapeHTML(a.name)} - ${a.attendance_type==="panel"?"Participante":"Público general"}</p><div class="profile-grid">`;
  if (a.attendance_type === "panel") {
    content += `<div><span>Empleo / Rango</span><strong>${escapeHTML(d.rank)}</strong></div>
                <div><span>DNI / Pasaporte</span><strong>${escapeHTML(d.passport)}</strong></div>
                <div><span>Llegada (DTG)</span><strong>${escapeHTML(d.arrival_dtg)}</strong></div>
                <div><span>Salida (DTG)</span><strong>${escapeHTML(d.departure_dtg)}</strong></div>
                <div><span>Alojamiento (Residencia)</span><strong>${d.lodging==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Alergias</span><strong>${escapeHTML(d.allergies)}</strong></div>
                <div><span>Visita Social</span><strong>${escapeHTML(d.visit)}</strong></div>
                <div><span>Acompañante</span><strong>${escapeHTML(d.companion)}</strong></div>`;
  } else {
    content += `<div><span>Conclusiones GT</span><strong>${d.activity_gt==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Panel 1</span><strong>${d.activity_p1==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Panel 2</span><strong>${d.activity_p2==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Panel 3</span><strong>${d.activity_p3==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Panel 4</span><strong>${d.activity_p4==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Panel 5</span><strong>${d.activity_p5==="Yes"?"Sí":"No"}</strong></div>
                <div><span>Clausura</span><strong>${d.activity_close==="Yes"?"Sí":"No"}</strong></div>`;
  }
  content += `</div>`;
  qs("#detail-content").innerHTML = content;
  qs("#detail-modal").showModal();
}

qs("#admin-login").addEventListener("submit", async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget));
  if (!db) return;
  
  const { error } = await db.auth.signInWithPassword({
    email: data.username, 
    password: data.password
  });

  if (error) {
    qs(".form-message",e.currentTarget).textContent="Credenciales incorrectas.";
  } else {
    adminAuthenticated = true;
    qs("#admin-login-view").hidden=true;
    qs("#admin-dashboard").hidden=false;
    
    // Check super admin for users tab
    const usersTab = qs('[data-admin-tab="users"]');
    if (usersTab) {
      if (data.user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
        usersTab.style.display = "";
      } else {
        usersTab.style.display = "none";
      }
    }

    await fetchAttendees();
    renderAdminActivities();
    renderAdminPanels();
    renderAdminAttendees();
  }
});

qs("#admin-logout").addEventListener("click", async ()=>{
  if(db) await db.auth.signOut();
  adminAuthenticated=false;
  qs("#admin-dashboard").hidden=true;
  qs("#admin-login-view").hidden=false;
  qs("#admin-login").reset();
});

qs("#admin-dashboard").addEventListener("click",e=>{
  const edit=e.target.closest("[data-edit]");if(edit){const form=qs(`[data-edit-form="${CSS.escape(edit.dataset.edit)}"]`);form.hidden=!form.hidden}
  const editPanel=e.target.closest("[data-edit-panel]");if(editPanel){const form=qs(`[data-edit-panel-form="${CSS.escape(editPanel.dataset.editPanel)}"]`);form.hidden=!form.hidden}
  const tab=e.target.closest("[data-admin-tab]");if(tab){qsa("[data-admin-tab]").forEach(b=>b.classList.toggle("active",b===tab));qs("#admin-activities").hidden=tab.dataset.adminTab!=="activities";qs("#admin-panels").hidden=tab.dataset.adminTab!=="panels";qs("#admin-attendees").hidden=tab.dataset.adminTab!=="attendees";qs("#admin-users").hidden=tab.dataset.adminTab!=="users"}
});

qs("#admin-dashboard").addEventListener("submit", async e=>{
  const form=e.target.closest("form");
  if(!form)return;
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  
  if (form.matches("[data-edit-form]")) {
    if (db) {
      const { error } = await db.from('schedule').update(data).eq('id', form.dataset.editForm);
      if (!error) {
        await fetchSchedule();
        renderSchedule();
        renderAdminActivities();
        showToast("Actividad actualizada correctamente.");
        form.hidden = true;
      } else {
        showToast("Error al actualizar la actividad.");
      }
    }
  } else if (form.matches("[data-edit-panel-form]")) {
    if (db) {
      const topicsArray = [];
      const keys = Object.keys(data).filter(k => k.startsWith("topic_title_") && !k.startsWith("topic_title_en_"));
      keys.forEach(k => {
        const idx = k.replace("topic_title_", "");
        const title = data[k].trim();
        const desc = data[`topic_desc_${idx}`]?.trim() || "";
        const title_en = data[`topic_title_en_${idx}`]?.trim() || "";
        const desc_en = data[`topic_desc_en_${idx}`]?.trim() || "";
        if (title) topicsArray.push([title, desc, title_en, desc_en]);
        delete data[k];
        delete data[`topic_desc_${idx}`];
        delete data[`topic_title_en_${idx}`];
        delete data[`topic_desc_en_${idx}`];
      });
      data.topics = topicsArray;
      const { error } = await db.from('panels').update(data).eq('id', form.dataset.editPanelForm);
      if (!error) {
        await fetchPanels();
        renderPanelCards();
        renderAdminPanels();
        showToast("Panel actualizado correctamente.");
        form.hidden = true;
      } else {
        showToast("Error al actualizar el panel.");
      }
    }
  }
});

qs("#admin-dashboard").addEventListener("change", async e=>{
  if(!e.target.matches("[data-status]"))return;
  if(db) {
    const { error } = await db.from('attendees').update({ status: e.target.value }).eq('id', Number(e.target.dataset.status));
    if (!error) {
      await fetchAttendees();
      showToast("Estado de inscripción actualizado.");
    } else {
      showToast("Error al actualizar el estado.");
    }
  }
});

qs("#admin-create-user")?.addEventListener("submit", async e=>{
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  if (!db) return;
  
  const { error } = await db.auth.signUp({
    email: data.email,
    password: data.password
  });

  if (error) {
    showToast("Error al crear administrador: " + error.message);
  } else {
    showToast("Administrador creado correctamente.");
    form.reset();
  }
});

async function init() {
  await Promise.all([fetchSchedule(), fetchPanels()]);
  renderSchedule();
  renderPanelCards();
}

window.exportAttendeesToExcel = function() {
  if (!window.XLSX) return showToast("Error: Librería XLSX no cargada.");
  const panels = store.attendees.filter(a => a.attendance_type === "panel").map(a => ({
    "Nombre": a.name, "Organismo": a.organization, "Cargo": a.role, "Email": a.email, "Teléfono": a.phone,
    "Código": a.code, "Estado": a.status, "Empleo/Rango": a.registration_details?.rank || "",
    "DNI/Pasaporte": a.registration_details?.passport || "", "Llegada": a.registration_details?.arrival_dtg || "",
    "Salida": a.registration_details?.departure_dtg || "", "Alojamiento": a.registration_details?.lodging === "Yes" ? "Sí" : "No",
    "Alergias": a.registration_details?.allergies || "", "Visita Social": a.registration_details?.visit === "Yes" ? "Sí" : "No",
    "Acompañante": a.registration_details?.companion || ""
  }));
  const publico = store.attendees.filter(a => a.attendance_type !== "panel").map(a => ({
    "Nombre": a.name, "Organismo": a.organization, "Cargo": a.role, "Email": a.email, "Teléfono": a.phone,
    "Código": a.code, "Estado": a.status, "Conclusiones GT": a.registration_details?.activity_gt === "Yes" ? "Sí" : "No",
    "Panel 1": a.registration_details?.activity_p1 === "Yes" ? "Sí" : "No",
    "Panel 2": a.registration_details?.activity_p2 === "Yes" ? "Sí" : "No",
    "Panel 3": a.registration_details?.activity_p3 === "Yes" ? "Sí" : "No",
    "Panel 4": a.registration_details?.activity_p4 === "Yes" ? "Sí" : "No",
    "Panel 5": a.registration_details?.activity_p5 === "Yes" ? "Sí" : "No",
    "Clausura": a.registration_details?.activity_close === "Yes" ? "Sí" : "No"
  }));
  
  const wb = XLSX.utils.book_new();
  if (panels.length > 0) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(panels), "Participantes");
  if (publico.length > 0) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(publico), "Público General");
  if (panels.length === 0 && publico.length === 0) return showToast("No hay datos para exportar.");
  XLSX.writeFile(wb, "Inscritos_Seminario.xlsx");
};

window.exportAttendeesToPDF = function() {
  if (!window.jspdf || !window.jspdf.jsPDF) return showToast("Error: Librería jsPDF no cargada.");
  const doc = new window.jspdf.jsPDF('landscape');
  
  doc.setFontSize(16);
  doc.text("Listado de Inscritos - Seminario Internacional EA", 14, 15);
  
  const panelRows = store.attendees.filter(a => a.attendance_type === "panel").map(a => [
    a.name, a.organization, a.role, a.email, a.phone, a.registration_details?.passport || "",
    a.registration_details?.lodging === "Yes" ? "Sí" : "No", a.status
  ]);
  
  let finalY = 15;
  if (panelRows.length > 0) {
    doc.setFontSize(12);
    doc.text("Participantes en Paneles", 14, 25);
    doc.autoTable({ startY: 30, head: [["Nombre", "Organismo", "Cargo", "Email", "Teléfono", "DNI/Pasap.", "Aloj.", "Estado"]], body: panelRows, headStyles: { fillColor: [6, 29, 61] } });
    finalY = doc.lastAutoTable.finalY;
  }
  
  const pubRows = store.attendees.filter(a => a.attendance_type !== "panel").map(a => [
    a.name, a.organization, a.role, a.email, a.phone, a.status
  ]);
  
  if (pubRows.length > 0) {
    doc.setFontSize(12);
    doc.text("Público General", 14, finalY + 15);
    doc.autoTable({ startY: finalY + 20, head: [["Nombre", "Organismo", "Cargo", "Email", "Teléfono", "Estado"]], body: pubRows, headStyles: { fillColor: [6, 29, 61] } });
  }
  
  if (panelRows.length === 0 && pubRows.length === 0) return showToast("No hay datos para exportar.");
  doc.save("Inscritos_Seminario.pdf");
};

init();
