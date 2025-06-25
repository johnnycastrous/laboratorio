const tasks = [
  {
    zone: 'Cocina',
    items: [
      { name: 'Lavar platos', icon: '🍽️', priority: 1, frequency: 'diaria' },
      { name: 'Limpiar encimeras', icon: '🧽', priority: 2, frequency: 'diaria' },
      { name: 'Revisar despensa', icon: '📦', priority: 3, frequency: 'semanal' }
    ]
  },
  {
    zone: 'Baño',
    items: [
      { name: 'Desinfectar lavabo', icon: '🚰', priority: 1, frequency: 'diaria' },
      { name: 'Cambiar toallas', icon: '🧻', priority: 2, frequency: 'semanal' },
      { name: 'Lavar alfombrillas', icon: '🛁', priority: 3, frequency: 'mensual' }
    ]
  },
  {
    zone: 'Sala',
    items: [
      { name: 'Aspirar', icon: '🧹', priority: 2, frequency: 'semanal' },
      { name: 'Ordenar revistas', icon: '📚', priority: 3, frequency: 'semanal' }
    ]
  },
  {
    zone: 'Habitación',
    items: [
      { name: 'Tender cama', icon: '🛏️', priority: 1, frequency: 'diaria' },
      { name: 'Organizar armario', icon: '👚', priority: 3, frequency: 'mensual' }
    ]
  }
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getLastUpdate() {
  return localStorage.getItem('lastUpdate');
}

function setLastUpdate(dateStr) {
  localStorage.setItem('lastUpdate', dateStr);
}

function updateTasks() {
  const today = formatDate(new Date());
  if (getLastUpdate() !== today) {
    // Here you would normally refresh tasks from a server or database
    setLastUpdate(today);
  }
}

function renderTasks() {
  const container = document.getElementById('taskContainer');
  container.innerHTML = '';

  tasks.forEach(zone => {
    const zoneDiv = document.createElement('div');
    zoneDiv.className = 'zone';
    const zoneTitle = document.createElement('h2');
    zoneTitle.textContent = zone.zone;
    zoneDiv.appendChild(zoneTitle);

    zone.items.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task priority-${task.priority}`;
      if (task.frequency === 'diaria') {
        taskDiv.classList.add('due-today');
      }

      const descSpan = document.createElement('span');
      descSpan.innerHTML = `<span class="icon">${task.icon}</span>${task.name}`;

      const freqSpan = document.createElement('span');
      freqSpan.textContent = task.frequency;

      taskDiv.appendChild(descSpan);
      taskDiv.appendChild(freqSpan);
      zoneDiv.appendChild(taskDiv);
    });
    container.appendChild(zoneDiv);
  });
}

updateTasks();
renderTasks();

// Simple visual reminder every hour
setInterval(() => {
  const container = document.getElementById('taskContainer');
  container.classList.toggle('highlight');
}, 3600000);
