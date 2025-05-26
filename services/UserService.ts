import { useRouter } from 'next/navigation'

type User = {
  email: string;
}

type AuthResponse = {
  token: string;
  user: User;
};

type ProfileResponse = {
  user: User;
};

class UserService {
  private BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  private token: string | null = null;
  private TOKEN_KEY = 'token';
  private router: ReturnType<typeof useRouter>

  constructor(router: ReturnType<typeof useRouter>) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(this.TOKEN_KEY);
    }
    this.router = router
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(`${this.BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...options.headers,
      },
    });

    if (res.status === 401) {
      this.router.replace('/login')
      throw new Error('Unauthorized')
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw {
        message: error.message || `${options.method || 'GET'} ${url} failed`,
        errors: error.errors || {},
        status: res.status,
      };
    }

    return res.json();
  }

  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken() {
    this.token = null;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.saveToken(res.token);
    return res;
  }

  async signup(email: string, password: string): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.saveToken(res.token);
    return res;
  }

  logout(): void {
    this.clearToken();
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  async getProfile(): Promise<ProfileResponse> {
    const res = await this.request<ProfileResponse>('/me');
    return { user: res.user };
  }
}

export const useUserService = () => {
  const router = useRouter()
  return new UserService(router)
}
