import { TestBed } from '@angular/core/testing';

import { UsersGuardGuard } from './users-guard.guard';

describe('UsersGuardGuard', () => {
  let guard: UsersGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsersGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
