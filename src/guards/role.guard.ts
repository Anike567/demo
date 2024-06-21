import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Observable } from 'rxjs';
import { Roles} from 'src/decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const roles = this.reflector.get(Roles, context.getHandler());

        if (!roles) {
            return true;
        }

        if (!authHeader) {
            return false;
        }

        const token = authHeader.split(' ')[1];
        const user = await this.authService.verify(token);
        
        if (!user) {
            return false;
        }

        return this.matchRoles(roles, user.roles);
    }

    private matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
        return allowedRoles.some(role => userRoles.includes(role));
    }
}
