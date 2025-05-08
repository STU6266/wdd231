
const courses = [
    { code: "CSEPC 110", name: "Indroduction to Programming",credits: 2, type: "CSE", completed: true  },
    { code: "CSE 111", name: "Programming with Functions",credits: 2, type: "CSE", completed: false },
    { code: "WDD 130", name: "Web Development Foundations",credits: 2, type: "WDD", completed: true  },
    { code: "CSE 210", name: "Programming with Classes",  credits: 2, type: "CSE", completed: false },
    { code: "WDD 131", name: "Dynamic Web Fundamentals",  credits: 2, type: "WDD", completed: true  },
    { code: "WDD 231", name: "JavaScript Essentials",     credits: 2, type: "WDD", completed: false },
  ];
  
 
  const grid     = document.querySelector('.courses-grid');
  const totalEl  = document.getElementById('totalCredits');
  const btnAll   = document.getElementById('filter-all');
  const btnCSE   = document.getElementById('filter-cse');
  const btnWDD   = document.getElementById('filter-wdd');
  
  
  function render(list) {
    grid.innerHTML = "";  
  
    const sum = list.reduce((acc, c) => acc + c.credits, 0);
    totalEl.textContent = `Total Credits: ${sum}`;
  
   
    list.forEach(c => {
      const card = document.createElement('div');
      card.classList.add('course-card');
      if (c.completed) card.classList.add('completed');
  
      card.innerHTML = `
        <h3>${c.code}</h3>
        <p>${c.name}</p>
        <p>${c.credits} Credits</p>
      `;
      grid.appendChild(card);
    });
  }
  

  btnAll.addEventListener('click', () => render(courses));
  btnCSE.addEventListener('click', () => render(courses.filter(c => c.type === "CSE")));
  btnWDD.addEventListener('click', () => render(courses.filter(c => c.type === "WDD")));
 
  render(courses);
  