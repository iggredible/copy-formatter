let isPopupOpen = false;
let currentPopup = null;

document.addEventListener('keydown', async (event) => {
  if (event.key === '"' && !isPopupOpen) {
    event.preventDefault();
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      chrome.runtime.sendMessage({ action: 'getMenuItems' }, (response) => {
        if (response && response.menuItems) {
          showPopup(response.menuItems, rect, selection.toString());
        }
      });
    }
  }
  
  if (event.key === 'Escape' && isPopupOpen) {
    closePopup();
  }
});

function showPopup(menuItems, rect, selectedText) {
  closePopup();
  
  const popup = document.createElement('div');
  popup.className = 'scpf-popup';
  
  const enabledItems = menuItems.filter(item => item.enabled);
  
  if (enabledItems.length === 0) {
    const noItemsDiv = document.createElement('div');
    noItemsDiv.className = 'scpf-no-items';
    noItemsDiv.textContent = 'No menu items available';
    popup.appendChild(noItemsDiv);
  } else {
    enabledItems.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'scpf-menu-item';
      itemDiv.textContent = item.name;
      itemDiv.dataset.index = index;
      itemDiv.dataset.itemId = item.id;
      
      itemDiv.addEventListener('click', () => {
        handleMenuItemClick(item, selectedText);
      });
      
      itemDiv.addEventListener('mouseenter', () => {
        document.querySelectorAll('.scpf-menu-item').forEach(el => {
          el.classList.remove('selected');
        });
        itemDiv.classList.add('selected');
      });
      
      popup.appendChild(itemDiv);
    });
  }
  
  document.body.appendChild(popup);
  
  const popupRect = popup.getBoundingClientRect();
  let top = rect.bottom + window.scrollY + 5;
  let left = rect.left + window.scrollX;
  
  if (top + popupRect.height > window.innerHeight + window.scrollY) {
    top = rect.top + window.scrollY - popupRect.height - 5;
  }
  
  if (left + popupRect.width > window.innerWidth + window.scrollX) {
    left = window.innerWidth + window.scrollX - popupRect.width - 10;
  }
  
  popup.style.top = `${top}px`;
  popup.style.left = `${left}px`;
  
  currentPopup = popup;
  isPopupOpen = true;
  
  if (enabledItems.length > 0) {
    popup.querySelector('.scpf-menu-item').classList.add('selected');
  }
  
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleKeyNavigation);
}

function closePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
    isPopupOpen = false;
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleKeyNavigation);
  }
}

function handleOutsideClick(event) {
  if (!currentPopup.contains(event.target)) {
    closePopup();
  }
}

function handleKeyNavigation(event) {
  if (!isPopupOpen || !currentPopup) return;
  
  const items = currentPopup.querySelectorAll('.scpf-menu-item');
  const selectedItem = currentPopup.querySelector('.scpf-menu-item.selected');
  let currentIndex = selectedItem ? parseInt(selectedItem.dataset.index) : -1;
  
  switch(event.key) {
    case 'ArrowDown':
      event.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      break;
    case 'ArrowUp':
      event.preventDefault();
      currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      break;
    case 'Enter':
      event.preventDefault();
      if (selectedItem) {
        selectedItem.click();
      }
      return;
    case 'Escape':
      event.preventDefault();
      closePopup();
      return;
    default:
      return;
  }
  
  items.forEach((item, index) => {
    item.classList.toggle('selected', index === currentIndex);
  });
}

function handleMenuItemClick(item, selectedText) {
  chrome.runtime.sendMessage({
    action: 'formatText',
    itemId: item.id,
    selectedText: selectedText,
    pageUrl: window.location.href,
    pageTitle: document.title
  }, (response) => {
    if (response && response.formattedText) {
      navigator.clipboard.writeText(response.formattedText).then(() => {
        showNotification('Copied to clipboard!');
      });
    }
  });
  
  closePopup();
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'scpf-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}