export type AuthFormType = 'login' | 'signup';

export interface AuthField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface IAuthFormStrategy {
  getTitle(): string;
  getDescription(): string;
  getFields(): AuthField[];
  getSubmitLabel(): string;
  getFooterText(): string;
  getFooterLinkLabel(): string;
  getFooterLinkPath(): string;
}

export class LoginFormStrategy implements IAuthFormStrategy {
  getTitle(): string {
    return 'Welcome Back!';
  }

  getDescription(): string {
    return 'Please enter your details to sign in.';
  }

  getFields(): AuthField[] {
    return [
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true }
    ];
  }

  getSubmitLabel(): string {
    return 'Sign In';
  }

  getFooterText(): string {
    return "Don't have an account?";
  }

  getFooterLinkLabel(): string {
    return 'Create an account';
  }

  getFooterLinkPath(): string {
    return '/signup';
  }
}

export class SignupFormStrategy implements IAuthFormStrategy {
  getTitle(): string {
    return 'Sign Up';
  }

  getDescription(): string {
    return "Let's get you set up so you can start traveling.";
  }

  getFields(): AuthField[] {
    return [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true }
    ];
  }

  getSubmitLabel(): string {
    return 'Create Account';
  }

  getFooterText(): string {
    return 'Already have an account?';
  }

  getFooterLinkLabel(): string {
    return 'Login';
  }

  getFooterLinkPath(): string {
    return '/login';
  }
}

export class AuthFormContext {
  static getStrategy(type: AuthFormType): IAuthFormStrategy {
    if (type === 'signup') {
      return new SignupFormStrategy();
    }

    return new LoginFormStrategy();
  }
}
