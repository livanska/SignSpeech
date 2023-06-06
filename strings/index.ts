type rowMockVideos = {
  videoId: string;
  type: string;
};
export interface IAppStrings {
  LEARNING: {
    title: string;
    signToText: string;
    textToSign: string;
  };
  HOME: {
    internationalSignText: string;
    translateButtonText: string;
    preButtonText: string;
    rowMockDailyChallenge: {
      title: string;
      subtitle: string;
    };
    rowMockspeedTest: {
      title: string;
      subtitle: string;
    };
    rowMockStepByStep: {
      title: string;
      subtitle: string;
    };
    rowMockVideo: {
      title: string;
      subtitle: string;
      items: rowMockVideos[];
    };
    link: {
      linkText: string;
      preLinkText: string;
    };
  };
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
  TASK: {
    title: string;
  };
  RESULT: {
    buttonText: string;
    fail: { part1: string; part2: string };
    medium: { part1: string; part2: string };
    success: { part1: string; part2: string };
  };
  PROFILE: {
    modal: {
      title: string;
      inputName: string;
      inputEmail: string;
      saveButton: string;
      linkText: string;
    };
    options: {
      edit: string;
      logout: string;
    };
  };
  LOADING: {
    title: string;
  };
  NOT_FOUND: {
    title: string;
    buttonText: string;
  };
}

export const APP_STRINGS = {
  'pt-BR': {
    LEARNING: {
      title: 'O que você quer praticar?',
      signToText: 'Sinais para texto',
      textToSign: 'Texto para sinais',
    },
    HOME: {
      internationalSignText:
        'A Língua de Sinais Internacional (IS, na sigla em inglês) é uma variedade de língua de sinais utilizada em diversos contextos, especialmente em encontros internacionais como o congresso da Federação Mundial dos Surdos (WFD), eventos como as Deaflympics, em videoclipes produzidos por pessoas surdas e assistidos por outras pessoas surdas de todo o mundo, e de forma informal durante viagens e socialização.',
      preButtonText:
        'Seu nível de habilidade em comunicação em sinais não é bom o suficiente, mas você precisa entender o seu companheiro?',
      translateButtonText: 'Traduzir',
      rowMockDailyChallenge: {
        title: 'Desafios diários',
        subtitle:
          'Aprenda frases comuns todos os dias para se comunicar de forma mais fácil com seus amigos.',
      },
      rowMockspeedTest: {
        title: 'Teste de velocidade',
        subtitle: 'Tente traduzir o maior número possível de letras que conseguir.',
      },
      rowMockStepByStep: {
        title: 'Passo a passo',
        subtitle:
          'Comece o treinamento pelas letras mais fáceis e depois avance para as mais difíceis.',
      },
      rowMockVideo: {
        title: 'Video aulas',
        subtitle: 'Avance seus conhecimentos com a ajuda de professores renomados do mundo todo.',
        items: [
          { videoId: 'SiJUggsJ3e8', type: 'video' },
          { videoId: 'j9nSMjAywfg', type: 'video' },
          { videoId: '3CRo7nb7bPE', type: 'video' },
        ],
      },
      link: {
        linkText: 'Aprenda agora!',
        preLinkText: 'Não sabe como conversar com o seu público através da linguagem de sinais?',
      },
    },
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
    TASK: {
      title: 'Qual letra é essa?',
    },
    RESULT: {
      buttonText: 'Entendi!',
      fail: { part1: 'Oops!\n Você acertou apenas', part2: '% dos sinais. Tente novamente!' },
      medium: { part1: 'Isso ai!\n Você acertou', part2: '% dos sinais!' },
      success: { part1: 'Parabéns!\n Você acertou', part2: '% dos sinais!' },
    },
    PROFILE: {
      modal: {
        title: 'Editar informações pessoais',
        inputName: 'Nome completo',
        inputEmail: 'Email',
        saveButton: 'Salvar',
        linkText: 'Voltar',
      },
      options: {
        edit: 'Editar perfil',
        logout: 'Encerrar sessão',
      },
    },
    LOADING: {
      title: 'Aguarde...',
    },
    NOT_FOUND: {
      title: 'Esta tela não existe.',
      buttonText: 'Voltar para a tela inicial!',
    },
  },
  'en-US': {
    LEARNING: {
      title: 'What do you want to practice?',
      signToText: 'Signs to text',
      textToSign: 'Text to signs',
    },
    HOME: {
      internationalSignText:
        'International Sign (IS) is a contact variety of sign language used in a variety of different contexts, particularly at international meetings such as the World Federation of the Deaf (WFD) congress, events such as the Deaflympics, in video clips produced by Deaf people and watched by other Deaf people from around the world, and informally when travelling and socialising. ',
      preButtonText:
        'Your sign talking level isn’t good enought but need to understand your companion?',
      translateButtonText: 'Translate',
      rowMockDailyChallenge: {
        title: 'Daily challenge',
        subtitle: 'Learn common phrases every day to communicate with deaf friends easier',
      },
      rowMockspeedTest: {
        title: 'Speed Test',
        subtitle: 'Try to translate as many letters as you can in limited time',
      },
      rowMockStepByStep: {
        title: 'Step By Step',
        subtitle: 'Start training from the easiest letters to the hardest ones',
      },
      rowMockVideo: {
        title: 'Video learning',
        subtitle: 'Improve your knowledge with the help of world-known teachers',
        items: [
          { videoId: 'tkMg8g8vVUo', type: 'video' },
          { videoId: 'G6hVRVG74lc', type: 'video' },
          { videoId: '91foGHKuwL0', type: 'video' },
        ],
      },
      link: {
        linkText: 'Learn now!',
        preLinkText: 'Still don’t know how to show your speech to deaf audience?',
      },
    },
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
    TASK: {
      title: 'Which letter is it?',
    },
    RESULT: {
      buttonText: 'Got it!',
      fail: {
        part1: 'Congratulations! You guessed',
        part2: '% of signs!',
      },
      medium: {
        part1: 'Not bad! You guessed',
        part2: '% of signs!',
      },
      success: {
        part1: 'Failed! You guessed',
        part2: '% of signs, try better!',
      },
    },
    PROFILE: {
      modal: {
        title: 'Editar informações pessoais',
        inputName: 'Nome completo',
        inputEmail: 'Email',
        saveButton: 'Save',
        linkText: 'Back',
      },
      options: {
        edit: 'Edit profile',
        logout: 'Logout',
      },
    },
    LOADING: {
      title: 'Loading...',
    },
    NOT_FOUND: {
      title: `This screen doesn't exist.`,
      buttonText: 'Go to home screen!',
    },
  },
};
