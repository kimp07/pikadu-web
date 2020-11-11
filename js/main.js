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
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

// Autorized user visible elements
const userElem = document.querySelector('.user');
const logOutElem = document.querySelector('.exit');
const userNameElem = document.querySelector('.user-name');

const listUsers = [
	{
		id: '01',
		email: 'alex@mail.com',
		password: '12345',
		displayName: 'AlexAA'
	},
	{
		id: '02',
		email: 'margo@mail.com',
		password: '12345',
		displayName: 'MargoMM'
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
	}
};

const toggleAuthDom = () => {
	const user = setUsers.user;
	if (user) {
		loginElem.style.display = 'none';
		userElem.style.display = '';
		userNameElem.textContent = user.displayName;
	} else {
		loginElem.style.display = '';
		userElem.style.display = 'none';

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

toggleAuthDom();