document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const addEventButton = document.getElementById('add-event');
    const eventTitleInput = document.getElementById('event-title');
    const eventDateInput = document.getElementById('event-date');
    const eventsList = document.getElementById('events');

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Renderizar calendario
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        currentMonthElement.textContent = `${firstDay.toLocaleString('es-ES', { month: 'long' })} ${currentDate.getFullYear()}`;
        
        // Días de la semana
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day-header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Espacios vacíos al inicio
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Días del mes
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';

            // Verificar si es el día actual
    const today = new Date();
    if (
        currentDate.getFullYear() === today.getFullYear() &&
        currentDate.getMonth() === today.getMonth() &&
        i === today.getDate()
    ) {
        dayElement.classList.add('today'); // Añade clase "today"
    }
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = i;
            dayElement.appendChild(dayNumber);
            
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const dayEvents = events.filter(event => 
                new Date(event.date).toDateString() === dayDate.toDateString()
            );
            
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event';
                eventElement.textContent = event.title;
                dayElement.appendChild(eventElement);
            });
            
            calendarGrid.appendChild(dayElement);
        }
        
        renderEventsList();
    }

    // Renderizar lista de eventos
    function renderEventsList() {
        eventsList.innerHTML = '';
        const upcomingEvents = events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        upcomingEvents.forEach(event => {
            const eventElement = document.createElement('li');
            eventElement.innerHTML = `
                <span>${event.title} (${new Date(event.date).toLocaleDateString('es-ES')})</span>
                <span class="delete-event" data-id="${event.id}">✕</span>
            `;
            eventsList.appendChild(eventElement);
        });
        
        // Agregar evento de eliminación
        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                events = events.filter(event => event.id !== id);
                localStorage.setItem('events', JSON.stringify(events));
                renderCalendar();
            });
        });
    }

    // Navegación entre meses
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Añadir evento
    addEventButton.addEventListener('click', () => {
        const title = eventTitleInput.value.trim();
        const date = eventDateInput.value;
        
        if (title && date) {
            events.push({
                id: Date.now().toString(),
                title,
                date
            });
            
            localStorage.setItem('events', JSON.stringify(events));
            eventTitleInput.value = '';
            eventDateInput.value = '';
            renderCalendar();
        }
    });

    // Inicializar
    renderCalendar();
});