import { getMenuItems, setMenuItems } from './src/storage.js';

let currentMenuItems = [];
let editingItem = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  setupEventListeners();
});

async function loadData() {
  currentMenuItems = await getMenuItems();
  renderMenuItems();
}

function setupEventListeners() {
  document.getElementById('addMenuItem').addEventListener('click', () => showModal());
  document.getElementById('cancelModal').addEventListener('click', hideModal);
  document.getElementById('modalForm').addEventListener('submit', handleSave);
  
  // Close modal when clicking outside
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') hideModal();
  });
}

function renderMenuItems() {
  const container = document.getElementById('menuItems');
  container.innerHTML = '';
  
  currentMenuItems.forEach(item => {
    const div = createItemElement(item);
    container.appendChild(div);
  });
}

function createItemElement(item) {
  const div = document.createElement('div');
  div.className = 'item';
  if (!item.enabled) {
    div.classList.add('disabled');
  }
  
  div.innerHTML = `
    <div class="item-info">
      <div class="item-name">${item.name}</div>
      <div class="item-id">${item.id}</div>
      <div class="item-template">${escapeHtml(item.template)}</div>
    </div>
    <div class="item-actions">
      <button class="btn btn-sm" onclick="window.editItem('${item.id}')">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="window.deleteItem('${item.id}')">Delete</button>
    </div>
  `;
  
  return div;
}

function showModal(item = null) {
  editingItem = item;
  
  const modal = document.getElementById('modal');
  const title = document.getElementById('modalTitle');
  const form = document.getElementById('modalForm');
  
  // Reset form
  form.reset();
  
  // Set title
  title.textContent = item ? 'Edit Menu Item' : 'Add Menu Item';
  
  // Show template and enabled fields
  document.getElementById('templateGroup').style.display = 'block';
  document.getElementById('enabledGroup').style.display = 'block';
  
  // Fill form if editing
  if (item) {
    document.getElementById('itemId').value = item.id;
    document.getElementById('itemId').disabled = true;
    document.getElementById('itemName').value = item.name || '';
    document.getElementById('itemTemplate').value = item.template || '';
    document.getElementById('itemEnabled').checked = item.enabled !== false;
  } else {
    document.getElementById('itemId').disabled = false;
    document.getElementById('itemEnabled').checked = true;
  }
  
  modal.style.display = 'flex';
}

function hideModal() {
  document.getElementById('modal').style.display = 'none';
  editingItem = null;
}

async function handleSave(e) {
  e.preventDefault();
  
  const id = document.getElementById('itemId').value;
  const name = document.getElementById('itemName').value;
  const template = document.getElementById('itemTemplate').value;
  const enabled = document.getElementById('itemEnabled').checked;
  
  const menuItem = { id, name, template, enabled };
  
  if (editingItem) {
    // Update existing
    const index = currentMenuItems.findIndex(item => item.id === editingItem.id);
    if (index !== -1) {
      currentMenuItems[index] = menuItem;
    }
  } else {
    // Add new
    currentMenuItems.push(menuItem);
  }
  
  await setMenuItems(currentMenuItems);
  showStatus('Saved successfully!');
  hideModal();
  await loadData();
}

window.editItem = function(id) {
  const item = currentMenuItems.find(i => i.id === id);
  if (item) {
    showModal(item);
  }
};

window.deleteItem = async function(id) {
  if (!confirm('Are you sure you want to delete this menu item?')) {
    return;
  }
  
  currentMenuItems = currentMenuItems.filter(item => item.id !== id);
  await setMenuItems(currentMenuItems);
  
  showStatus('Deleted successfully!');
  await loadData();
};

function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.display = 'block';
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}