export class RegisterPage {
	
    constructor(page) {
		// техническое описание страницы
		//todo нейминг
		this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
		this.emailInput = page.getByRole('textbox', { name: 'Email' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.signupButton = page.getByRole('button', { name: 'Sign up' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
		this.emailErrorText = page.getByText(
			'Email already exists.. try logging in',
		);
	}
	// Регистрация
	async register(user) {
		const { name, email, password } = user;
		await this.nameInput.click();
		await this.nameInput.fill(name);
		await this.emailInput.click();
		await this.emailInput.fill(email);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.signupButton.click();
	}

    // Авторизация
    async login (email = '12345@gmail.com' ,password = '12345') {
        //const {email,password} = user;
        await this.emailInput.click();
		await this.emailInput.fill(email);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.loginButton.click();
    }
}