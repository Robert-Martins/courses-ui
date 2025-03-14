import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs";
import { CoursesApplicationError } from "../types/types";

export const errorHandlerInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const toastrService = inject(ToastrService);
    return next(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                toastrService.error((error.error as CoursesApplicationError)?.details ?? 'Ocorreu um erro inesperado');
                throw error;
            })
        );
}