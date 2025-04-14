const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const logoutBtn = document.getElementById('logout-btn');
const usernameDisplay = document.getElementById('username-display');
const navBtns = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');
const filterBtns = document.querySelectorAll('.filter-btn');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');
const noteModal = document.getElementById('note-modal');
const closeModalBtn = document.querySelector('.close-modal');
const saveNoteBtn = document.getElementById('save-note');
const deleteNoteBtn = document.getElementById('delete-note');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const editTaskModal = document.getElementById('edit-task-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveTaskEditBtn = document.getElementById('save-task-edit');
const closeEditTaskBtn = document.querySelector('.close-edit-task');


let currentEditTaskIndex = null;
let currentNoteId = null;
let currentFilter = 'all';
let username = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', () => {
    if (!username) {
        window.location.href = 'login.html';
        return;
    }

    usernameDisplay.textContent = username;
    loadTheme();
    loadTasks();
    loadNotes();
    initProfileEdit();
    setupEventListeners();
});

function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);

    logoutBtn.addEventListener('click', logout);

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    taskForm.addEventListener('submit', addNewTask);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
    });

    addNoteBtn.addEventListener('click', openNewNote);
    closeModalBtn.addEventListener('click', closeModal);
    saveNoteBtn.addEventListener('click', saveNote);
    deleteNoteBtn.addEventListener('click', deleteNote);

    menuToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', closeMobileMenuOnClickOutside);
    document.addEventListener('keydown', closeMobileMenuOnEscape);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    const profile = JSON.parse(localStorage.getItem(`profile_${username}`)) || {};
    profile.theme = newTheme;
    localStorage.setItem(`profile_${username}`, JSON.stringify(profile));
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    icon.style.color = theme === 'dark' ? '#fdcb6e' : '';
}

function loadTasks() {
    const tasks = getTasks();
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No tasks yet</h3>
                <p>Add your first task to get started!</p>
            </div>
        `;
        return;
    }

    const filteredTasks = filterTasksByStatus(tasks, currentFilter);
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <h3>No ${currentFilter} tasks</h3>
                <p>${currentFilter === 'active' ? 'All tasks are completed!' : 'Add some tasks first!'}</p>
            </div>
        `;
        return;
    }

    filteredTasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
}

function createTaskElement(task, index) {
    const taskDate = new Date(task.createdAt);
    const formattedDate = taskDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <div class="task-content">
            <div class="task-text">${task.text}</div>
            <div class="task-date">${formattedDate}</div>
        </div>
        <div class="task-actions">
            <button class="task-btn edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="task-btn delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

    const checkbox = taskElement.querySelector('.task-checkbox');
    const editBtn = taskElement.querySelector('.edit');
    const deleteBtn = taskElement.querySelector('.delete');

    checkbox.addEventListener('change', () => toggleTaskComplete(index));
    editBtn.addEventListener('click', () => editTask(index));
    deleteBtn.addEventListener('click', () => deleteTask(index));

    return taskElement;
}

function addNewTask(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    if (!text) {
        showPopup('error', 'Empty Task', 'Please enter a task description');
        return;
    }

    const tasks = getTasks();
    tasks.push({
        text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    saveTasks(tasks);
    taskInput.value = '';
    loadTasks();
    showPopup('success', 'Task Added', 'Your new task has been created');
}

function toggleTaskComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const newText = prompt('Edit task:', tasks[index].text);
    
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        loadTasks();
    }
}

function deleteTask(index) {
    const deleteModal = document.getElementById('delete-modal');
    const deleteMessage = document.getElementById('delete-message');
    const confirmBtn = document.getElementById('confirm-delete');
    const cancelBtn = document.getElementById('cancel-delete');
    
    const tasks = getTasks();
    deleteMessage.textContent = `Are you sure you want to delete "${tasks[index].text}"?`;
    
    deleteModal.classList.add('active');
    
    const handleConfirm = () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
      deleteModal.classList.remove('active');
      showPopup('success', 'Task Deleted', 'The task was removed successfully');
      
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    };
    
    const handleCancel = () => {
      deleteModal.classList.remove('active');
      
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    };
    
    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
}

function saveTasks(tasks) {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
}

function filterTasks(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
    loadTasks();
}

function filterTasksByStatus(tasks, filter) {
    switch(filter) {
        case 'active': return tasks.filter(task => !task.completed);
        case 'completed': return tasks.filter(task => task.completed);
        default: return tasks;
    }
}

function loadNotes() {
    const notes = getNotes();
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sticky-note"></i>
                <h3>No notes yet</h3>
                <p>Create your first note to get started!</p>
            </div>
        `;
        return;
    }

    notes.forEach((note, index) => {
        const noteElement = createNoteElement(note, index);
        notesContainer.appendChild(noteElement);
    });
}

function getNotes() {
    return JSON.parse(localStorage.getItem(`notes_${username}`)) || [];
}

function createNoteElement(note, index) {
    const noteDate = new Date(note.createdAt);
    const formattedDate = noteDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const noteElement = document.createElement('div');
    noteElement.className = 'note-card';
    noteElement.innerHTML = `
        <div class="note-title">${note.title || 'Untitled Note'}</div>
        <div class="note-content">${note.content}</div>
        <div class="note-date">${formattedDate}</div>
    `;

    noteElement.addEventListener('click', () => openNote(index));
    return noteElement;
}

function openNewNote() {
    currentNoteId = null;
    noteTitleInput.value = '';
    noteContentInput.value = '';
    deleteNoteBtn.style.display = 'none';
    noteModal.classList.add('active');
}

function openNote(index) {
    const notes = getNotes();
    const note = notes[index];
    
    currentNoteId = index;
    noteTitleInput.value = note.title || '';
    noteContentInput.value = note.content || '';
    deleteNoteBtn.style.display = 'block';
    noteModal.classList.add('active');
}

function closeModal() {
    noteModal.classList.remove('active');
}

function saveNote() {
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    
    if (!content) {
        showPopup('warning', 'Empty Note', 'Note content cannot be empty!');
        return;
    }

    const notes = getNotes();
    
    if (currentNoteId === null) {
        notes.push({
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        showPopup('success', 'Note Created', 'Your new note has been saved');
    } else {
        notes[currentNoteId] = {
            title,
            content,
            createdAt: notes[currentNoteId].createdAt,
            updatedAt: new Date().toISOString()
        };
        showPopup('success', 'Note Updated', 'Your changes have been saved');
    }

    saveNotes(notes);
    loadNotes();
    closeModal();
}

function deleteNote() {
    const deleteModal = document.getElementById('delete-modal');
    const deleteMessage = document.getElementById('delete-message');
    const confirmBtn = document.getElementById('confirm-delete');
    const cancelBtn = document.getElementById('cancel-delete');
    
    const notes = getNotes();
    const noteTitle = notes[currentNoteId].title || 'Untitled Note';
    deleteMessage.textContent = `Are you sure you want to delete "${noteTitle}"?`;
    
    deleteModal.classList.add('active');
    
    const handleConfirm = () => {
      notes.splice(currentNoteId, 1);
      saveNotes(notes);
      loadNotes();
      deleteModal.classList.remove('active');
      noteModal.classList.remove('active');
      showPopup('success', 'Note Deleted', 'The note was removed successfully');
      
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    };
    
    const handleCancel = () => {
      deleteModal.classList.remove('active');
      
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    };
    
    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
}

function saveNotes(notes) {
    localStorage.setItem(`notes_${username}`, JSON.stringify(notes));
}

function initProfileEdit() {
    const profileModal = document.getElementById('profile-modal');
    const profileForm = document.getElementById('profile-form');
    const saveProfileBtn = document.getElementById('save-profile');
    const cancelProfileBtn = document.getElementById('cancel-profile');
    const userProfile = document.querySelector('.user-profile');
    

    userProfile.addEventListener('click', () => {
        loadProfile();
        profileModal.classList.add('active');
    });

    saveProfileBtn.addEventListener('click', saveProfile);

    cancelProfileBtn.addEventListener('click', () => {
        profileModal.classList.remove('active');
    });

    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
        }
    });

    const profile = JSON.parse(localStorage.getItem(`profile_${username}`));
    if (profile) {
        updateProfileDisplay(profile);
        applyThemePreference(profile.theme);
    }
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem(`profile_${username}`)) || {
        username: username,
        email: '',
        avatar: '',
        theme: 'auto'
    };
    
    document.getElementById('profile-username').value = profile.username;
    document.getElementById('profile-email').value = profile.email;
    document.getElementById('profile-avatar').value = profile.avatar;
    document.getElementById('profile-theme').value = profile.theme;
    
    return profile;
}

function saveProfile() {
    const profile = {
        username: document.getElementById('profile-username').value.trim(),
        email: document.getElementById('profile-email').value.trim(),
        avatar: document.getElementById('profile-avatar').value.trim(),
        theme: document.getElementById('profile-theme').value
    };
    
    localStorage.setItem(`profile_${username}`, JSON.stringify(profile));
    localStorage.setItem('username', profile.username);
    username = profile.username;
    
    updateProfileDisplay(profile);
    applyThemePreference(profile.theme);
    showPopup('success', 'Profile Updated', 'Your changes have been saved');
}

function updateProfileDisplay(profile) {
    usernameDisplay.textContent = profile.username;
    
    const userIcon = document.querySelector('.user-profile i');
    if (profile.avatar) {
        if (userIcon) userIcon.style.display = 'none';
        let avatarImg = document.querySelector('.user-profile .avatar-img');
        
        if (!avatarImg) {
            avatarImg = document.createElement('img');
            avatarImg.className = 'avatar-img';
            document.querySelector('.user-profile').prepend(avatarImg);
        }
        
        avatarImg.src = profile.avatar;
        avatarImg.alt = `${profile.username}'s avatar`;
    } else {
        const avatarImg = document.querySelector('.user-profile .avatar-img');
        if (avatarImg) avatarImg.remove();
        if (userIcon) userIcon.style.display = 'block';
    }
}

function applyThemePreference(themePref) {
    if (themePref === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', themePref);
    }
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
    updateThemeIcon(document.documentElement.getAttribute('data-theme'));
}

function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenuOnClickOutside(e) {
    if (window.innerWidth <= 992 && 
        !e.target.closest('.main-nav') && 
        !e.target.closest('.menu-toggle') &&
        mainNav.classList.contains('active')) {
        toggleMobileMenu();
    }
}

function closeMobileMenuOnEscape(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        toggleMobileMenu();
    }
}

function switchTab(tab) {
    navBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-tab="${tab}"]`).classList.add('active');
    
    contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === tab) section.classList.add('active');
    });

    if (window.innerWidth <= 992) {
        toggleMobileMenu();
    }
}

function showPopup(type, title, message, duration = 5000) {
    let container = document.querySelector('.popup-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'popup-container';
        document.body.appendChild(container);
    }
    
    const popup = document.createElement('div');
    popup.className = `popup-message ${type}`;
    
    let icon;
    switch(type) {
        case 'success': icon = 'fa-check-circle'; break;
        case 'error': icon = 'fa-times-circle'; break;
        case 'warning': icon = 'fa-exclamation-triangle'; break;
        default: icon = 'fa-info-circle';
    }
    
    popup.innerHTML = `
        <i class="fas ${icon} popup-icon"></i>
        <div class="popup-content">
            <div class="popup-title">${title}</div>
            <div class="popup-text">${message}</div>
        </div>
        <button class="popup-close" aria-label="Close message">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(popup);
    setTimeout(() => popup.classList.add('active'), 10);
    
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => hidePopup(popup));
    
    if (duration > 0) {
        setTimeout(() => hidePopup(popup), duration);
    }
}

function hidePopup(popup) {
    if (!popup) return;
    
    popup.classList.add('hiding');
    setTimeout(() => {
        popup.remove();
        const container = document.querySelector('.popup-container');
        if (container && container.children.length === 0) container.remove();
    }, 500);
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}