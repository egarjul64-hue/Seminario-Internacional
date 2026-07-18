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
  {id:"d13-p3",day:"13",time:"09:00",type:"Panel 3",title:"El reto de la cultura, la organización y el talento",description:"Director: GD Fernando Carrillo Cremades · GJSTCIBER.",panel:3},
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

const escapeHTML = value => String(value ?? "").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const qs=(s,c=document)=>c.querySelector(s);const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
let selectedDay="10";let adminAuthenticated=false;

async function fetchSchedule() {
  if (!db) return;
  const { data, error } = await db.from('schedule').select('*').order('time');
  if (!error && data && data.length > 0) {
    store.schedule = data;
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
  const items=store.schedule.filter(item=>item.day===selectedDay);
  qs("#day-panel").innerHTML=items.map(item=>`<article class="timeline-item"><time class="timeline-time">${escapeHTML(item.time)}</time><div><span class="timeline-type">${escapeHTML(item.type)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></div>${item.panel?`<button type="button" data-panel="${item.panel}">Ver panel →</button>`:""}</article>`).join("")||'<p class="empty-state">No hay actividades programadas.</p>';
}

function renderPanelCards(){qs("#panel-grid").innerHTML=store.panels.map(p=>`<article class="topic-card"><span class="number">0${p.id}</span><span class="date">${p.date}</span><h3>${p.title}</h3><p>${p.summary}</p><button type="button" data-panel="${p.id}">Explorar temas →</button></article>`).join("")}
function openPanel(id){const p=store.panels.find(x=>x.id===Number(id));if(!p)return;qs("#detail-content").innerHTML=`<p class="eyebrow">${p.date}</p><h2>${p.title}</h2><p class="detail-intro">${p.summary}</p><div class="detail-meta"><strong>Dirección:</strong> ${p.director}<br><strong>Participantes:</strong> ${p.participants}</div><h3>Temas de análisis</h3><ol class="topic-list">${p.topics.map(t=>`<li><strong>${escapeHTML(t[0])}</strong><p>${escapeHTML(t[1])}</p></li>`).join("")}</ol>`;qs("#detail-modal").showModal()}
function showToast(message){const toast=qs("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),4200)}
function generateCode(){return "EA26-"+crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0,6).padStart(6,"0")}

async function register(form){
  const data=Object.fromEntries(new FormData(form));
  if (!db) { showToast("Error: Configura Supabase en app.js"); return; }
  
  const code = generateCode();
  const attendee = {
    name:data.name.trim(),
    role:data.role.trim(),
    organization:data.organization.trim(),
    email:data.email.trim(),
    phone:data.phone.trim(),
    status:"En proceso",
    code:code
  };

  const { error } = await db.from('attendees').insert([attendee]);
  
  if (error) {
    showToast("Hubo un error al registrar su solicitud. Inténtelo más tarde.");
    console.error(error);
  } else {
    form.reset();
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
  el.innerHTML=`<div class="profile-card"><span class="profile-status ${statusClass}">${escapeHTML(a.status)}</span><h3>${escapeHTML(a.name)}</h3><div class="profile-grid"><div><span>Organismo</span><strong>${escapeHTML(a.organization)}</strong></div><div><span>Cargo</span><strong>${escapeHTML(a.role)}</strong></div><div><span>Correo</span><strong>${escapeHTML(a.email)}</strong></div><div><span>Teléfono</span><strong>${escapeHTML(a.phone)}</strong></div><div><span>Código</span><strong>${escapeHTML(a.code)}</strong></div><div><span>Solicitud</span><strong>${new Date(a.registeredAt).toLocaleDateString(window.I18N?.locale||"es-ES")}</strong></div></div></div><button class="button" id="profile-exit" type="button" style="margin-top:18px">Salir</button>`;
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

function renderAdminActivities(){const root=qs("#admin-activities");root.innerHTML=`<div class="admin-list">${store.schedule.map(i=>`<div><div class="admin-row"><strong>${escapeHTML(i.day)} NOV<br><small>${escapeHTML(i.time)}</small></strong><div><span class="timeline-type">${escapeHTML(i.type)}</span><b>${escapeHTML(i.title)}</b></div><button type="button" data-edit="${escapeHTML(i.id)}">Editar</button></div><form class="admin-edit" data-edit-form="${escapeHTML(i.id)}" hidden><label>Hora<input name="time" value="${escapeHTML(i.time)}" required></label><label>Tipo<input name="type" value="${escapeHTML(i.type)}" required></label><label>Título<input name="title" value="${escapeHTML(i.title)}" required></label><label>Descripción<textarea name="description" required>${escapeHTML(i.description)}</textarea></label><button class="button" type="submit">Guardar cambios</button></form></div>`).join("")}</div>`}
function renderAdminPanels(){const root=qs("#admin-panels");root.innerHTML=`<div class="admin-list">${store.panels.map(p=>`<div><div class="admin-row"><strong>${escapeHTML(p.date)}</strong><div><b>${escapeHTML(p.title)}</b></div><button type="button" data-edit-panel="${escapeHTML(p.id)}">Editar</button></div><form class="admin-edit" data-edit-panel-form="${escapeHTML(p.id)}" hidden><label>Fecha<input name="date" value="${escapeHTML(p.date)}" required></label><label>Título<input name="title" value="${escapeHTML(p.title)}" required></label><label>Resumen<textarea name="summary" required>${escapeHTML(p.summary)}</textarea></label><label>Director<input name="director" value="${escapeHTML(p.director)}" required></label><label>Participantes<input name="participants" value="${escapeHTML(p.participants)}" required></label><label>Temas de análisis (Formato JSON Estricto)<textarea name="topics" required style="font-family:monospace;height:220px">${escapeHTML(JSON.stringify(p.topics, null, 2))}</textarea><small style="opacity:0.7">Debe ser un array de arrays. Ejemplo: <code>[ ["Título 1", "Desc 1"], ["Título 2", "Desc 2"] ]</code></small></label><button class="button" type="submit">Guardar cambios del Panel</button></form></div>`).join("")}</div>`}
function renderAdminAttendees(){const data=store.attendees;qs("#attendee-count").textContent=data.length;qs("#admin-attendees").innerHTML=data.length?`<table class="attendee-table"><thead><tr><th>Asistente</th><th>Organismo / cargo</th><th>Contacto</th><th>Estado</th></tr></thead><tbody>${data.map(a=>`<tr><td data-label="Asistente"><strong>${escapeHTML(a.name)}</strong><br><small>${escapeHTML(a.code)}</small></td><td data-label="Organismo">${escapeHTML(a.organization)}<br><small>${escapeHTML(a.role)}</small></td><td data-label="Contacto">${escapeHTML(a.email)}<br>${escapeHTML(a.phone)}</td><td data-label="Estado"><select data-status="${a.id}" aria-label="Estado de ${escapeHTML(a.name)}"><option value="En proceso"${a.status==="En proceso"?" selected":""}>En proceso</option><option value="Autorizada"${a.status==="Autorizada"?" selected":""}>Autorizada</option><option value="Denegada"${a.status==="Denegada"?" selected":""}>Denegada</option></select></td></tr>`).join("")}</tbody></table>`:'<p class="empty-state">Todavía no se ha recibido ninguna inscripción.</p>'}

qsa("[data-day]").forEach(button=>button.addEventListener("click",()=>{selectedDay=button.dataset.day;qsa("[data-day]").forEach(b=>b.setAttribute("aria-selected",String(b===button)));renderSchedule()}));
document.addEventListener("click",e=>{const panelButton=e.target.closest("[data-panel]");if(panelButton)openPanel(panelButton.dataset.panel);const opener=e.target.closest("[data-open]");if(opener){if(opener.dataset.open==="admin-modal")openAdmin();else qs(`#${opener.dataset.open}`).showModal()}const closer=e.target.closest("[data-close]");if(closer)closer.closest("dialog").close()});
qsa("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
qs(".menu-toggle").addEventListener("click",e=>{const open=qs("#nav-links").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",String(open))});qsa("#nav-links a").forEach(a=>a.addEventListener("click",()=>qs("#nav-links").classList.remove("open")));
qs("#registration-form").addEventListener("submit",e=>{e.preventDefault();register(e.currentTarget)});
qs("#attendee-login").addEventListener("submit",e=>{e.preventDefault();attendeeLogin(e.currentTarget)});

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
  const tab=e.target.closest("[data-admin-tab]");if(tab){qsa("[data-admin-tab]").forEach(b=>b.classList.toggle("active",b===tab));qs("#admin-activities").hidden=tab.dataset.adminTab!=="activities";qs("#admin-panels").hidden=tab.dataset.adminTab!=="panels";qs("#admin-attendees").hidden=tab.dataset.adminTab!=="attendees"}
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
      try {
        data.topics = JSON.parse(data.topics);
        if (!Array.isArray(data.topics)) throw new Error("Debe ser un array");
      } catch (err) {
        showToast("Error: El formato de los temas JSON es inválido.");
        return;
      }
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

async function init() {
  await Promise.all([fetchSchedule(), fetchPanels()]);
  renderSchedule();
  renderPanelCards();
}

init();
