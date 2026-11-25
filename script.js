const BOOKS_KEY = 'college_lib_catalog_v5';
const ISSUES_KEY = 'college_lib_issues_v5';
const FINE_PER_DAY = 5;
const MAX_BOOKS_PER_STUDENT = 3;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getRealTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDaysToDateStr(baseDateStr, offsetDays) {
  const [y, m, d] = baseDateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d + offsetDays);
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateMidnight(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

let activeCheckDate = getRealTodayStr();

function getFineDetails(dueDateStr, checkDateStr = activeCheckDate) {
  if (!dueDateStr || !checkDateStr)
    return { overdueDays: 0, fine: 0, isOverdue: false };
  const refDate = parseDateMidnight(checkDateStr);
  const due = parseDateMidnight(dueDateStr);
  const diffDays = Math.floor((refDate - due) / MS_PER_DAY);

  if (diffDays > 0) {
    return {
      overdueDays: diffDays,
      fine: diffDays * FINE_PER_DAY,
      isOverdue: true,
    };
  }
  return { overdueDays: 0, fine: 0, isOverdue: false };
}

function buildInitialCatalog() {
  return [
    {
      id: 1001,
      title: 'Database System Concepts',
      author: 'Abraham Silberschatz',
      department: 'Computer Science (CSE)',
      isbn: '978-0078022159',
      rack: 'R-CS-01',
      totalCopies: 5,
    },
    {
      id: 1002,
      title: 'Operating System Concepts',
      author: 'Peter Baer Galvin',
      department: 'Computer Science (CSE)',
      isbn: '978-1119800361',
      rack: 'R-CS-02',
      totalCopies: 4,
    },
    {
      id: 1003,
      title: 'Compilers: Principles, Techniques & Tools',
      author: 'Alfred V. Aho',
      department: 'Computer Science (CSE)',
      isbn: '978-0321486813',
      rack: 'R-CS-03',
      totalCopies: 3,
    },
    {
      id: 1004,
      title: 'Introduction to Algorithms (CLRS)',
      author: 'Thomas H. Cormen',
      department: 'Computer Science (CSE)',
      isbn: '978-0262046305',
      rack: 'R-CS-04',
      totalCopies: 4,
    },
    {
      id: 1005,
      title: 'Computer Networking: A Top-Down Approach',
      author: 'James F. Kurose',
      department: 'Information Technology (IT)',
      isbn: '978-0136681557',
      rack: 'R-IT-01',
      totalCopies: 5,
    },
    {
      id: 1006,
      title: 'Web Technologies: HTML, CSS, JavaScript',
      author: 'Uttam K. Roy',
      department: 'Information Technology (IT)',
      isbn: '978-0198066224',
      rack: 'R-IT-02',
      totalCopies: 4,
    },
    {
      id: 1007,
      title: 'Software Engineering: A Practitioner’s Approach',
      author: 'Roger S. Pressman',
      department: 'Information Technology (IT)',
      isbn: '978-0078022128',
      rack: 'R-IT-03',
      totalCopies: 3,
    },
    {
      id: 1008,
      title: 'Digital Design',
      author: 'M. Morris Mano',
      department: 'Electronics (ECE)',
      isbn: '978-0134549897',
      rack: 'R-EC-01',
      totalCopies: 4,
    },
    {
      id: 1009,
      title: 'Microelectronic Circuits',
      author: 'Adel S. Sedra & Kenneth Smith',
      department: 'Electronics (ECE)',
      isbn: '978-0190853464',
      rack: 'R-EC-02',
      totalCopies: 3,
    },
    {
      id: 1010,
      title: 'Signals and Systems',
      author: 'Alan V. Oppenheim',
      department: 'Electronics (ECE)',
      isbn: '978-0138147570',
      rack: 'R-EC-03',
      totalCopies: 2,
    },
    {
      id: 1011,
      title: 'Engineering Thermodynamics',
      author: 'P. K. Nag',
      department: 'Mechanical Engineering',
      isbn: '978-1259062568',
      rack: 'R-ME-01',
      totalCopies: 4,
    },
    {
      id: 1012,
      title: 'Theory of Machines',
      author: 'S. S. Rattan',
      department: 'Mechanical Engineering',
      isbn: '978-9351343479',
      rack: 'R-ME-02',
      totalCopies: 3,
    },
    {
      id: 1013,
      title: 'Fluid Mechanics',
      author: 'R. K. Bansal',
      department: 'Mechanical Engineering',
      isbn: '978-8131808153',
      rack: 'R-ME-03',
      totalCopies: 4,
    },
    {
      id: 1014,
      title: 'Strength of Materials',
      author: 'R. K. Bansal',
      department: 'Civil Engineering',
      isbn: '978-8131808146',
      rack: 'R-CE-01',
      totalCopies: 3,
    },
    {
      id: 1015,
      title: 'Surveying Vol. 1',
      author: 'B. C. Punmia',
      department: 'Civil Engineering',
      isbn: '978-8170088530',
      rack: 'R-CE-02',
      totalCopies: 3,
    },
    {
      id: 1016,
      title: 'Principles of Marketing',
      author: 'Philip Kotler',
      department: 'Management (BBA/MBA)',
      isbn: '978-0134492513',
      rack: 'R-MG-01',
      totalCopies: 4,
    },
    {
      id: 1017,
      title: 'Financial Management',
      author: 'I. M. Pandey',
      department: 'Management (BBA/MBA)',
      isbn: '978-9325982291',
      rack: 'R-MG-02',
      totalCopies: 3,
    },
    {
      id: 1018,
      title: 'Higher Engineering Mathematics',
      author: 'B. S. Grewal',
      department: 'Applied Mathematics',
      isbn: '978-8193328491',
      rack: 'R-MA-01',
      totalCopies: 6,
    },
    {
      id: 1019,
      title: 'Discrete Mathematics and Its Applications',
      author: 'Kenneth H. Rosen',
      department: 'Applied Mathematics',
      isbn: '978-1259676512',
      rack: 'R-MA-02',
      totalCopies: 4,
    },
    {
      id: 1020,
      title: 'Technical Communication: Principles & Practice',
      author: 'Meenakshi Raman',
      department: 'Literature & Humanities',
      isbn: '978-0199457496',
      rack: 'R-HU-01',
      totalCopies: 5,
    },
  ];
}

function buildInitialIssues() {
  const today = getRealTodayStr();
  return [
    {
      issueId: 5001,
      bookId: 1001,
      studentRoll: 'CSE-2026-014',
      studentName: 'Rohan Sharma',
      issueDate: addDaysToDateStr(today, -11),
      dueDate: addDaysToDateStr(today, -4),
    },
    {
      issueId: 5002,
      bookId: 1005,
      studentRoll: 'IT-2026-029',
      studentName: 'Sneha Das',
      issueDate: addDaysToDateStr(today, -3),
      dueDate: addDaysToDateStr(today, 4),
    },
    {
      issueId: 5003,
      bookId: 1008,
      studentRoll: 'ECE-2026-007',
      studentName: 'Vikram Patel',
      issueDate: addDaysToDateStr(today, -9),
      dueDate: addDaysToDateStr(today, -2),
    },
    {
      issueId: 5004,
      bookId: 1011,
      studentRoll: 'ME-2026-019',
      studentName: 'Ananya Verma',
      issueDate: addDaysToDateStr(today, -1),
      dueDate: addDaysToDateStr(today, 6),
    },
  ];
}

let savedBooks = JSON.parse(localStorage.getItem(BOOKS_KEY));
let savedIssues = JSON.parse(localStorage.getItem(ISSUES_KEY));

let books =
  Array.isArray(savedBooks) && savedBooks.length > 0
    ? savedBooks
    : buildInitialCatalog();
let issues = Array.isArray(savedIssues) ? savedIssues : buildInitialIssues();

let issueTargetBookId = null;
let returnTargetIssueId = null;

function saveAll() {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
}

function syncCheckDateUI() {
  document.getElementById('simDateInput').value = activeCheckDate;
  const realToday = getRealTodayStr();
  const modeLabel =
    activeCheckDate === realToday ? 'Real Today' : 'Custom Simulation Date';
  document.getElementById(
    'registerDateNote'
  ).textContent = `Calculating Overdue & ₹5/day Fine as of ${activeCheckDate} (${modeLabel}) | Max 3 books per Roll No.`;
}

function resetToRealToday() {
  activeCheckDate = getRealTodayStr();
  syncCheckDateUI();
  updateStats();
  renderIssues();
}

function getIssuedCountForBook(bookId) {
  return issues.filter((i) => i.bookId === bookId).length;
}

function getAvailableCopies(book) {
  return Math.max(0, book.totalCopies - getIssuedCountForBook(book.id));
}

function toggleRules() {
  document.getElementById('rulesPanel').classList.toggle('hidden');
}

function updateStats() {
  const totalTitles = books.length;
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const activeIssuesCount = issues.length;
  const availableCopies = Math.max(0, totalCopies - activeIssuesCount);
  const totalPendingFine = issues.reduce(
    (sum, i) => sum + getFineDetails(i.dueDate, activeCheckDate).fine,
    0
  );

  document.getElementById(
    'totalBooks'
  ).textContent = `${totalTitles} / ${totalCopies}`;
  document.getElementById('availableBooks').textContent = availableCopies;
  document.getElementById('issuedBooks').textContent = activeIssuesCount;
  document.getElementById('pendingFine').textContent = `₹${totalPendingFine}`;
}

function renderCatalog() {
  const query = document
    .getElementById('searchCatalog')
    .value.toLowerCase()
    .trim();
  const dept = document.getElementById('deptFilter').value;
  const availFilter = document.getElementById('availabilityFilter').value;

  const filtered = books.filter((book) => {
    const avail = getAvailableCopies(book);
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query) ||
      book.rack.toLowerCase().includes(query) ||
      String(book.id).includes(query);

    const matchesDept = dept === 'All' || book.department === dept;
    let matchesStock = true;
    if (availFilter === 'Available') matchesStock = avail > 0;
    else if (availFilter === 'OutOfStock') matchesStock = avail === 0;

    return matchesSearch && matchesDept && matchesStock;
  });

  const tbody = document.getElementById('catalogBody');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b; padding:20px;">No books match this filter.</td></tr>`;
    return;
  }

  filtered.forEach((book) => {
    const avail = getAvailableCopies(book);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${book.id}</strong></td>
      <td>
        <div class="book-title">${book.title}</div>
        <div class="sub-text">by ${book.author}</div>
      </td>
      <td><span class="dept-pill">${book.department}</span></td>
      <td>
        <div>${book.isbn}</div>
        <div class="sub-text">Shelf: <strong>${book.rack}</strong></div>
      </td>
      <td>
        <span class="badge ${avail > 0 ? 'badge-available' : 'badge-overdue'}">
          ${avail} / ${book.totalCopies} Available
        </span>
      </td>
      <td class="actions-cell">
        <button class="btn-small btn-issue" ${
          avail === 0 ? 'disabled' : ''
        } onclick="openIssueModal(${book.id})">
          Issue Book
        </button>
        <button class="btn-small btn-edit" onclick="editBook(${
          book.id
        })">Edit</button>
        <button class="btn-small btn-delete" onclick="deleteBook(${
          book.id
        })">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderIssues() {
  const query = document
    .getElementById('searchIssues')
    .value.toLowerCase()
    .trim();
  const statusFilter = document.getElementById('issueFilter').value;

  const filtered = issues.filter((item) => {
    const book = books.find((b) => b.id === item.bookId);
    const bookTitle = book ? book.title.toLowerCase() : '';
    const { isOverdue } = getFineDetails(item.dueDate, activeCheckDate);

    const matchesSearch =
      item.studentName.toLowerCase().includes(query) ||
      item.studentRoll.toLowerCase().includes(query) ||
      bookTitle.includes(query) ||
      String(item.issueId).includes(query);

    let matchesStatus = true;
    if (statusFilter === 'Overdue') matchesStatus = isOverdue;
    else if (statusFilter === 'OnTime') matchesStatus = !isOverdue;

    return matchesSearch && matchesStatus;
  });

  const tbody = document.getElementById('issueBody');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#64748b; padding:20px;">No issued book records found.</td></tr>`;
    return;
  }

  filtered.forEach((item) => {
    const book = books.find((b) => b.id === item.bookId);
    const { overdueDays, fine, isOverdue } = getFineDetails(
      item.dueDate,
      activeCheckDate
    );

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#ISS-${item.issueId}</strong></td>
      <td>
        <div class="book-title">${item.studentName}</div>
        <div class="sub-text">Roll No: <strong>${
          item.studentRoll
        }</strong></div>
      </td>
      <td>
        <div class="book-title">${book ? book.title : 'Deleted Book'}</div>
        <div class="sub-text">${
          book ? `${book.department} • #${book.id}` : ''
        }</div>
      </td>
      <td>
        <div>Issued: ${item.issueDate}</div>
        <div class="sub-text">Due: <strong>${item.dueDate}</strong></div>
      </td>
      <td>
        <span class="badge ${isOverdue ? 'badge-overdue' : 'badge-issued'}">
          ${isOverdue ? `Overdue (${overdueDays}d)` : 'Active'}
        </span>
      </td>
      <td>
        ${
          fine > 0
            ? `<span class="fine-amount">₹${fine}</span><div class="sub-text">${overdueDays}d × ₹5</div>`
            : `<span class="fine-none">₹0</span>`
        }
      </td>
      <td>
        <button class="btn-small btn-return" onclick="openReturnModal(${
          item.issueId
        })">
          Return${fine > 0 ? ` (₹${fine})` : ''}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function refreshAll() {
  saveAll();
  syncCheckDateUI();
  updateStats();
  renderCatalog();
  renderIssues();
}

// Add / Update Book
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const editId = document.getElementById('editId').value;
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const department = document.getElementById('department').value;
  const isbn = document.getElementById('isbn').value.trim();
  const rack = document.getElementById('rack').value.trim().toUpperCase();
  const copies = Math.max(
    1,
    parseInt(document.getElementById('copies').value, 10) || 1
  );

  if (editId) {
    const book = books.find((b) => b.id === Number(editId));
    if (book) {
      const currentlyIssued = getIssuedCountForBook(book.id);
      book.title = title;
      book.author = author;
      book.department = department;
      book.isbn = isbn;
      book.rack = rack;
      book.totalCopies = Math.max(copies, currentlyIssued);
    }
    cancelEdit();
  } else {
    const nextId = books.length
      ? Math.max(...books.map((b) => b.id)) + 1
      : 1001;
    books.unshift({
      id: nextId,
      title,
      author,
      department,
      isbn,
      rack,
      totalCopies: copies,
    });
    this.reset();
    document.getElementById('copies').value = 3;
  }

  refreshAll();
});

function editBook(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;

  document.getElementById('editId').value = book.id;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('department').value = book.department;
  document.getElementById('isbn').value = book.isbn;
  document.getElementById('rack').value = book.rack;
  document.getElementById('copies').value = book.totalCopies;

  document.getElementById('formTitle').textContent = `Edit Book #${book.id}`;
  document.getElementById('submitBtn').textContent = 'Update Book';
  document.getElementById('cancelEditBtn').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  document.getElementById('editId').value = '';
  document.getElementById('bookForm').reset();
  document.getElementById('copies').value = 3;
  document.getElementById('formTitle').textContent = 'Add New Book to Catalog';
  document.getElementById('submitBtn').textContent = '+ Add Book';
  document.getElementById('cancelEditBtn').classList.add('hidden');
}

// Issue Modal
function setDueFromRefDays(days) {
  document.getElementById('dueDateInput').value = addDaysToDateStr(
    activeCheckDate,
    days
  );
}

function openIssueModal(bookId) {
  const book = books.find((b) => b.id === bookId);
  if (!book || getAvailableCopies(book) <= 0) return;

  issueTargetBookId = bookId;
  document.getElementById(
    'issueBookLabel'
  ).textContent = `#${book.id} — ${book.title} (${book.department})`;
  document.getElementById('studentRollInput').value = '';
  document.getElementById('studentNameInput').value = '';
  document.getElementById('issueError').classList.add('hidden');
  setDueFromRefDays(7);
  document.getElementById('issueModal').classList.remove('hidden');
  document.getElementById('studentRollInput').focus();
}

function closeIssueModal() {
  issueTargetBookId = null;
  document.getElementById('issueModal').classList.add('hidden');
}

function showIssueError(msg) {
  const err = document.getElementById('issueError');
  err.textContent = msg;
  err.classList.remove('hidden');
}

function confirmIssue() {
  const roll = document
    .getElementById('studentRollInput')
    .value.trim()
    .toUpperCase();
  const name = document.getElementById('studentNameInput').value.trim();
  const dueDate = document.getElementById('dueDateInput').value;

  if (!roll || !name || !dueDate) {
    showIssueError(
      'Please enter Student Roll Number, Full Name, and Due Date.'
    );
    return;
  }

  const studentActiveIssues = issues.filter(
    (i) => i.studentRoll.toUpperCase() === roll
  );

  if (studentActiveIssues.length >= MAX_BOOKS_PER_STUDENT) {
    showIssueError(
      `Library Rule Violation: ${roll} already has ${MAX_BOOKS_PER_STUDENT} active books issued.`
    );
    return;
  }

  if (studentActiveIssues.some((i) => i.bookId === issueTargetBookId)) {
    showIssueError(
      `Library Rule Violation: ${roll} already holds a copy of this book.`
    );
    return;
  }

  const nextIssueId = issues.length
    ? Math.max(...issues.map((i) => i.issueId)) + 1
    : 5001;
  issues.unshift({
    issueId: nextIssueId,
    bookId: issueTargetBookId,
    studentRoll: roll,
    studentName: name,
    issueDate: activeCheckDate,
    dueDate,
  });

  closeIssueModal();
  refreshAll();
}

// Return & Fine Settlement with Custom Return Date
function openReturnModal(issueId) {
  const item = issues.find((i) => i.issueId === issueId);
  if (!item) return;

  returnTargetIssueId = issueId;
  document.getElementById('returnDateInput').value = activeCheckDate;
  updateReturnSummary();
  document.getElementById('returnModal').classList.remove('hidden');
}

function updateReturnSummary() {
  const item = issues.find((i) => i.issueId === returnTargetIssueId);
  if (!item) return;

  const returnDate =
    document.getElementById('returnDateInput').value || activeCheckDate;
  const book = books.find((b) => b.id === item.bookId);
  const { overdueDays, fine } = getFineDetails(item.dueDate, returnDate);

  document.getElementById('returnSummary').innerHTML = `
    <div><strong>Issue ID:</strong> #ISS-${item.issueId}</div>
    <div><strong>Student:</strong> ${item.studentName} (${
    item.studentRoll
  })</div>
    <div><strong>Book:</strong> ${
      book ? book.title : 'Book #' + item.bookId
    }</div>
    <div><strong>Issued On:</strong> ${
      item.issueDate
    } | <strong>Due Date:</strong> ${item.dueDate}</div>
    <div><strong>Return Date:</strong> ${returnDate}</div>
    <div class="summary-fine">
      ${
        fine > 0
          ? `Late by ${overdueDays} day(s) × ₹5/day = Fine ₹${fine}`
          : `Returned On/Before Due Date — Fine ₹0`
      }
    </div>
  `;

  document.getElementById('confirmReturnBtn').textContent =
    fine > 0 ? `Collect ₹${fine} & Return Book` : 'Confirm Return';
}

function closeReturnModal() {
  returnTargetIssueId = null;
  document.getElementById('returnModal').classList.add('hidden');
}

function confirmReturn() {
  issues = issues.filter((i) => i.issueId !== returnTargetIssueId);
  closeReturnModal();
  refreshAll();
}

// Delete Book
function deleteBook(id) {
  books = books.filter((b) => b.id !== id);
  issues = issues.filter((i) => i.bookId !== id);
  if (Number(document.getElementById('editId').value) === id) {
    cancelEdit();
  }
  refreshAll();
}

// Reset Full Catalog
function resetDemoData() {
  books = buildInitialCatalog();
  issues = buildInitialIssues();
  activeCheckDate = getRealTodayStr();
  cancelEdit();
  refreshAll();
}

// Event Listeners
document
  .getElementById('simDateInput')
  .addEventListener('change', function (e) {
    if (!e.target.value) {
      activeCheckDate = getRealTodayStr();
    } else {
      activeCheckDate = e.target.value;
    }
    syncCheckDateUI();
    updateStats();
    renderIssues();
  });

document
  .getElementById('searchCatalog')
  .addEventListener('input', renderCatalog);
document.getElementById('deptFilter').addEventListener('change', renderCatalog);
document
  .getElementById('availabilityFilter')
  .addEventListener('change', renderCatalog);

document.getElementById('searchIssues').addEventListener('input', renderIssues);
document.getElementById('issueFilter').addEventListener('change', renderIssues);

refreshAll();
