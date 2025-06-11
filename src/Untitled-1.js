
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
     search();
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
 search();
}

// انجام جستجو
// تابع performSearch را با این نسخه جایگزین کنید
// // ...existing code...
// function performSearch() {
//   document.getElementById('searchStatus').textContent = 'در حال جستجو...';
//   const searchTerm = document.getElementById('searchInput').value.trim();
//   if (!searchTerm) {
//     alert('لطفاً عبارت جستجو را وارد کنید');
//     document.getElementById('searchStatus').textContent = '';
//     return;
//   }
//   addToSearchHistory(searchTerm);
//   hideSearchHistory();
//   searchInCurrentPage(searchTerm);
//   document.getElementById('searchStatus').textContent = 'جستجو انجام شد!';
// }
// ...existing code...

// تابع جدید برای جستجو در صفحه فعلی
// function searchInCurrentPage(term) {
//   clearHighlights();
//   const container = document.getElementById('resultsContainer'); // Make sure this ID exists in your HTML
//   if (!container) return;
//   const regex = new RegExp(term, 'gi');
//   container.innerHTML = container.innerHTML.replace(
//     regex,
//     match => `<span class="search-highlight">${match}</span>`
//   );
//   const firstResult = container.querySelector('.search-highlight');
//   if (firstResult) {
//     firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   }
// }

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
// Example data array for search
const data = [
  "کودکان",
  "نوجوانان",
  "بزرگسالان",
  "پزشکی کودکان",
  "پزشکی بزرگسالان",
  "ادبیات فارسی",
  "علم کامپیوتر",
  "تکنولوژی اطلاعات",
  "مسائل اجتماعی",
  "محیط زیست"
];
// ...existing code...
function search() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  if (input === "") {
    // اگر ورودی خالی بود، نتایج را پاک کن
    document.getElementById('resultsContainer').innerHTML = '';
    return;
  }
  const filteredResults = data.filter(item => item.toLowerCase().includes(input));
  displayResults(filteredResults);
}
function displayResults(results) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (results.length === 0) {
    resultsContainer.innerHTML = '<div>No results found.</div>';
  } else {
    results.forEach(result => {
      const div = document.createElement('div');
      div.className = 'result';
      if (searchTerm) {
        // Highlight the search term
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        div.innerHTML = result.replace(regex, '<span class="search-highlight">$1</span>');
      } else {
        div.textContent = result;
      }
      resultsContainer.appendChild(div);
    });
  }
}
