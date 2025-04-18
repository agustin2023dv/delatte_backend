"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAcessModule = void 0;
const inversify_1 = require("inversify");
const userAccess_types_1 = require("../types/userAccess.types");
const userRegister_repository_1 = require("../repositories/userRegister.repository");
const userAuth_service_1 = require("../services/userAuth.service");
const userLogin_service_1 = require("../services/userLogin.service");
const userToken_repository_1 = require("../repositories/userToken.repository");
const userAuth_repository_1 = require("../repositories/userAuth.repository");
const passwordHasher_service_1 = require("../services/passwordHasher.service");
const userRegister_service_1 = require("../services/userRegister.service");
const email_service_1 = require("@modules/integrations/services/email.service");
exports.userAcessModule = new inversify_1.ContainerModule((bind) => {
    bind(userAccess_types_1.USER_ACCESS_TYPES.UserAuthService).to(userAuth_service_1.UserAuthService);
    bind(userAccess_types_1.USER_ACCESS_TYPES.UserAuthRepository).to(userAuth_repository_1.UserAuthRepository);
    bind(userAccess_types_1.USER_ACCESS_TYPES.UserTokenRepository).to(userToken_repository_1.UserTokenRepository);
    bind(userAccess_types_1.USER_ACCESS_TYPES.IUserRegisterService).to(userRegister_service_1.UserRegisterService);
    bind(userAccess_types_1.USER_ACCESS_TYPES.UserRegisterService).to(userRegister_service_1.UserRegisterService);
    bind(userAccess_types_1.USER_ACCESS_TYPES.PasswordHasher).to(passwordHasher_service_1.PasswordHasher);
    bind(userAccess_types_1.USER_ACCESS_TYPES.EmailService).to(email_service_1.EmailService);
    bind(userAccess_types_1.USER_ACCESS_TYPES.UserRegisterRepository).to(userRegister_repository_1.UserRegisterRepository);
    bind(userAccess_types_1.USER_ACCESS_TYPES.UserLoginService).to(userLogin_service_1.UserLoginService);
});
