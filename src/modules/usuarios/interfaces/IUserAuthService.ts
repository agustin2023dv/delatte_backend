export interface IUserAuthService {
    verifyEmailToken(emailToken: string): Promise<{ success: boolean; message: string; redirectUrl: string }>;
    changePassword(userId: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<{ message: string }>;
    requestPasswordReset(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
  }
  