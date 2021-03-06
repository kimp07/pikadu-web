// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

// Login elements
const loginDiv = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

// Autorized user visible elements
const userElem = document.querySelector('.user');
const logOutElem = document.querySelector('.exit');
const userNameElem = document.querySelector('.user-name');
const userEditElem = document.querySelector('.user-edit');
const sidebarNavDiv = document.querySelector('.sidebar-nav');

// Edit profile
const editProfileDiv = document.querySelector('.edit-profile');
const editProfileForm = document.querySelector('.edit-profile-form');
const editProfileCancelElem = document.querySelector('.edit-profile-cancel');
const editProfileNameElem = document.querySelector('.edit-profile-name');
const editProfileAvatarElem = document.querySelector('.edit-profile-avatar');


const listUsers = [
	{
		id: '01',
		email: 'alex@mail.com',
		password: '12345',
		displayName: 'AlexAA',
		avatarUrl: ''
	},
	{
		id: '02',
		email: 'margo@mail.com',
		password: '12345',
		displayName: 'MargoMM',
		avatarUrl: ''
	}
];

const setUsers = {
	user: null,

	/**
	 * @param  {email [String]}
	 * @param  {password [String]}
	 */
	logIn(email, password, handler) {
		const user = this.getUser(email);
		if (user && user.email === email) {
			this.autorizedUser(user);
			handler();
		} else {
			alert('Неверные email или пароль!');
		}		
	},

	/**
	 * 
	 * @param {function} handler 
	 */
	logOut(handler) {
		this.autorizedUser(null);
		handler();
	},
	/**
	 * @param  {email [String]}
	 * @param  {password [String]}
	 */
	signUp(email, password, handler) {
		if (email.split('@').length === 2) {
			let user = this.getUser(email);
			if (!user) {
				user = {email, password, displayName: email.split("@",1)[0]};
				listUsers.push(user);
				this.autorizedUser(user);
				handler();
			} else {
				alert('Пользователь с таким email зарегистрирован!');
			}
		} else {
			alert('Неверный формат записи email');
		}
	},
	
	/**
	 * @param  {email [String]}
	 * @return {user [Object] if exists or null otherwise}
	 */
	getUser(email) {
		return listUsers.find(item => item.email === email);
	},

	autorizedUser(user) {
		this.user = user;
	},

	editProfileShow() {
		const user = this.user;
		if (user) {
			editProfileNameElem.value = user.displayName;
			editProfileAvatarElem.value = user.avatarUrl;
			editProfileDiv.style.display = '';
		}
	}
};

const toggleAuthDom = () => {
	const user = setUsers.user;
	editProfileDiv.style.display = 'none';
	if (user) {
		loginDiv.style.display = 'none';
		userElem.style.display = '';
		sidebarNavDiv.style.display = '';
		userNameElem.textContent = user.displayName;
	} else {
		loginDiv.style.display = '';
		userElem.style.display = 'none';
		sidebarNavDiv.style.display = 'none';
	}
};

loginForm.addEventListener('submit', event => {
	event.preventDefault();

	const emailValue = emailInput.value;
	const passwordValue = passwordInput.value;

	setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', event => {
	event.preventDefault();

	const emailValue = emailInput.value;
	const passwordValue = passwordInput.value;

	setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

logOutElem.addEventListener('click', event => {
	event.preventDefault();

	setUsers.logOut(toggleAuthDom);
});

userEditElem.addEventListener('click', event => {
	event.preventDefault();
	setUsers.editProfileShow();
});

toggleAuthDom();
