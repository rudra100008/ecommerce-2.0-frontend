import { NextRequest, NextResponse } from "next/server";


const PUBLIC_ROUTES = ["/login","/register","/login/forgot-password"]

const PROTECTED_ROUTES = ["/home","/profile","/orders/","/cart","/shop"]

const ADMIN_ROUTES = ["/admin"]


const isPublicRoutes = (pathname: string):boolean =>{
    return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

const isAdminRoutes = (pathname: string): boolean =>{
    return ADMIN_ROUTES.some(route => pathname.startsWith(route));
}

const isProtectedRoutes = (pathname: string): boolean =>{
    return PROTECTED_ROUTES.some(route => pathname.startsWith(route))
}


export function proxy(request:NextRequest){
    const {pathname}= request.nextUrl;

     if (pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
    }
    const accessToken = request.cookies.get("accessToken")?.value;
    const role = request.cookies.get("role")?.value;

    const isAuthenticated = !!accessToken;
    const isAdmin = role  === "ROLE_ADMIN";

    
    // if authenticated but visit public routes send to / home page
    if(isAuthenticated && isPublicRoutes(pathname)){
        return NextResponse.redirect(new URL("/home",request.url))
    }

    // if unauthenticated but visit protected routes send to /login page
    if(!isAuthenticated && isProtectedRoutes(pathname)){
        const loginURL = new URL("/login",request.url);
        loginURL.searchParams.set("callbackUrl",pathname);
        return NextResponse.redirect(loginURL);
    }
    // unauthenticated visit admin routes redirect to login page
     if (!isAuthenticated && isAdminRoutes(pathname)) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname); // remember where they wanted to go
        return NextResponse.redirect(loginUrl);
    }

    // authenticated & not admin but visit admin page redirect to /home
    if(isAuthenticated && !isAdmin && isAdminRoutes(pathname)){
        return NextResponse.redirect(new URL("/home",request.url));
    }

    // authenticated and admin but visit protected page redirect to /admin
    if(isAuthenticated && isAdmin && isProtectedRoutes(pathname)){
        return NextResponse.redirect(new URL("/admin",request.url));
    }

    const requestHeaders = new Headers(request.headers);
    if(accessToken){
        requestHeaders.set("Authorization",`Bearer ${accessToken}`)
    }

    return NextResponse.next({
        request:{
            headers:requestHeaders,
        }
    })
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};