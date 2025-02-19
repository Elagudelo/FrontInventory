import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } } // Mock del Router
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('debería permitir el acceso si hay un token en el localStorage', () => {
    // Simula que hay un token en el localStorage
    localStorage.setItem('token', 'fake-token');

    const result = guard.canActivate();

    expect(result).toBeTrue(); // Espera que el guard permita el acceso
  });

  it('debería redirigir al login si no hay un token en el localStorage', () => {
    // Simula que no hay un token en el localStorage
    localStorage.removeItem('token');

    const result = guard.canActivate();

    expect(result).toBeFalse(); // Espera que el guard deniegue el acceso
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Espera que se redirija al login
  });

  afterEach(() => {
    // Limpia el localStorage después de cada prueba
    localStorage.removeItem('token');
  });
});