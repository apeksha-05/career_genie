const jwt = require('jsonwebtoken');
const { authenticate, authorize, studentOnly, recruiterOnly, adminOnly } = require('../../middleware/auth');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    process.env.JWT_SECRET = 'test_secret';
  });

  describe('authenticate', () => {
    it('should return 401 if no token is provided', () => {
      authenticate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Unauthorized: No token provided' }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if an invalid token is provided', () => {
      req.headers.authorization = 'Bearer invalidtoken';
      authenticate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Unauthorized: Invalid token' }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next and set req.user if a valid token is provided in headers', () => {
      const userPayload = { id: '123', role: 'student' };
      const token = jwt.sign(userPayload, process.env.JWT_SECRET);
      req.headers.authorization = `Bearer ${token}`;

      authenticate(req, res, next);
      expect(req.user.id).toBe(userPayload.id);
      expect(req.user.role).toBe(userPayload.role);
      expect(next).toHaveBeenCalled();
    });

    it('should call next and set req.user if a valid token is provided in cookies', () => {
      const userPayload = { id: '123', role: 'admin' };
      const token = jwt.sign(userPayload, process.env.JWT_SECRET);
      req.cookies.token = token;

      authenticate(req, res, next);
      expect(req.user.id).toBe(userPayload.id);
      expect(req.user.role).toBe(userPayload.role);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('authorize', () => {
    it('should return 403 if req.user is undefined', () => {
      const middleware = authorize('student');
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Forbidden: Insufficient privileges' }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if user role is not authorized', () => {
      req.user = { role: 'student' };
      const middleware = authorize('recruiter');
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Forbidden: Insufficient privileges' }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next if user role is authorized', () => {
      req.user = { role: 'recruiter' };
      const middleware = authorize('recruiter');
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should call next if user role is one of the authorized roles', () => {
      req.user = { role: 'admin' };
      const middleware = authorize('recruiter', 'admin');
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
