package com.bluemsun.answerapp.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by mafx on 2018/11/7.
 * @author mafx.
 */
public class SafeLoginAjaxReqFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request=(HttpServletRequest) servletRequest;
        HttpServletResponse response=(HttpServletResponse)servletResponse;
        Object session=request.getSession().getAttribute("user");
        String url=request.getRequestURI();
        String tempStr=url.substring(url.indexOf("/",1)+1,url.indexOf("/",url.indexOf("/",1)+1));
        if(session!=null){
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            if (tempStr.equals("teacher")) {
                request.getRequestDispatcher("/error.html").forward(request, response);
                return;
            }else if(tempStr.equals("student")){
                request.getRequestDispatcher("/index.html").forward(request, response);
                return;
            }else{
                request.getRequestDispatcher("/error.html").forward(request, response);
                return;
            }


        }
    }

    @Override
    public void destroy() {

    }
}
