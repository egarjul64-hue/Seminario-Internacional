"use strict";

(function(){
  const ES_EN={
    "Seminario Internacional EA · Ciberespacio y Poder Aeroespacial":"International Air and Space Force Seminar · Cyberspace and Aerospace Power",
    "Seminario Internacional del Ejército del Aire y del Espacio sobre el dominio operacional del ciberespacio y el poder aeroespacial.":"International Spanish Air and Space Force Seminar on the operational domain of cyberspace and aerospace power.",
    "Saltar al contenido":"Skip to content",
    "Cuartel General del Ejército del Aire y del Espacio · Madrid":"Air and Space Force Headquarters · Madrid",
    "Seleccionar idioma":"Select language",
    "Área del asistente":"Attendee area",
    "Administración":"Administration",
    "Inicio":"Home",
    "Gobierno de España, Ministerio de Defensa, Ejército del Aire y del Espacio":"Government of Spain, Ministry of Defence, Spanish Air and Space Force",
    "Navegación principal":"Main navigation",
    "Abrir menú":"Open menu",
    "El seminario":"The seminar",
    "Programa":"Programme",
    "Paneles":"Panels",
    "Sede":"Venue",
    "Inscripción":"Registration",
    "Aeronaves, tecnología digital y capacidades aeroespaciales":"Aircraft, digital technology and aerospace capabilities",
    "Seminario internacional · 2026":"International seminar · 2026",
    "El dominio operacional del":"The operational domain of",
    "ciberespacio":"cyberspace",
    "y el poder aeroespacial":"and aerospace power",
    "Cuatro jornadas para transformar conocimiento, tecnología y talento en ventaja operacional.":"Four days to turn knowledge, technology and talent into operational advantage.",
    "Noviembre 2026":"November 2026",
    "Cuartel General del Ejército del Aire y del Espacio":"Air and Space Force Headquarters",
    "Internacional":"International",
    "Defensa · Industria · Academia":"Defence · Industry · Academia",
    "Solicitar inscripción":"Apply to attend",
    "Consultar programa":"View programme",
    "Continuar al contenido":"Continue to content",
    "Misión del encuentro":"Purpose of the event",
    "Anticipar el combate del futuro":"Anticipating the future of warfare",
    "Un foro de reflexión estratégica sobre cómo el dato, la inteligencia artificial, la conectividad y el talento están redefiniendo las operaciones aeroespaciales.":"A forum for strategic reflection on how data, artificial intelligence, connectivity and talent are reshaping aerospace operations.",
    "Responsables de defensa, expertos de países aliados, industria y universidad compartirán perspectivas para identificar riesgos, fortalezas y acciones concretas ante la aceleración tecnológica.":"Defence leaders, experts from allied nations, industry and academia will share perspectives to identify risks, strengths and concrete actions in response to accelerating technological change.",
    "jornadas":"days",
    "grupos de trabajo":"working groups",
    "paneles estratégicos":"strategic panels",
    "temas de análisis":"discussion topics",
    "Agenda":"Agenda",
    "Cuatro días para construir una visión común":"Four days to build a shared vision",
    "Seleccione una jornada para consultar horarios, responsables y actividades.":"Select a day to view times, leads and activities.",
    "Días del seminario":"Seminar days",
    "Mar":"Tue",
    "Mié":"Wed",
    "Jue":"Thu",
    "Vie":"Fri",
    "Noviembre":"November",
    "Ejes de trabajo":"Key themes",
    "Del desafío tecnológico a la decisión estratégica":"From technological challenge to strategic decision",
    "Cada panel parte de un marco conceptual y culmina en una pregunta tractora orientada a obtener conclusiones útiles.":"Each panel begins with a conceptual framework and culminates in a driving question designed to produce actionable conclusions.",
    "Metodología":"Methodology",
    "Conversaciones orientadas a la acción":"Action-oriented conversations",
    "Mesas redondas de cuatro a cinco especialistas nacionales e internacionales, acompañadas por un moderador experto.":"Round tables of four to five national and international specialists, guided by an expert moderator.",
    "DATOS":"DATA",
    "DECISIÓN":"DECISION",
    "EFECTO":"EFFECT",
    "Comprender":"Understand",
    "Un marco común para interpretar el cambio.":"A shared framework for interpreting change.",
    "Contrastar":"Compare",
    "Experiencias de defensa, aliados, industria y academia.":"Experience from defence, allies, industry and academia.",
    "Proponer":"Propose",
    "Conclusiones estratégicas y líneas de acción.":"Strategic conclusions and courses of action.",

    "Madrid · España":"Madrid · Spain",
    "El acceso estará sujeto a acreditación previa. Las instrucciones de llegada y seguridad se comunicarán a las personas autorizadas.":"Access is subject to prior accreditation. Arrival and security instructions will be sent to authorised attendees.",
    "Solicite su participación":"Apply to participate",
    "Complete el formulario. Recibirá un código de acceso para consultar sus datos y el estado de la solicitud.":"Complete the form. You will receive an access code to review your details and application status.",
    "Solicitud sujeta a validación":"Application subject to approval",
    "Acceso personal a su expediente":"Personal access to your application",
    "Comunicación del estado de inscripción":"Notification of registration status",
    "Nombre y apellidos":"Full name",
    "Cargo en la organización":"Position in the organisation",
    "Organismo al que representa":"Organisation represented",
    "Correo electrónico":"Email address",
    "Teléfono":"Telephone",
    "Acepto que mis datos se utilicen para gestionar mi solicitud de participación en el seminario.":"I agree that my data may be used to manage my application to attend the seminar.",
    "Enviar solicitud":"Submit application",
    "Los campos son obligatorios. Este prototipo guarda los datos únicamente en este navegador.":"All fields are required. This prototype stores data only in this browser.",
    "Ejército del Aire y del Espacio":"Spanish Air and Space Force",
    "Seminario Internacional del EA":"International Air and Space Force Seminar",
    "10–13 de noviembre de 2026 · Madrid":"10–13 November 2026 · Madrid",
    "© 2026 Ejército del Aire y del Espacio":"© 2026 Spanish Air and Space Force",
    "Sitio de demostración":"Demonstration site",
    "Cerrar":"Close",
    "Área privada":"Private area",
    "Consulte su inscripción":"Check your registration",
    "Introduzca el correo y el código entregado tras el registro.":"Enter your email address and the code provided after registration.",
    "Código de acceso":"Access code",
    "Acceder":"Sign in",
    "Acceso restringido":"Restricted access",
    "Gestión local del programa y de las solicitudes recibidas.":"Local management of the programme and received applications.",
    "Usuario":"Username",
    "Contraseña":"Password",
    "Entrar":"Sign in",
    "Demostración:":"Demo:",
    "Panel de control":"Control panel",
    "Cerrar sesión":"Sign out",
    "Inscritos":"Attendees",
    "Apertura":"Opening",
    "Recepción y apertura del seminario":"Registration and seminar opening",
    "Acreditación, bienvenida institucional y presentación de objetivos.":"Accreditation, institutional welcome and presentation of objectives.",
    "Grupo de trabajo 1":"Working group 1",
    "Gobierno y rewiring de las organizaciones":"Governance and organisational rewiring",
    "Adaptación organizativa y cultural al dominio ciberespacial y a la IA. Director: Cor. Eduardo García Julián.":"Organisational and cultural adaptation to the cyberspace domain and AI. Lead: Col. Eduardo García Julián.",
    "Grupo de trabajo 2":"Working group 2",
    "Cultura y talento: habilitar al aviador":"Culture and talent: enabling the airman",
    "Cultura organizacional, algoritmo de combate, reskilling y upskilling.":"Organisational culture, the combat algorithm, reskilling and upskilling.",
    "Grupos de trabajo":"Working groups",
    "Sesiones de análisis y elaboración de conclusiones":"Analysis sessions and development of conclusions",
    "Continuación de los grupos con representantes del Ministerio de Defensa y aliados OTAN.":"Continuation of the groups with representatives of the Ministry of Defence and NATO allies.",
    "Síntesis":"Synthesis",
    "Puesta en común de los grupos de trabajo":"Working group plenary",
    "Consolidación de hallazgos para alimentar las mesas redondas.":"Consolidation of findings to inform the round tables.",
    "Ciberespacio y transición al combate algorítmico":"Cyberspace and the transition to algorithmic warfare",
    "Director: Cor. Roberto García Arroba · Estado Mayor del Aire.":"Lead: Col. Roberto García Arroba · Air Staff.",
    "Computación, conectividad y ciberdefensa post-cuántica":"Computing, connectivity and post-quantum cyber defence",
    "Industria, CESTIC y especialistas en tecnologías de nueva generación.":"Industry, CESTIC and next-generation technology specialists.",
    "El reto de la cultura, la organización y el talento":"The challenge of culture, organisation and talent",
    "Director: GD Fernando Carrillo Cremades · GJSTCIBER.":"Lead: Maj. Gen. Fernando Carrillo Cremades · GJSTCIBER.",
    "Las ciberoperaciones en los conflictos actuales":"Cyber operations in current conflicts",
    "Dirección: especialista del Mando Conjunto del Ciberespacio.":"Lead: specialist from the Joint Cyberspace Command.",
    "Transformación, gobernanza e interoperabilidad":"Transformation, governance and interoperability",
    "CESTIC, EMA/SEGE y representantes de países OTAN.":"CESTIC, EMA/SEGE and representatives from NATO nations.",
    "Conferencia de clausura":"Closing lecture",
    "Conclusiones y clausura institucional":"Conclusions and institutional closing",
    "Vicealmirante Roca · Mando Conjunto del Ciberespacio.":"Vice Admiral Roca · Joint Cyberspace Command.",
    "Ver panel →":"View panel →",
    "No hay actividades programadas.":"No activities are scheduled.",
    "Explorar temas →":"Explore topics →",
    "Ciberespacio y combate algorítmico":"Cyberspace and algorithmic warfare",
    "Cómo las capacidades digitales y automatizadas redefinen la esencia del conflicto moderno.":"How digital and automated capabilities are redefining the nature of modern conflict.",
    "Cor. Roberto García Arroba · Estado Mayor del Aire":"Col. Roberto García Arroba · Air Staff",
    "Representantes del Ministerio de Defensa":"Representatives of the Ministry of Defence",
    "¿Evolución o transformación?":"Evolution or transformation?",
    "El ritmo del cambio tecnológico y su impacto estructural en las fuerzas armadas.":"The pace of technological change and its structural impact on the armed forces.",
    "Qué es el combate algorítmico":"What algorithmic warfare means",
    "Modelos matemáticos, aprendizaje automático y datos en tiempo real para acelerar el ciclo OODA.":"Mathematical models, machine learning and real-time data to accelerate the OODA loop.",
    "Elementos del dominio ciberespacial":"Elements of the cyberspace domain",
    "Infraestructuras críticas, redes, espectro electromagnético y capas lógicas.":"Critical infrastructure, networks, the electromagnetic spectrum and logical layers.",
    "De la plataforma a la nube":"From platform to cloud",
    "De sistemas de armas aislados a arquitecturas descentralizadas donde el dato es el activo principal.":"From isolated weapon systems to decentralised architectures in which data is the principal asset.",
    "Integración con operaciones aeroespaciales":"Integration with aerospace operations",
    "Convergencia de acciones ciber, electromagnéticas, aéreas y espaciales.":"Convergence of cyber, electromagnetic, air and space activities.",
    "Fortalezas, riesgos y acciones":"Strengths, risks and actions",
    "Balance del nuevo escenario y definición de respuestas prioritarias.":"Assessment of the new environment and definition of priority responses.",
    "Computación y ciberdefensa post-cuántica":"Computing and post-quantum cyber defence",
    "El impacto de la computación cuántica y las redes de nueva generación en la seguridad militar.":"The impact of quantum computing and next-generation networks on military security.",
    "Pendiente de designación":"To be appointed",
    "Industria (Indra, Telefónica, EPICOM) y CESTIC":"Industry (Indra, Telefónica, EPICOM) and CESTIC",
    "La amenaza cuántica sobre la criptografía":"The quantum threat to cryptography",
    "Riesgo para la clave pública y estrategia de cosechar ahora para descifrar después.":"Risk to public-key cryptography and the harvest-now, decrypt-later strategy.",
    "Distribución de Claves Cuánticas (QKD)":"Quantum Key Distribution (QKD)",
    "Canales seguros basados en física cuántica y detección de interceptaciones.":"Secure channels based on quantum physics and interception detection.",
    "Redes militares 5G/6G":"Military 5G/6G networks",
    "Conectividad de baja latencia para IoT militar y sensores en tiempo real.":"Low-latency connectivity for military IoT and real-time sensors.",
    "IA distribuida y Edge Computing":"Distributed AI and edge computing",
    "Procesamiento de datos en sensores, aeronaves y UAV para reducir latencia y ancho de banda.":"Data processing in sensors, aircraft and UAVs to reduce latency and bandwidth use.",
    "Resiliencia de infraestructuras críticas":"Resilience of critical infrastructure",
    "Defensa de sistemas de navegación, control industrial y centros de mando ante amenazas avanzadas.":"Defence of navigation systems, industrial control and command centres against advanced threats.",
    "Balance post-cuántico y hoja de ruta de seguridad.":"Post-quantum assessment and security roadmap.",
    "Cultura, organización y talento":"Culture, organisation and talent",
    "El factor humano como componente crítico de la transformación tecnológica.":"The human factor as the critical component of technological transformation.",
    "GD Fernando Carrillo Cremades · GJSTCIBER":"Maj. Gen. Fernando Carrillo Cremades · GJSTCIBER",
    "MAPER, DIGENPER, Gartner, Ejército de Tierra, Armada y universidades":"MAPER, DIGENPER, Gartner, Army, Navy and universities",
    "Cultura como motor de transformación":"Culture as a driver of transformation",
    "Mentalidad adaptativa, innovación, agilidad y pensamiento crítico.":"Adaptive mindsets, innovation, agility and critical thinking.",
    "Atracción y retención de talento":"Attracting and retaining talent",
    "Carreras profesionales atractivas en ciberdefensa e IA.":"Attractive career paths in cyber defence and AI.",
    "Upskilling y reskilling":"Upskilling and reskilling",
    "Capacitación continua del combatiente digital y competencias en datos y ciberseguridad.":"Continuous training for the digital warfighter and skills in data and cybersecurity.",
    "Reserva de especialistas tecnológicos":"Reserve of technology specialists",
    "Integración temporal de profesionales civiles y mejores prácticas internacionales.":"Temporary integration of civilian professionals and international best practices.",
    "Liderazgo en entornos transformacionales":"Leadership in transformational environments",
    "Criterio humano, responsabilidad y decisiones asistidas por algoritmos.":"Human judgement, accountability and algorithm-assisted decisions.",
    "Cambios organizativos y prioridades de talento.":"Organisational change and talent priorities.",
    "Ciberoperaciones en conflictos actuales":"Cyber operations in current conflicts",
    "Casos contemporáneos, efectividad, límites y lecciones del empleo operacional del ciberespacio.":"Contemporary cases, effectiveness, limitations and lessons from the operational use of cyberspace.",
    "Especialista del Mando Conjunto del Ciberespacio":"Specialist from the Joint Cyberspace Command",
    "EMACON, MACOM, MCCE y representación OTAN":"EMACON, MACOM, MCCE and NATO representatives",
    "Ciberoperaciones y operaciones aéreas":"Cyber operations and air operations",
    "Coordinación entre ataques cibernéticos, denegación de servicios y vectores físicos en Irán y otros teatros.":"Coordination between cyberattacks, denial of service and physical vectors in Iran and other theatres.",
    "DELTA, MAVEN e INDRAMIND":"DELTA, MAVEN and INDRAMIND",
    "Software comercial, conciencia situacional y fusión de datos civiles-militares.":"Commercial software, situational awareness and civil-military data fusion.",
    "Guerra de información e influencia con IA":"Information warfare and AI-enabled influence",
    "Bots, algoritmos de recomendación y contenidos sintéticos para influir en la opinión pública.":"Bots, recommendation algorithms and synthetic content used to influence public opinion.",
    "Fusión de sensores ISR comerciales":"Fusion of commercial ISR sensors",
    "Satélites privados e IA para procesar inteligencia geoespacial a gran escala.":"Private satellites and AI for large-scale geospatial intelligence processing.",
    "Drones autónomos y municiones merodeadoras":"Autonomous drones and loitering munitions",
    "Enjambres de bajo coste, saturación de defensas y capacidades C-UAS.":"Low-cost swarms, saturation of defences and C-UAS capabilities.",
    "Lecciones tácticas y respuestas urgentes.":"Tactical lessons and urgent responses.",
    "Estructuras de mando, estándares y arquitectura de datos para operar en un entorno multidominio.":"Command structures, standards and data architecture for operations in a multi-domain environment.",
    "CESTIC, EMA/SEGE y representantes OTAN de EE. UU., Alemania, Francia, Italia, Reino Unido y Turquía":"CESTIC, EMA/SEGE and NATO representatives from the United States, Germany, France, Italy, the United Kingdom and Türkiye",
    "Gobernanza del dato militar":"Military data governance",
    "Políticas para convertir el dato en un activo estratégico accesible y seguro.":"Policies to make data an accessible and secure strategic asset.",
    "Interoperabilidad multidominio OTAN":"NATO multi-domain interoperability",
    "Compatibilidad, conectividad y agilidad en el intercambio de información de coalición.":"Compatibility, connectivity and agility in coalition information exchange.",
    "JADC2 y su traslación europea":"JADC2 and its European application",
    "Conexión automatizada de sensores y efectores e iniciativas europeas homólogas.":"Automated connection of sensors and effectors and equivalent European initiatives.",
    "Adquisición ágil de software e IA":"Agile acquisition of software and AI",
    "Contratación adaptada a iteraciones, actualizaciones y despliegues continuos.":"Procurement adapted to continuous iteration, updates and deployment.",
    "Certificación y confianza en sistemas autónomos":"Certification and trust in autonomous systems",
    "Seguridad, explicabilidad, ausencia de sesgos y validación operacional.":"Safety, explainability, freedom from bias and operational validation.",
    "Prioridades para una transformación aliada e interoperable.":"Priorities for an allied and interoperable transformation.",
    "Dirección:":"Lead:",
    "Participantes:":"Participants:",
    "Temas de análisis":"Discussion topics",
    "En proceso":"Under review",
    "Autorizada":"Approved",
    "Denegada":"Declined",
    "Organismo":"Organisation",
    "Cargo":"Position",
    "Correo":"Email",
    "Código":"Code",
    "Solicitud":"Application",
    "Salir":"Sign out",
    "Hora":"Time",
    "Tipo":"Type",
    "Título":"Title",
    "Descripción":"Description",
    "Editar":"Edit",
    "Guardar cambios":"Save changes",
    "Asistente":"Attendee",
    "Organismo / cargo":"Organisation / position",
    "Contacto":"Contact",
    "Estado":"Status",
    "Todavía no se ha recibido ninguna inscripción.":"No registrations have been received yet.",
    "No se ha encontrado una solicitud con esos datos.":"No application was found with those details.",
    "Credenciales incorrectas.":"Incorrect credentials.",
    "Actividad actualizada correctamente.":"Activity updated successfully.",
    "Estado de inscripción actualizado.":"Registration status updated.",
    "Datos Personales":"Personal Data",
    "Modalidad de Asistencia":"Attendance Type",
    "Participante en los paneles":"Panel participant",
    "Público general":"General public",
    "Detalles para Participantes":"Participant Details",
    "Empleo / Rango":"Rank",
    "DNI / Pasaporte":"ID/Passport",
    "Fecha y hora de llegada (DTG)":"Arrival DTG",
    "Fecha y hora de salida (DTG)":"Departure DTG",
    "Se alojará en la residencia militar recomendada":"Will lodge at the recommended military residence",
    "Alergias o condiciones particulares":"Allergies or particular conditions",
    "Visita programa social":"Visit social agenda",
    "Acompañante":"Companion",
    "Asistencia a Actividades":"Activity Attendance",
    "Indique a qué actividades tiene previsto asistir:":"Indicate which activities you plan to attend:",
    "Panel 1: Ciberespacio y combate algorítmico":"Panel 1: Cyberspace and algorithmic warfare",
    "Panel 2: Ciberdefensa post-cuántica":"Panel 2: Post-quantum cyber defence",
    "Panel 3: Cultura, organización y talento":"Panel 3: Culture, organisation and talent",
    "Panel 4: Ciberoperaciones en conflictos actuales":"Panel 4: Cyber operations in current conflicts",
    "Panel 5: Transformación e interoperabilidad":"Panel 5: Transformation and interoperability",
    "Seleccionar...":"Select...",
    "Sí":"Yes",
    "No":"No",
    "Modalidad":"Type",
    "Participante":"Participant",
    "Público":"Public",
    "Ver detalles":"View details",
    "Detalles de Inscripción":"Registration Details",
    "Asistencia":"Attendance",
    "Participante en paneles":"Panel participant"
  };

  const EN_ES=Object.fromEntries(Object.entries(ES_EN).map(([es,en])=>[en,es]));
  let current=localStorage.getItem("eaLanguage")==="en"?"en":"es";
  let translating=false;

  function dynamicTranslation(text,target){
    if(target==="en"){
      let match=text.match(/^Ya existe una solicitud para ese correo\. Su código es (.+)$/);if(match)return `An application already exists for that email address. Your code is ${match[1]}`;
      match=text.match(/^Solicitud registrada\. Guarde su código de acceso: (.+)$/);if(match)return `Application registered. Please save your access code: ${match[1]}`;
      match=text.match(/^Estado de (.+)$/);if(match)return `Status of ${match[1]}`;
    }else{
      let match=text.match(/^An application already exists for that email address\. Your code is (.+)$/);if(match)return `Ya existe una solicitud para ese correo. Su código es ${match[1]}`;
      match=text.match(/^Application registered\. Please save your access code: (.+)$/);if(match)return `Solicitud registrada. Guarde su código de acceso: ${match[1]}`;
      match=text.match(/^Status of (.+)$/);if(match)return `Estado de ${match[1]}`;
    }
    return text;
  }

  function translateString(value,target=current){
    const dictionary=target==="en"?ES_EN:EN_ES;
    return dictionary[value]||dynamicTranslation(value,target);
  }

  function translateTextNode(node,target){
    const value=node.nodeValue;if(!value||!value.trim())return;
    const start=value.match(/^\s*/)[0],end=value.match(/\s*$/)[0],core=value.trim();
    const translated=translateString(core,target);if(translated!==core)node.nodeValue=start+translated+end;
  }

  function translateElement(element,target){
    if(!(element instanceof Element))return;
    ["aria-label","alt","title","data-label"].forEach(attr=>{if(element.hasAttribute(attr)){const value=element.getAttribute(attr),translated=translateString(value,target);if(translated!==value)element.setAttribute(attr,translated)}});
    if(element.matches(".admin-edit input:not([name='time']), .admin-edit textarea")){const translated=translateString(element.value,target);if(translated!==element.value)element.value=translated}
  }

  function translateTree(root,target=current){
    if(!root)return;translating=true;
    if(root.nodeType===Node.TEXT_NODE){translateTextNode(root,target);translating=false;return}
    if(root.nodeType===Node.ELEMENT_NODE){if(["SCRIPT","STYLE"].includes(root.tagName)){translating=false;return}translateElement(root,target)}
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode()))node.nodeType===Node.TEXT_NODE?translateTextNode(node,target):translateElement(node,target);
    translating=false;
  }

  function updateControls(){document.querySelectorAll("[data-language]").forEach(button=>{const active=button.dataset.language===current;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active))})}

  function setLanguage(language){
    const next=language==="en"?"en":"es";if(next!==current){current=next;localStorage.setItem("eaLanguage",current)}translateTree(document.body,current);
    document.documentElement.lang=current;document.title=translateString(document.title,current);
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=translateString(meta.content,current);
    updateControls();
  }

  document.querySelectorAll("[data-language]").forEach(button=>button.addEventListener("click",()=>setLanguage(button.dataset.language)));
  const observer=new MutationObserver(records=>{if(translating||current!=="en")return;records.forEach(record=>record.addedNodes.forEach(node=>translateTree(node,"en")))});
  observer.observe(document.body,{childList:true,subtree:true});
  setLanguage(current);

  window.I18N={setLanguage,translate:translateString,get language(){return current},get locale(){return current==="en"?"en-GB":"es-ES"}};
})();
