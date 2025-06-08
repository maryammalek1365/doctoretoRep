
    // کلید ذخیره سازی تاریخچه در localStorage
const SEARCH_HISTORY_KEY = 'searchHistory';

// نمایش تاریخچه جستجو هنگام فوکوس
function showSearchHistory() {
  const historyBox = document.getElementById('searchHistoryBox');
  historyBox.style.display = 'block';
  loadSearchHistory();
}

// مخفی کردن تاریخچه جستجو
function hideSearchHistory() {
  document.getElementById('searchHistoryBox').style.display = 'none';
}

// بارگذاری و نمایش تاریخچه جستجو
function loadSearchHistory() {
  const historyItems = document.getElementById('searchHistoryItems');
  historyItems.innerHTML = '';
  
  const searches = getSearchHistory();
  
  if (searches.length === 0) {
    historyItems.innerHTML = '<div class="search-history-item" style="justify-content: center; color: #888;">هیچ جستجویی انجام نشده است</div>';
    return;
  }
  
  searches.forEach((term, index) => {
    const item = document.createElement('div');
    item.className = 'search-history-item';
    
    const termSpan = document.createElement('span');
    termSpan.textContent = term;
    termSpan.onclick = () => {
      document.getElementById('searchInput').value = term;
      performSearch();
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-history-item';
    deleteBtn.innerHTML = '×';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      removeFromSearchHistory(index);
      loadSearchHistory();
    };
    
    item.appendChild(termSpan);
    item.appendChild(deleteBtn);
    historyItems.appendChild(item);
  });
}

// دریافت تاریخچه از localStorage
function getSearchHistory() {
  const history = localStorage.getItem(SEARCH_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

// اضافه کردن جستجو به تاریخچه
function addToSearchHistory(term) {
  if (!term.trim()) return;
  
  let searches = getSearchHistory();
  searches = searches.filter(item => item.toLowerCase() !== term.toLowerCase());
  searches.unshift(term);
  
  if (searches.length > 10) {
    searches = searches.slice(0, 10);
  }
  
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searches));
}

// حذف آیتم از تاریخچه
function removeFromSearchHistory(index) {
  let searches = getSearchHistory();
  searches.splice(index, 1);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searches));
}

// جستجوی تخصص‌های پرکاربرد
function searchSpecialty(specialty) {
  document.getElementById('searchInput').value = specialty;
  performSearch();
}

// انجام جستجو
// تابع performSearch را با این نسخه جایگزین کنید
function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  
  if (!searchTerm) {
    alert('لطفاً عبارت جستجو را وارد کنید');
    return;
  }
  
  addToSearchHistory(searchTerm);
  hideSearchHistory();
  
  // 1. روش اول: جستجو در صفحه فعلی
  searchInCurrentPage(searchTerm);
  
  // 2. روش دوم: ارسال به صفحه جستجو (حالت پیشرفته)
  // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
}

// تابع جدید برای جستجو در صفحه فعلی
function searchInCurrentPage(term) {
  // پاکسازی هایلایت‌های قبلی
  clearHighlights();
  
  // اگر صفحه شما محتوای داینامیک دارد، این بخش باید اصلاح شود
  const pageContent = document.body.innerHTML;
  const regex = new RegExp(term, 'gi');
  
  // جایگزینی متن یافت شده با نسخه هایلایت شده
  const highlightedContent = pageContent.replace(
    regex, 
    match => `<span class="search-highlight">${match}</span>`
  );
  
  document.body.innerHTML = highlightedContent;
  
  // اسکرول به اولین نتیجه
  const firstResult = document.querySelector('.search-highlight');
  if (firstResult) {
    firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// تابع پاکسازی هایلایت‌ها
function clearHighlights() {
  const highlights = document.querySelectorAll('.search-highlight');
  highlights.forEach(highlight => {
    const parent = highlight.parentNode;
    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
  });
}


// مخفی کردن باکس هنگام کلیک خارج از آن
document.addEventListener('click', function(event) {
  const searchContainer = document.querySelector('.search-container');
  const isClickInside = searchContainer.contains(event.target);
  
  if (!isClickInside) {
    hideSearchHistory();
  }
});

// بارگذاری اولیه تاریخچه
document.addEventListener('DOMContentLoaded', function() {
  loadSearchHistory();
});
