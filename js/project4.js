document.addEventListener('DOMContentLoaded', () => {
  /* PART 1: SETUP VARIABLES
    --------------------------------------------------
    */

  // TODO: Get the elements from the DOM and store them in variables. Include the following elements:
  // - introduction
  // - editIntroButton
  // - projectList
  // - skillList
  // - addSkillButton
  // - newSkillInput
  // - skillLevelInput
  // - contactForm
  // - themeToggleButton
  // - body

  const introduction = document.getElementById('introduction');
  const editIntroButton = document.getElementById('edit-intro');
  const projectList = document.getElementById('project-list');
  const skillList = document.getElementById('skill-list');
  const addSkillButton = document.getElementById('add-skill');
  const newSkillInput = document.getElementById('new-skill');
  const skillLevelInput = document.getElementById('skill-level');
  const contactForm = document.getElementById('contact-form');
  const themeToggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  /* PART 2: IMPLEMENT DYNAMIC PROJECTS AND SKILLS
    --------------------------------------------------
    */

  const projects = [
    // TODO: Add projects here by defining objects with title, description, and link properties
    // Example: { title: 'Project 1', description: 'Description of project 1', link: '#'}
    {
      title: 'Personal Website',
      description: 'My personal website, made with React',
      link: 'https://braydenodonnell.com/',
    },
    {
      title: 'CMST 388 Project 1',
      description: 'Basic JavaScript Selectors and DOM Manipulation',
      link: 'https://cmst388-bodonnell5.azurewebsites.net/cmst388-project1/',
    },
    {
      title: 'CMST 388 Project 2',
      description: 'Registration form with validation',
      link: 'https://cmst388-bodonnell5.azurewebsites.net/cmst388-project2-v2/',
    },
  ];

  const skills = [
    // TODO: Add skills here by defining objects with name and level properties
    {
      name: 'HTML',
      level: 90,
    },
    {
      name: 'CSS',
      level: 80,
    },
    {
      name: 'Web Design',
      level: 70,
    },
    {
      name: 'JavaScript',
      level: 75,
    },
  ];

  function displayProjects() {
    projectList.innerHTML = '';
    projects.forEach(project => {
      // TODO: Create a new div element assigned to a new variable called projectCard and assign a
      // className of 'project-card'. Set innerHTML to display the project title, description, and link
      // Example: projectCard.innerHTML = `<h3>${project.title}</h3> ...`

      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href=${project.link} target='_blank'>View Project</a>
      `;

      projectList.appendChild(projectCard);
    });
  }

  function displaySkills() {
    skillList.innerHTML = '';
    skills.forEach(skill => {
      // TODO: Create a new li element assigned to a new variable called skillItem.
      // Set innerHTML to display the skill name and level
      const skillItem = document.createElement('li');
      skillItem.innerHTML = `
        <p>${skill.name}</p>
        <div class='skill-bar'>
          <div class='skill-bar-fill'></div>
        </div>
        `;

      const skillBarFill = skillItem.querySelector('.skill-bar-fill');
      skillBarFill.style.width = `${skill.level}%`;

      skillList.appendChild(skillItem);
    });
  }

  /* PART 3: IMPLEMENT INTRO TEXT EDITING
    --------------------------------------------------
    */

  introduction.textContent = localStorage.getItem('introText');

  editIntroButton.addEventListener('click', () => {
    // TODO: Prompt the user to enter a new introduction and
    // update the introduction element with the new text
    let isEdit = true;

    if (!isEdit) return;

    editIntroButton.style.display = 'none';
    const introDiv = document.createElement('div');
    introDiv.style.display = 'flex';
    introDiv.style.flexDirection = 'column';
    introDiv.style.gap = '1rem';

    const textArea = document.createElement('textarea');

    const buttonDiv = document.createElement('div');
    buttonDiv.style.display = 'flex';
    buttonDiv.style.gap = '1rem';

    const cancel = document.createElement('button');
    cancel.textContent = 'Cancel';
    const update = document.createElement('button');
    update.textContent = 'Update';

    update.addEventListener('click', () => {
      localStorage.setItem('introText', textArea.value);
      introduction.textContent = localStorage.getItem('introText');
      introDiv.style.display = 'none';
      editIntroButton.style.display = 'flex';
    });

    cancel.addEventListener('click', () => {
      isEdit = false;
      editIntroButton.style.display = 'flex';
      introDiv.style.display = 'none';
    });

    introDiv.appendChild(textArea);
    buttonDiv.appendChild(cancel);
    buttonDiv.appendChild(update);
    introDiv.appendChild(buttonDiv);

    introduction.insertAdjacentElement('afterend', introDiv);
  });

  /* PART 4: IMPLEMENT SKILLS DISPLAY AND CONTACT FORM FUNCTIONALITY
    --------------------------------------------------
    */

  addSkillButton.addEventListener('click', () => {
    const newSkill = newSkillInput.value.trim();
    const skillLevel = parseInt(skillLevelInput.value, 10);
    if (newSkill && skillLevel >= 0 && skillLevel <= 100) {
      // TODO:
      //   1. Add the new skill to the skills array and display the updated list of skills.
      //   2. Clear the input fields after adding the skill
      const skill = {
        name: newSkill,
        level: skillLevel,
      };
      skills.push(skill);
      displaySkills();
      newSkillInput.value = '';
      skillLevelInput.value = '';
    } else {
      // TODO: Display an alert if the skill name is empty or the skill level is not between 0 and 100
      if (!newSkill && !skillLevel) {
        alert('Please enter skill name and level.');
      } else if (!newSkill) {
        alert('Please enter skill name.');
      } else if (!skillLevel) {
        alert('Please enter skill level.');
      }

      if (skillLevel < 0 || skillLevel > 100) {
        alert('Enter skill level between 0 and 100.');
      }
    }
  });

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    // TODO:
    //   1. Get the values from the form fields name, email, and message and store them in variables.
    //   2. Display an alert if any of the fields are empty. Otherwise, display a success message
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please ensure name, email, and message is filled out.');
      return;
    }

    try {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(() => {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        alert('submitted');
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  /* PART 5: IMPLEMENT THEME TOGGLE
    --------------------------------------------------
    */

  themeToggleButton.addEventListener('click', () => {
    // TODO: Toggle the dark-mode class on the body and save the theme preference to local storage
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    applySavedTheme();
  });

  // Do not edit any code below this line
  function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    }
  }

  applySavedTheme();
  displayProjects();
  displaySkills();
});
