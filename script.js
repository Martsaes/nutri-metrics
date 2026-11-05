let nombreEvaluado = '';
let mobileMenuTimer;
let resultadoFantastico = null;

const frecuenciaAlimentos = [
    {
        categoria: 'I - LÁCTEOS',
        alimentos: [
            ['Leche entera', '1 taza, 200 cc'],
            ['Leche descremada', '1 taza, 200 cc'],
            ['Leche semidescremada', '1 taza, 200 cc'],
            ['Leche en polvo', '1 porción'],
            ['Yoghurt', '125 g'],
            ['Quesos', '1 porción'],
            ['Helados de leche', '1 porción']
        ]
    },
    {
        categoria: 'II - HUEVOS, CARNES Y PESCADOS',
        alimentos: [
            ['Huevos de gallina', '60 g'],
            ['Pollo o pavo', '1 porción'],
            ['Vacuno', '1 porción'],
            ['Cerdo', '1 porción'],
            ['Jamón', '1 porción'],
            ['Carnes procesadas', '1 porción'],
            ['Pescado blanco', '1 porción'],
            ['Pescado azul', '1 porción'],
            ['Moluscos', '1 porción']
        ]
    },
    {
        categoria: 'III - VERDURAS Y HORTALIZAS',
        alimentos: [
            ['Lechuga/endibias', '70 g'],
            ['Acelgas/espinacas', '1 porción'],
            ['Col/coliflor', '1 porción'],
            ['Tomate', '1 porción'],
            ['Judías verdes', '1 porción'],
            ['Patatas', '1 porción'],
            ['Champiñones', '1 porción'],
            ['Gazpacho', '1 vaso']
        ]
    },
    {
        categoria: 'IV - LEGUMBRES Y CEREALES',
        alimentos: [
            ['Lentejas/garbanzos', '100 g en seco'],
            ['Pan blanco', '1 porción'],
            ['Pan integral', '1 porción'],
            ['Cereales desayuno', '1 porción'],
            ['Arroz', '1 porción'],
            ['Pasta', '1 porción'],
            ['Pizza', '1 porción']
        ]
    },
    {
        categoria: 'V - ACEITES Y GRASAS',
        alimentos: [
            ['Aceite de oliva', '1 cucharada'],
            ['Aceite de maíz', '1 cucharada'],
            ['Aceite de girasol', '1 cucharada'],
            ['Margarina', '1 porción'],
            ['Mantequilla', '1 porción'],
            ['Guisos', 'Frecuencia habitual'],
            ['Fritos', 'Frecuencia habitual'],
            ['Rebozados', 'Frecuencia habitual']
        ]
    },
    {
        categoria: 'X - MISCELÁNEOS',
        alimentos: [
            ['Mayonesa', '1 cucharada'],
            ['Salsa de tomate/ketchup', '1 cucharada'],
            ['Mostaza', '1 cucharadita'],
            ['Sal', 'Añadida a las comidas'],
            ['Azúcar', '1 cucharadita'],
            ['Miel', '1 cucharadita'],
            ['Mermeladas', '1 cucharada']
        ]
    }
];

function mostrarResultado(options = {}) {
    const form = document.getElementById('testForm');
    resultadoFantastico = null;
    
    // Validar que todos los campos estén llenos
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    // Calcular puntaje base (suma de 0, 1, 2)
    let puntajeBase = 0;
    const formData = new FormData(form);

    for (let [name, value] of formData.entries()) {
        puntajeBase += parseInt(value);
    }

    // MULTIPLICAR POR 2 PARA OBTENER EL PUNTAJE FINAL SOBRE 100
    const totalPuntaje = puntajeBase * 2;

    // Determinar el diagnóstico y color
    let diagnostico = "";
    let colorBg = "";
    let colorTexto = "";
    if (totalPuntaje >= 85) {
        diagnostico = "Felicitaciones. Tienes un estilo de vida Fantástico.";
        colorBg = "bg-green-100"; colorTexto = "text-green-800";
    } else if (totalPuntaje >= 70) {
        diagnostico = "Buen trabajo. Estás en el camino correcto.";
        colorBg = "bg-lime-100"; colorTexto = "text-lime-800";
    } else if (totalPuntaje >= 60) {
        diagnostico = "Adecuado, está bien.";
        colorBg = "bg-yellow-100"; colorTexto = "text-yellow-800";
    } else if (totalPuntaje >= 40) {
        diagnostico = "Algo bajo, podrías mejorar.";
        colorBg = "bg-orange-100"; colorTexto = "text-orange-800";
    } else {
        diagnostico = "Estás en la zona de peligro, pero la honestidad es tu real valor.";
        colorBg = "bg-red-100"; colorTexto = "text-red-800";
    }

    // Actualizar la tarjeta de puntaje
    document.getElementById('puntajeTotalTexto').textContent = `${totalPuntaje} / 100`;
    const diagEl = document.getElementById('diagnosticoTexto');
    diagEl.textContent = diagnostico;
    diagEl.className = `text-sm sm:text-base font-bold px-3 py-1 rounded-full ${colorBg} ${colorTexto}`;
    
    // Mostrar el detalle del cálculo (base x 2)
    document.getElementById('detallePuntaje').textContent = `(Puntaje base: ${puntajeBase} pts × 2 = ${totalPuntaje} pts)`;

    // Función auxiliar para obtener el texto y el valor de un select
    function getRespuesta(selectName) {
        const select = document.querySelector(`select[name="${selectName}"]`);
        const valor = parseInt(select.value);
        const texto = select.options[select.selectedIndex].text.replace(/\s*\(\d+\s*pts?\)/i, ''); 
        return { texto, valor };
    }

    // Obtener todas las respuestas
    const r = {
        f1: getRespuesta('f1'), f2: getRespuesta('f2'),
        a1: getRespuesta('a1'), a2: getRespuesta('a2'),
        n1: getRespuesta('n1'), n2: getRespuesta('n2'), n3: getRespuesta('n3'),
        t1: getRespuesta('t1'), t2: getRespuesta('t2'),
        al1: getRespuesta('al1'), al2: getRespuesta('al2'), al3: getRespuesta('al3'),
        s1: getRespuesta('s1'), s2: getRespuesta('s2'), s3: getRespuesta('s3'),
        tp1: getRespuesta('tp1'), tp2: getRespuesta('tp2'),
        i1: getRespuesta('i1'), i2: getRespuesta('i2'), i3: getRespuesta('i3'),
        c1: getRespuesta('c1'), c2: getRespuesta('c2'),
        o1: getRespuesta('o1'), o2: getRespuesta('o2'), o3: getRespuesta('o3')
    };

    // Datos para la gráfica (Categoría, Puntaje Base Obtenido, Puntaje Base Máximo)
    const graficaData = [
        { nombre: "Familia y amigos", pts: r.f1.valor + r.f2.valor, max: 4 },
        { nombre: "Actividad física", pts: r.a1.valor + r.a2.valor, max: 4 },
        { nombre: "Nutrición", pts: r.n1.valor + r.n2.valor + r.n3.valor, max: 6 },
        { nombre: "Tabaco", pts: r.t1.valor + r.t2.valor, max: 4 },
        { nombre: "Alcohol", pts: r.al1.valor + r.al2.valor + r.al3.valor, max: 6 },
        { nombre: "Sueño / Estrés", pts: r.s1.valor + r.s2.valor + r.s3.valor, max: 6 },
        { nombre: "Personalidad", pts: r.tp1.valor + r.tp2.valor, max: 4 },
        { nombre: "Introspección", pts: r.i1.valor + r.i2.valor + r.i3.valor, max: 6 },
        { nombre: "Conducción / Trabajo", pts: r.c1.valor + r.c2.valor, max: 4 },
        { nombre: "Otras drogas", pts: r.o1.valor + r.o2.valor + r.o3.valor, max: 6 }
    ];
    resultadoFantastico = { puntajeBase, totalPuntaje, diagnostico, graficaData };

    // Generar la gráfica HTML
    const graficaContenedor = document.getElementById('graficaContenedor');
    graficaContenedor.innerHTML = ''; // Limpiar

    graficaData.forEach(item => {
        const porcentaje = (item.pts / item.max) * 100;
        
        // Color de la barra según el porcentaje
        let colorBarra = "bg-red-500";
        if (porcentaje >= 85) colorBarra = "bg-green-500";
        else if (porcentaje >= 60) colorBarra = "bg-yellow-400";
        else if (porcentaje >= 40) colorBarra = "bg-orange-400";

        const barraHTML = `
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <div class="w-full sm:w-1/3 text-xs sm:text-sm font-medium text-gray-700 truncate">${item.nombre}</div>
                <div class="w-full sm:w-2/3 flex items-center gap-2">
                    <div class="flex-1 bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden">
                        <div class="barra-progreso ${colorBarra}" style="--bar-width: ${porcentaje}%"></div>
                    </div>
                    <div class="text-xs font-bold text-gray-600 w-12 text-right">${item.pts}/${item.max}</div>
                </div>
            </div>
        `;
        graficaContenedor.innerHTML += barraHTML;
    });

    // Calcular subtotales para el texto (en base, no x2)
    const subF = r.f1.valor + r.f2.valor;
    const subA = r.a1.valor + r.a2.valor;
    const subN = r.n1.valor + r.n2.valor + r.n3.valor;
    const subT = r.t1.valor + r.t2.valor;
    const subAl = r.al1.valor + r.al2.valor + r.al3.valor;
    const subS = r.s1.valor + r.s2.valor + r.s3.valor;
    const subTp = r.tp1.valor + r.tp2.valor;
    const subI = r.i1.valor + r.i2.valor + r.i3.valor;
    const subC = r.c1.valor + r.c2.valor;
    const subO = r.o1.valor + r.o2.valor + r.o3.valor;

    // Construir el texto optimizado para WhatsApp
    const textoPlano = 
`*TEST FANTÁSTICO - MUTUAL DE SEGURIDAD*
*PACIENTE:* ${nombreEvaluado}
_Fecha: ${new Date().toLocaleDateString()}_

*📋 MIS RESPUESTAS:*

*👨‍👩‍👧‍👦 FAMILIA Y AMIGOS* (Subtotal: ${subF}/4 pts)
1. Hablar de cosas importantes: _${r.f1.texto}_ (${r.f1.valor} pt)
2. Doy y recibo cariño: _${r.f2.texto}_ (${r.f2.valor} pt)

*🏃 ACTIVIDAD FÍSICA* (Subtotal: ${subA}/4 pts)
3. Realizo actividad física: _${r.a1.texto}_ (${r.a1.valor} pt)
4. Hago ejercicio 20 min: _${r.a2.texto}_ (${r.a2.valor} pt)

*🍎 NUTRICIÓN* (Subtotal: ${subN}/6 pts)
5. Alimentación balanceada: _${r.n1.texto}_ (${r.n1.valor} pt)
6. Consumo azúcar/sal: _${r.n2.texto}_ (${r.n2.valor} pt)
7. Peso ideal: _${r.n3.texto}_ (${r.n3.valor} pt)

*🚬 TABACO* (Subtotal: ${subT}/4 pts)
8. Fumo cigarrillos: _${r.t1.texto}_ (${r.t1.valor} pt)
9. Cantidad al día: _${r.t2.texto}_ (${r.t2.valor} pt)

*🍷 ALCOHOL* (Subtotal: ${subAl}/6 pts)
10. Tragos por semana: _${r.al1.texto}_ (${r.al1.valor} pt)
11. Más de 4 tragos: _${r.al2.texto}_ (${r.al2.valor} pt)
12. Manejo tras beber: _${r.al3.texto}_ (${r.al3.valor} pt)

*😴 SUEÑO Y ESTRÉS* (Subtotal: ${subS}/6 pts)
13. Duermo bien: _${r.s1.texto}_ (${r.s1.valor} pt)
14. Manejo el estrés: _${r.s2.texto}_ (${r.s2.valor} pt)
15. Disfruto tiempo libre: _${r.s3.texto}_ (${r.s3.valor} pt)

*🧠 PERSONALIDAD* (Subtotal: ${subTp}/4 pts)
16. Ando acelerado: _${r.tp1.texto}_ (${r.tp1.valor} pt)
17. Enojado/agresivo: _${r.tp2.texto}_ (${r.tp2.valor} pt)

*💭 INTROSPECCIÓN* (Subtotal: ${subI}/6 pts)
18. Pensador positivo: _${r.i1.texto}_ (${r.i1.valor} pt)
19. Tenso/apretado: _${r.i2.texto}_ (${r.i2.valor} pt)
20. Deprimido/triste: _${r.i3.texto}_ (${r.i3.valor} pt)

*🚗 CONDUCCIÓN Y TRABAJO* (Subtotal: ${subC}/4 pts)
21. Uso cinturón: _${r.c1.texto}_ (${r.c1.valor} pt)
22. Satisfecho trabajo: _${r.c2.texto}_ (${r.c2.valor} pt)

*💊 OTRAS DROGAS* (Subtotal: ${subO}/6 pts)
23. Uso drogas: _${r.o1.texto}_ (${r.o1.valor} pt)
24. Uso remedios: _${r.o2.texto}_ (${r.o2.valor} pt)
25. Bebo café/té: _${r.o3.texto}_ (${r.o3.valor} pt)

*📊 RESULTADO FINAL:*
*PUNTAJE BASE:* ${puntajeBase} pts
*PUNTAJE TOTAL (x2):* ${totalPuntaje} / 100
*DIAGNÓSTICO:* ${diagnostico}

_Test de autoevaluación. Siempre es posible cambiar el estilo de vida, empezando ahora._`.trim();

    // Mostrar el texto en la página
    document.getElementById('textoResultado').textContent = textoPlano;
    
    // Mostrar el contenedor de resultados
    const contenedor = document.getElementById('contenedorResultado');
    contenedor.classList.remove('hidden');
    
    // Desplazarse suavemente hasta el resultado
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
    if (options.scroll !== false && !document.getElementById('tab-test').classList.contains('hidden')) {
        contenedor.scrollIntoView({ behavior, block: 'start' });
    }
    return true;
}

function ocultarResultado() {
    document.getElementById('contenedorResultado').classList.add('hidden');
    resultadoFantastico = null;
}

function copiarResultado() {
    const texto = document.getElementById('textoResultado').textContent;
    const btn = document.getElementById('textoBotonCopiar');
    
    navigator.clipboard.writeText(texto).then(() => {
        btn.textContent = "¡Copiado!";
        setTimeout(() => {
            btn.textContent = "Copiar para WhatsApp";
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
        alert("No se pudo copiar automáticamente. Selecciona el texto y copia manualmente.");
    });
}

const mealNames = [
    'Desayuno',
    'Colación',
    'Almuerzo',
    'Colación',
    'Once',
    'Colación',
    'Cena',
    'Colación durante la noche'
];

function crearFilaComida(rowIndex) {
    const row = document.createElement('div');
    row.className = 'diet-entry rounded-lg border border-gray-200 bg-white p-3 shadow-sm';
    row.dataset.row = String(rowIndex);
    row.innerHTML = `
        <div class="grid grid-cols-1 gap-3 md:grid-cols-12">
            <label class="block text-xs font-medium text-gray-600 md:col-span-2">
                Hora
                <input type="time" data-field="hora" required class="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-mutual focus:outline-none focus:ring-2 focus:ring-green-100">
            </label>
            <label class="block text-xs font-medium text-gray-600 md:col-span-3">
                Nombre de alimentos
                <input type="text" data-field="alimentos" required maxlength="250" class="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-mutual focus:outline-none focus:ring-2 focus:ring-green-100" placeholder="Ej.: leche, manzana">
            </label>
            <label class="block text-xs font-medium text-gray-600 md:col-span-3">
                Desglose de ingredientes
                <textarea data-field="ingredientes" rows="2" maxlength="500" class="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-mutual focus:outline-none focus:ring-2 focus:ring-green-100" placeholder="Un ingrediente por línea"></textarea>
            </label>
            <label class="block text-xs font-medium text-gray-600 md:col-span-2">
                Cantidad en medidas caseras
                <input type="text" data-field="medidas" required maxlength="120" class="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-mutual focus:outline-none focus:ring-2 focus:ring-green-100" placeholder="Ej.: 1 taza">
            </label>
            <label class="block text-xs font-medium text-gray-600 md:col-span-2">
                Cantidad en g totales/cc
                <input type="text" data-field="cantidadTotal" disabled placeholder="Pendiente de cálculo" class="mt-1 w-full rounded-md border border-gray-200 bg-gray-100 px-2 py-2 text-sm text-gray-500">
            </label>
            <label class="block text-xs font-medium text-gray-600 md:col-span-10">
                Observaciones
                <input type="text" data-field="observaciones" maxlength="250" class="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-mutual focus:outline-none focus:ring-2 focus:ring-green-100" placeholder="Detalles adicionales">
            </label>
            <div class="flex items-end justify-end md:col-span-2">
                ${rowIndex > 0 ? `<button type="button" class="remove-meal-row rounded-md px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50" aria-label="Quitar alimento ${rowIndex + 1}">Quitar</button>` : ''}
            </div>
        </div>
    `;

    const removeButton = row.querySelector('.remove-meal-row');
    if (removeButton) {
        removeButton.addEventListener('click', () => row.remove());
    }

    return row;
}

function crearSeccionesComida() {
    const container = document.getElementById('comidasContenedor');

    mealNames.forEach((mealName, mealIndex) => {
        const card = document.createElement('section');
        card.className = 'meal-card rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5';
        card.dataset.mealIndex = String(mealIndex);
        card.innerHTML = `
            <div class="mb-3 flex items-center justify-between gap-3">
                <h2 class="text-base font-bold text-gray-800 sm:text-lg">${mealIndex + 1}. ${mealName}</h2>
                <button type="button" class="add-meal-row inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-green-200 bg-white text-xl font-semibold text-mutual transition hover:bg-green-50" aria-label="Agregar alimento a ${mealName}" title="Agregar alimento">+</button>
            </div>
            <div class="meal-rows space-y-3"></div>
        `;

        const rowsContainer = card.querySelector('.meal-rows');
        rowsContainer.appendChild(crearFilaComida(0));
        card.querySelector('.add-meal-row').addEventListener('click', () => {
            rowsContainer.appendChild(crearFilaComida(rowsContainer.children.length));
        });
        container.appendChild(card);
    });
}

function establecerPestanaActiva(nombrePestaña) {
    document.querySelectorAll('[data-tab]').forEach((tab) => {
        const selected = tab.dataset.tab === nombrePestaña;
        tab.setAttribute('aria-selected', String(selected));
        tab.classList.toggle('nav-tab-active', selected && tab.classList.contains('nav-tab'));
        tab.classList.toggle('nav-tab-mobile-active', selected && tab.classList.contains('nav-tab-mobile'));
    });
}

function cambiarPestaña(nombrePestaña) {
    if (!['test', 'diet', 'frequency'].includes(nombrePestaña)) {
        return;
    }

    if (!nombreEvaluado) {
        document.getElementById('welcomeScreen').classList.remove('hidden');
        document.getElementById('nombreEvaluadoInput').focus();
        return;
    }

    document.querySelectorAll('[data-tab-panel]').forEach((panel) => {
        panel.classList.toggle('hidden', panel.dataset.tabPanel !== nombrePestaña);
    });
    establecerPestanaActiva(nombrePestaña);
    cerrarMenuMovil();
}

function cerrarMenuMovil() {
    const menu = document.getElementById('menuMovil');
    const button = document.getElementById('btnMenuMovil');

    window.clearTimeout(mobileMenuTimer);
    menu.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menú de navegación');
    document.getElementById('iconoMenuAbrir').classList.remove('hidden');
    document.getElementById('iconoMenuCerrar').classList.add('hidden');
    mobileMenuTimer = window.setTimeout(() => menu.classList.add('hidden'), 220);
}

function abrirMenuMovil() {
    const menu = document.getElementById('menuMovil');
    const button = document.getElementById('btnMenuMovil');

    window.clearTimeout(mobileMenuTimer);
    menu.classList.remove('hidden');
    window.requestAnimationFrame(() => menu.classList.add('is-open'));
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Cerrar menú de navegación');
    document.getElementById('iconoMenuAbrir').classList.add('hidden');
    document.getElementById('iconoMenuCerrar').classList.remove('hidden');
}

function iniciarEvaluacion(event) {
    event.preventDefault();
    const input = document.getElementById('nombreEvaluadoInput');

    const nameParts = input.value.trim().split(/\s+/).filter(Boolean);
    if (nameParts.length < 2) {
        input.setCustomValidity('Ingresa el nombre y al menos un apellido para continuar.');
        input.reportValidity();
        return;
    }

    input.setCustomValidity('');
    nombreEvaluado = input.value.trim();
    document.getElementById('nombrePacienteDieta').value = nombreEvaluado;
    document.getElementById('nombrePacienteCabecera').textContent = `Paciente: ${nombreEvaluado}`;
    document.getElementById('nombrePacienteTest').textContent = `Paciente: ${nombreEvaluado}`;
    document.getElementById('nombrePacienteDietaCabecera').textContent = `Paciente: ${nombreEvaluado}`;
    document.getElementById('nombrePacienteFrecuenciaCabecera').textContent = `Paciente: ${nombreEvaluado}`;
    document.getElementById('welcomeScreen').classList.add('hidden');
    const app = document.getElementById('appContent');
    app.classList.remove('hidden');
    app.classList.add('page-enter');
    cambiarPestaña('test');
}

function procesarRegistroDietetico() {
    const form = document.getElementById('dietForm');
    const dayField = document.getElementById('diaSemana');
    const entries = Array.from(form.querySelectorAll('.diet-entry'));
    const completedEntries = [];
    let firstInvalidField = null;

    dayField.setCustomValidity('');
    if (!dayField.value) {
        dayField.setCustomValidity('Selecciona el día de la semana del registro.');
        dayField.reportValidity();
        return;
    }

    entries.forEach((entry) => {
        const fields = Object.fromEntries(
            Array.from(entry.querySelectorAll('[data-field]')).map((field) => [field.dataset.field, field])
        );
        const hasContent = ['hora', 'alimentos', 'ingredientes', 'medidas', 'observaciones']
            .some((key) => fields[key].value.trim());

        if (!hasContent) {
            return;
        }

        ['hora', 'alimentos', 'medidas'].forEach((key) => {
            fields[key].setCustomValidity(
                fields[key].value.trim() ? '' : 'Completa este campo para cada alimento registrado.'
            );
            if (!fields[key].value.trim() && !firstInvalidField) {
                firstInvalidField = fields[key];
            }
        });

        completedEntries.push({
            mealIndex: Number(entry.closest('[data-meal-index]').dataset.mealIndex),
            meal: mealNames[Number(entry.closest('[data-meal-index]').dataset.mealIndex)],
            hora: fields.hora.value,
            alimentos: fields.alimentos.value.trim(),
            ingredientes: fields.ingredientes.value.trim(),
            medidas: fields.medidas.value.trim(),
            cantidadTotal: fields.cantidadTotal.value.trim(),
            observaciones: fields.observaciones.value.trim()
        });
    });

    if (!completedEntries.length) {
        const firstFoodField = form.querySelector('[data-field="alimentos"]');
        firstFoodField.setCustomValidity('Registra al menos un alimento o líquido antes de exportar.');
        firstFoodField.reportValidity();
        return;
    }

    if (firstInvalidField) {
        firstInvalidField.reportValidity();
        return;
    }

    const lines = [
        '*REGISTRO DIETÉTICO DE 24 HORAS*',
        `*PACIENTE:* ${nombreEvaluado}`,
        `*DÍA:* ${dayField.value}`,
        `_Fecha de registro: ${new Date().toLocaleDateString()}_`,
        '',
        '*ALIMENTOS Y LÍQUIDOS CONSUMIDOS:*'
    ];

    mealNames.forEach((mealName, mealIndex) => {
        const mealEntries = completedEntries.filter((entry) => entry.mealIndex === mealIndex);
        if (!mealEntries.length) {
            return;
        }

        lines.push('', `*${mealName.toLocaleUpperCase('es-CL')}:*`);
        mealEntries.forEach((entry) => {
            lines.push(`- ${entry.hora} | ${entry.alimentos}`);
            if (entry.ingredientes) {
                lines.push(`  Ingredientes: ${entry.ingredientes.replace(/\n/g, ', ')}`);
            }
            lines.push(`  Cantidad (medida casera): ${entry.medidas}`);
            lines.push(`  Cantidad (g totales/cc): ${entry.cantidadTotal || 'Pendiente de cálculo'}`);
            if (entry.observaciones) {
                lines.push(`  Observaciones: ${entry.observaciones}`);
            }
        });
    });

    lines.push('', '_Registro dietético de 24 horas._');
    document.getElementById('dietOutputText').textContent = lines.join('\n');
    document.getElementById('dietOutputSection').classList.remove('hidden');
    document.getElementById('dietOutputSection').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
    });
}

function copiarRegistroDietetico() {
    const text = document.getElementById('dietOutputText').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const button = document.getElementById('btnCopiarDieta');
        button.textContent = '¡Copiado!';
        window.setTimeout(() => {
            button.textContent = 'Copiar para WhatsApp';
        }, 2000);
    }).catch((error) => {
        console.error('Error al copiar el registro dietético:', error);
        window.alert('No se pudo copiar automáticamente. Selecciona el texto y copia manualmente.');
    });
}

function crearTablaFrecuencia() {
    const container = document.getElementById('frecuenciaCategorias');
    let foodIndex = 0;
    const frequencies = [
        ['never', 'Nunca'],
        ['year', 'Año'],
        ['month', 'Mes'],
        ['week', 'Sem.'],
        ['day', 'Día']
    ];

    frecuenciaAlimentos.forEach((group) => {
        const section = document.createElement('section');
        section.className = 'frequency-category overflow-hidden rounded-xl border border-gray-200';
        const heading = document.createElement('h2');
        heading.className = 'border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold tracking-wide text-gray-800';
        heading.textContent = group.categoria;
        section.appendChild(heading);

        group.alimentos.forEach(([food, quantity]) => {
            const row = document.createElement('div');
            row.className = 'frequency-food-row border-b border-gray-100 p-3 last:border-b-0 sm:p-4';
            row.dataset.foodIndex = String(foodIndex++);

            const label = document.createElement('div');
            label.className = 'frequency-food-label';
            label.innerHTML = `<span class="font-medium text-gray-800">${food}</span><span class="text-xs text-gray-500">${quantity}</span>`;
            row.appendChild(label);

            frequencies.forEach(([key, title]) => {
                const cell = document.createElement('label');
                cell.className = 'frequency-cell';
                cell.innerHTML = `<span class="frequency-mobile-label">${title}</span>`;
                const input = document.createElement('input');
                input.type = key === 'never' ? 'checkbox' : 'number';
                input.className = key === 'never' ? 'frequency-never' : 'frequency-count';
                input.dataset.frequency = key;
                input.setAttribute('aria-label', `${food}: ${title}`);
                if (key !== 'never') {
                    input.min = '1';
                    input.max = '9999';
                    input.step = '1';
                    input.inputMode = 'numeric';
                    input.placeholder = '-';
                    input.classList.add('frequency-number');
                }
                cell.appendChild(input);
                row.appendChild(cell);
            });

            const never = row.querySelector('[data-frequency="never"]');
            const counts = Array.from(row.querySelectorAll('.frequency-count'));
            never.addEventListener('change', () => {
                if (never.checked) {
                    counts.forEach((count) => {
                        count.value = '';
                        count.setCustomValidity('');
                    });
                }
            });
            counts.forEach((count) => {
                count.addEventListener('input', () => {
                    const hasFrequency = count.value !== '' && Number(count.value) > 0;
                    if (hasFrequency) {
                        never.checked = false;
                        counts.forEach((otherCount) => {
                            if (otherCount !== count) {
                                otherCount.value = '';
                            }
                        });
                    }
                    count.setCustomValidity('');
                });
            });
            section.appendChild(row);
        });

        if (group.categoria === 'V - ACEITES Y GRASAS') {
            const fatField = document.createElement('label');
            fatField.className = 'block border-t border-gray-100 bg-gray-50 p-3 text-xs font-medium text-gray-700 sm:px-4';
            fatField.innerHTML = 'Tipo de grasa habitual para cocinar <input id="grasaHabitual" type="text" maxlength="120" class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-mutual focus:outline-none focus:ring-2 focus:ring-green-100" placeholder="Ej.: aceite de oliva, girasol, mantequilla">';
            section.appendChild(fatField);
        }

        container.appendChild(section);
    });
}

function recolectarRegistroDietetico() {
    const day = document.getElementById('diaSemana').value;
    const entries = Array.from(document.querySelectorAll('#dietForm .diet-entry'))
        .map((entry) => {
            const getValue = (field) => entry.querySelector(`[data-field="${field}"]`).value.trim();
            return {
                mealIndex: Number(entry.closest('[data-meal-index]').dataset.mealIndex),
                meal: mealNames[Number(entry.closest('[data-meal-index]').dataset.mealIndex)],
                hora: getValue('hora'),
                alimentos: getValue('alimentos'),
                ingredientes: getValue('ingredientes'),
                medidas: getValue('medidas'),
                cantidadTotal: getValue('cantidadTotal'),
                observaciones: getValue('observaciones')
            };
        })
        .filter((entry) => entry.hora || entry.alimentos || entry.ingredientes || entry.medidas || entry.observaciones);

    return { day, entries };
}

function recolectarFrecuenciaConsumo() {
    const entries = Array.from(document.querySelectorAll('.frequency-food-row'))
        .map((row) => {
            const values = {};
            row.querySelectorAll('[data-frequency]').forEach((input) => {
                values[input.dataset.frequency] = input.dataset.frequency === 'never'
                    ? input.checked
                    : input.value;
            });
            const label = row.querySelector('.frequency-food-label');
            return {
                food: label.firstElementChild.textContent,
                quantity: label.lastElementChild.textContent,
                ...values
            };
        });

    return {
        entries,
        cookingFat: document.getElementById('grasaHabitual').value.trim(),
        vitamins: document.getElementById('consumeVitaminas').value,
        vitaminDetails: document.getElementById('detalleVitaminas').value.trim()
    };
}

function guardarFrecuenciaConsumo() {
    if (!validarFrecuenciaConsumo()) {
        return;
    }

    const answered = recolectarFrecuenciaConsumo().entries.filter((entry) =>
        entry.never || ['year', 'month', 'week', 'day'].some((period) =>
            entry[period] !== '' && Number(entry[period]) > 0
        )
    ).length;
    document.getElementById('frecuenciaEstado').textContent =
        `Registro guardado. ${answered} de ${document.querySelectorAll('.frequency-food-row').length} alimentos respondidos.`;
}

function validarFrecuenciaConsumo() {
    const firstInvalidCount = Array.from(document.querySelectorAll('.frequency-count'))
        .find((input) => !input.checkValidity());
    if (firstInvalidCount) {
        cambiarPestaña('frequency');
        firstInvalidCount.reportValidity();
        return false;
    }

    const vitaminSelector = document.getElementById('consumeVitaminas');
    const vitaminDetails = document.getElementById('detalleVitaminas');
    vitaminDetails.setCustomValidity(
        vitaminSelector.value === 'si' && !vitaminDetails.value.trim()
            ? 'Indica la marca y la dosis diaria de los suplementos.'
            : ''
    );
    if (vitaminDetails.validationMessage) {
        cambiarPestaña('frequency');
        vitaminDetails.reportValidity();
        return false;
    }

    return true;
}

function nombreArchivoSeguro(name) {
    const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const safeName = normalized.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
    return safeName || 'paciente';
}

function generarReporteClinico() {
    if (!nombreEvaluado) {
        window.alert('Ingresa primero el nombre del paciente para generar el reporte.');
        return;
    }
    if (!window.jspdf || !window.jspdf.jsPDF) {
        window.alert('No se pudo cargar el generador de PDF. Revisa tu conexión a internet e inténtalo nuevamente.');
        return;
    }
    if (!resultadoFantastico) {
        cambiarPestaña('test');
        window.alert('Completa primero el Test Fantástico y presiona “Ver mi Resultado” antes de generar el informe.');
        return;
    }
    if (!validarFrecuenciaConsumo()) {
        return;
    }
    if (!mostrarResultado({ scroll: false })) {
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    const accent = [130, 185, 18];
    const ink = [31, 41, 55];
    const muted = [107, 114, 128];
    let y = 20;

    doc.setProperties({
        title: `Informe nutricional - ${nombreEvaluado}`,
        subject: 'Evaluación nutricional y estilo de vida',
        author: 'NutriMetrics'
    });

    function addPage() {
        doc.addPage();
        y = 20;
        doc.setFillColor(...accent);
        doc.rect(margin, 13, contentWidth, 0.7, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...ink);
        doc.text('INFORME NUTRICIONAL Y ESTILO DE VIDA', margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...muted);
        doc.text(nombreEvaluado, margin, y + 6);
        doc.text(new Date().toLocaleDateString('es-CL'), pageWidth - margin, y + 6, { align: 'right' });
        doc.setDrawColor(225, 228, 231);
        doc.line(margin, y + 9, pageWidth - margin, y + 9);
        y = 35;
    }

    function ensureSpace(height) {
        if (y + height > pageHeight - 21) {
            addPage();
        }
    }

    function addParagraph(text, options = {}) {
        const fontSize = options.fontSize || 9;
        const lineHeight = options.lineHeight || fontSize * 0.48;
        const maxWidth = options.maxWidth || contentWidth;
        doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(...(options.color || ink));
        const lines = doc.splitTextToSize(String(text), maxWidth);
        ensureSpace(lines.length * lineHeight + (options.gapAfter || 0));
        doc.text(lines, options.x || margin, y);
        y += lines.length * lineHeight + (options.gapAfter || 0);
    }

    function addSection(title) {
        ensureSpace(14);
        y += 4;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...ink);
        doc.text(title, margin, y);
        y += 2.5;
        doc.setDrawColor(225, 228, 231);
        doc.setLineWidth(0.25);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
    }

    doc.setFillColor(...accent);
    doc.rect(margin, 15, contentWidth, 0.9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...ink);
    doc.text('INFORME NUTRICIONAL Y ESTILO DE VIDA', margin, 29);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(nombreEvaluado, margin, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CL')}`, pageWidth - margin, 40, { align: 'right' });
    y = 47;
    doc.setDrawColor(225, 228, 231);
    doc.line(margin, y, pageWidth - margin, y);
    y += 11;

    addSection('01  Test de Estilo de Vida');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...accent);
    doc.text(`${resultadoFantastico.totalPuntaje} / 100`, margin, y + 1);
    addParagraph(resultadoFantastico.diagnostico, {
        x: margin + 42,
        maxWidth: contentWidth - 42,
        fontSize: 10,
        bold: true,
        gapAfter: 6
    });
    y += 5;

    resultadoFantastico.graficaData.forEach((item) => {
        ensureSpace(7);
        const percent = item.pts / item.max;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...ink);
        doc.text(item.nombre, margin, y + 3);
        const barX = margin + 54;
        const barWidth = contentWidth - 69;
        doc.setFillColor(243, 244, 246);
        doc.roundedRect(barX, y, barWidth, 3.2, 1.2, 1.2, 'F');
        doc.setFillColor(...accent);
        if (percent > 0) {
            doc.roundedRect(barX, y, Math.max(1, barWidth * percent), 3.2, 1.2, 1.2, 'F');
        }
        doc.setTextColor(...muted);
        doc.text(`${item.pts}/${item.max}`, pageWidth - margin, y + 3, { align: 'right' });
        y += 6.5;
    });

    addSection('02  Registro Dietético de 24 Horas');
    const diet = recolectarRegistroDietetico();
    if (!diet.entries.length) {
        addParagraph('Pendiente de completar.', { color: muted, gapAfter: 2 });
    } else {
        addParagraph(`Día del registro: ${diet.day || 'Sin indicar'}`, { fontSize: 9, color: muted, gapAfter: 3 });
        diet.entries
            .slice()
            .sort((left, right) => left.hora.localeCompare(right.hora))
            .forEach((entry) => {
                addParagraph(`${entry.meal} · ${entry.hora || 'Hora no indicada'} · ${entry.alimentos || 'Alimento no especificado'}`, {
                    fontSize: 9,
                    bold: true,
                    gapAfter: 1
                });
                if (entry.ingredientes) {
                    addParagraph(`Ingredientes: ${entry.ingredientes.replace(/\n/g, ', ')}`, {
                        x: margin + 3,
                        fontSize: 8,
                        color: muted,
                        gapAfter: 1
                    });
                }
                addParagraph(`Cantidad: ${entry.medidas || 'No indicada'}${entry.cantidadTotal ? ` · ${entry.cantidadTotal}` : ''}${entry.observaciones ? ` · ${entry.observaciones}` : ''}`, {
                    x: margin + 3,
                    fontSize: 8,
                    color: muted,
                    gapAfter: 3
                });
        });
    }

    addSection('03  Frecuencia de Consumo');
    const frequency = recolectarFrecuenciaConsumo();
    let activeFrequencyCount = 0;
    frequency.entries.forEach((entry) => {
        const period = ['day', 'week', 'month', 'year']
            .find((key) => entry[key] !== '' && Number(entry[key]) > 0);
        if (!period) {
            return;
        }
        activeFrequencyCount += 1;
        const labels = { day: 'día', week: 'semana', month: 'mes', year: 'año' };
        const times = Number(entry[period]) === 1 ? 'vez' : 'veces';
        addParagraph(`${entry.food} (${entry.quantity})  ·  ${entry[period]} ${times} por ${labels[period]}`, {
            fontSize: 8.5,
            gapAfter: 2
        });
    });
    const answeredFrequencyCount = frequency.entries.filter((entry) =>
        entry.never || ['day', 'week', 'month', 'year'].some((period) =>
            entry[period] !== '' && Number(entry[period]) > 0
        )
    ).length;
    if (!activeFrequencyCount) {
        addParagraph(
            answeredFrequencyCount
                ? 'Sin alimentos con frecuencia distinta de Nunca registrada.'
                : 'Pendiente de completar.',
            { color: muted, gapAfter: 2 }
        );
    }
    if (frequency.cookingFat) {
        addParagraph(`Grasa habitual para cocinar: ${frequency.cookingFat}`, { fontSize: 8.5, gapAfter: 2 });
    }
    const vitaminText = frequency.vitamins === 'si'
        ? `Sí${frequency.vitaminDetails ? ` · ${frequency.vitaminDetails}` : ' · Dosis pendiente'}`
        : frequency.vitamins === 'no' ? 'No' : 'Sin respuesta';
    addParagraph(`Vitaminas o suplementos: ${vitaminText}`, { fontSize: 8.5, color: muted, gapAfter: 2 });

    const pageCount = doc.internal.getNumberOfPages();
    for (let page = 1; page <= pageCount; page += 1) {
        doc.setPage(page);
        doc.setDrawColor(225, 228, 231);
        doc.setLineWidth(0.25);
        doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...muted);
        doc.text('NutriMetrics · Informe confidencial', margin, pageHeight - 9);
        doc.text(`Página ${page} de ${pageCount}`, pageWidth - margin, pageHeight - 9, { align: 'right' });
    }

    doc.save(`informe_nutricional_${nombreArchivoSeguro(nombreEvaluado)}.pdf`);
}

function compartirResumenWhatsApp() {
    if (!nombreEvaluado) {
        window.alert('Ingresa primero el nombre del paciente para compartir el resumen.');
        return;
    }
    if (!resultadoFantastico) {
        cambiarPestaña('test');
        window.alert('Completa primero el Test Fantástico y presiona “Ver mi Resultado” antes de compartir el informe.');
        return;
    }
    if (!validarFrecuenciaConsumo() || !mostrarResultado({ scroll: false }) || !resultadoFantastico) {
        return;
    }

    const diet = recolectarRegistroDietetico();
    const frequency = recolectarFrecuenciaConsumo();
    const activeFrequencies = frequency.entries.filter((entry) =>
        ['day', 'week', 'month', 'year'].some((period) =>
            entry[period] !== '' && Number(entry[period]) > 0
        )
    ).length;
    const message = [
        '*INFORME NUTRICIONAL Y ESTILO DE VIDA*',
        `*Paciente:* ${nombreEvaluado}`,
        `*Fecha:* ${new Date().toLocaleDateString('es-CL')}`,
        '',
        '*TEST FANTÁSTICO*',
        `Puntaje: *${resultadoFantastico.totalPuntaje} / 100*`,
        `Diagnóstico: ${resultadoFantastico.diagnostico}`,
        '',
        '*REGISTRO DIETÉTICO 24H*',
        `Día: ${diet.day || 'Pendiente'} · ${diet.entries.length} registros de alimentos`,
        '',
        '*FRECUENCIA DE CONSUMO*',
        `${activeFrequencies} alimentos con frecuencia distinta de “Nunca”.`,
        frequency.cookingFat ? `Grasa habitual para cocinar: ${frequency.cookingFat}` : '',
        `Vitaminas/suplementos: ${frequency.vitamins === 'si' ? frequency.vitaminDetails : frequency.vitamins === 'no' ? 'No' : 'Sin respuesta'}`,
        '',
        `Profesional: adjunte el PDF generado del paciente *${nombreEvaluado}* (informe_nutricional_${nombreArchivoSeguro(nombreEvaluado)}.pdf).`
    ].join('\n');

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

crearSeccionesComida();
crearTablaFrecuencia();
document.getElementById('welcomeForm').addEventListener('submit', iniciarEvaluacion);
document.getElementById('nombreEvaluadoInput').addEventListener('input', (event) => {
    event.currentTarget.setCustomValidity('');
});
document.querySelectorAll('[data-tab]').forEach((tab) => {
    tab.addEventListener('click', () => cambiarPestaña(tab.dataset.tab));
});
document.getElementById('linkInicio').addEventListener('click', (event) => {
    event.preventDefault();
    if (nombreEvaluado) {
        cambiarPestaña('test');
    } else {
        document.getElementById('nombreEvaluadoInput').focus();
    }
});
document.getElementById('btnMenuMovil').addEventListener('click', () => {
    const isOpen = document.getElementById('btnMenuMovil').getAttribute('aria-expanded') === 'true';
    if (isOpen) {
        cerrarMenuMovil();
    } else {
        abrirMenuMovil();
    }
});
document.getElementById('btnMostrarResultado').addEventListener('click', mostrarResultado);
document.getElementById('btnLimpiar').addEventListener('click', ocultarResultado);
document.getElementById('btnCopiar').addEventListener('click', copiarResultado);
document.getElementById('btnProcesarDieta').addEventListener('click', procesarRegistroDietetico);
document.getElementById('btnCopiarDieta').addEventListener('click', copiarRegistroDietetico);
document.getElementById('btnGuardarFrecuencia').addEventListener('click', guardarFrecuenciaConsumo);
document.getElementById('btnGenerarReporte').addEventListener('click', generarReporteClinico);
document.getElementById('btnCompartirWhatsApp').addEventListener('click', compartirResumenWhatsApp);
document.getElementById('consumeVitaminas').addEventListener('change', () => {
    document.getElementById('detalleVitaminas').setCustomValidity('');
});
