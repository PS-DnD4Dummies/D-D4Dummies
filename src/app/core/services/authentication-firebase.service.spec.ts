import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationFirebaseService } from './authentication-firebase.service';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConf } from '@data/constanst/environment';

// Mock del objeto Auth
const authMock = {
  signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(of({ user: {} })),
  createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(of({ user: {} }))
};

describe('AuthenticationFirebaseService', () => {

  let service: AuthenticationFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(firebaseConf)),
        provideAuth(() => getAuth()),]
    });
    service = TestBed.inject(AuthenticationFirebaseService);
  });

  const generateEmailAndPassword = () => {
    const randomString = () =>
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    const email = `${randomString()}@${randomString()}.test`;
    const password = randomString();

    return { email, password };
  };

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("creates an account", async () => {
    const { email, password } = generateEmailAndPassword();

    const result = await service.signUp(email, password);
    expect(result).not.toBe(null);
  });

  it("logs users in", async () => {
    const { email, password } = generateEmailAndPassword();

    const result = await service.signUp(email, password);
    expect(result).not.toBe(null);

    const loginResult = await service.signIn(email, password);
    expect(loginResult).not.toBe(null);
  });

  it("does not log users in when the email and password are invalid", async () => {
    const loginResult = await service.signIn(
      "invalid@email.invalid",
      "password"
    );
    expect(loginResult).toEqual(null);
  });
});

