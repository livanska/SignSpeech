export interface IAppStrings {
  AUTH: {
    slogam: string;
    error: {
      passwordMatch: string;
      emptyFields: string;
      invalidEmail: string;
      incorrectData: string;
      serverError: string;
    };
    register: {
      preLinkText: string;
      linkText: string;
      buttonTitle: string;
    };
    login: {
      preLinkText: string;
      linkText: string;
      buttonTitle: string;
    };
    userProps: {
      email: string;
      password: string;
      fullName: string;
      profileImage: string;
      confirmPassword: string;
    };
  };
}

export const APP_STRINGS = {
  'pt-BR': {
    home: {},
    learning: {},
    translate: {},
    profile: {},
    AUTH: {
      slogam: 'We all love in the same language.',
      error: {
        passwordMatch: 'As senhas não conferem!',
        emptyFields: 'Preencha todos os campos!',
        invalidEmail: 'Forneça um email válido!',
        incorrectData: 'Email ou senha incorretos,\ntente novamente.',
        serverError: 'Desculpa, algo deu errado,\ntente mais tarde.',
      },
      register: {
        preLinkText: 'Já possui uma conta?',
        linkText: 'Entre aqui!',
        buttonTitle: 'Registrar',
      },
      login: {
        preLinkText: 'Ainda não tem conta?',
        linkText: 'Registre-se!',
        buttonTitle: 'Entrar',
      },
      userProps: {
        email: 'email',
        password: 'senha',
        fullName: 'nome completo',
        profileImage: 'profileImage',
        confirmPassword: 'confirmar senha',
      },
    },
    signTask: {},
  },
  'en-US': {
    AUTH: {
      slogam: 'We all love in the same language.',
      error: {
        passwordMatch: "Passwords don't match!",
        emptyFields: 'Fill in all the fields!',
        invalidEmail: 'Provide valid email address!',
        incorrectData: 'Incorrect email address or password,\nplease try again.',
        serverError: 'Something went wrong,\nplease try again later.',
      },
      register: {
        preLinkText: 'Already have an account?',
        linkText: 'Sign in!',
        buttonTitle: 'Register',
      },
      login: {
        preLinkText: 'Don`t have an account?',
        linkText: 'Register!',
        buttonTitle: 'Sign in',
      },
      userProps: {
        email: 'email',
        password: 'password',
        fullName: 'fullName',
        profileImage: 'profileImage',
        confirmPassword: 'confirmPassword',
      },
    },
  },
};
