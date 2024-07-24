from django.utils.deprecation import MiddlewareMixin

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        access_token = request.COOKIES.get('access_token')
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
            # print(f'Authorization header set: Bearer {access_token}')
        else:
            print('No access token found in cookies')
            
            
from django.http import HttpResponseForbidden



# middleware handles access_token being sent in request header to /profile1/ endpoint
# authorization header can't read cookie that has the name access_token, so it is handled via this file


# send crentials -> token returned and stored in httponly cookies -->
# cookies included in request header to protected endpoint --> protected data returned