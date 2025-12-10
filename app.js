async function loadData(){
  const res = await fetch('outofus.json');
  const data = await res.json();
  return data;
}

function buildTable(data){
  const wrap = document.getElementById('table-wrap');
  wrap.innerHTML = '';
  if (!data || data.length === 0){ wrap.innerHTML = '<p>No data.</p>'; return }

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const cols = Object.keys(data[0]);
  const trh = document.createElement('tr');
  cols.forEach(col=>{
    const th = document.createElement('th');
    th.textContent = col;
    th.addEventListener('click', ()=>{
      sortBy(col);
    });
    trh.appendChild(th);
  });
  thead.appendChild(trh);

  function renderRows(rows){
    tbody.innerHTML = '';
    rows.forEach(r=>{
      const tr = document.createElement('tr');
      cols.forEach(c=>{
        const td = document.createElement('td');
        td.textContent = r[c];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  let current = data.slice();
  renderRows(current);

  table.appendChild(thead);
  table.appendChild(tbody);
  wrap.appendChild(table);

  // search
  const search = document.getElementById('search');
  search.addEventListener('input', ()=>{
    const q = search.value.trim().toLowerCase();
    if (!q){ renderRows(data); current = data.slice(); return }
    const filtered = data.filter(row=>{
      return Object.values(row).join(' ').toLowerCase().includes(q);
    });
    current = filtered;
    renderRows(filtered);
  });

  // sorting
  function sortBy(col){
    const copy = current.slice();
    copy.sort((a,b)=>{
      const A = (a[col]||'').toString().toLowerCase();
      const B = (b[col]||'').toString().toLowerCase();
      if (!isNaN(Number(A)) && !isNaN(Number(B))) return Number(A)-Number(B);
      return A.localeCompare(B);
    });
    current = copy;
    renderRows(current);
  }
}

loadData().then(buildTable).catch(e=>{
  const wrap = document.getElementById('table-wrap');
  if (wrap) wrap.innerHTML = '<p>Error loading data. Make sure <code>outofus.json</code> is present.</p>';
  console.error(e);
});
