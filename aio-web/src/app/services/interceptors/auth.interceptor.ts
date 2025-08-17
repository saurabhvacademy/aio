import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const authToken = localStorage.getItem('ACCESS_TOKEN');
    if (!authToken || authToken === '') {
        return next(req);
      }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });  
  return next(modifiedReq);
};
