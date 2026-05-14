import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RoleGuard implements CanActivate {
  constructor(private readonly roles: string[]) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && this.roles.includes(user.role)) {
      return true; // user ka role match ho gaya
    }
    throw new ForbiddenException('role not defined');
  }
}
