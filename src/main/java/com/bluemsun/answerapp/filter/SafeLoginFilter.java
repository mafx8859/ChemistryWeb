package com.bluemsun.answerapp.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by mafx on 2018/11/6.
 * @author mafx.
 */
public class SafeLoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request=(HttpServletRequest) servletRequest;
        HttpServletResponse response=(HttpServletResponse)servletResponse;
        Object session=request.getSession().getAttribute("user");
        String url=request.getRequestURI();
        String tempStr=url.substring(1,url.indexOf("/",2));
        if(session!=null){
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            if(tempStr.equals("teacherQuesManger")) {
                response.sendRedirect("/teacherQuesManger/login.html");
            }else {
                response.sendRedirect("/index.html");
            }
        }
    }

    @Override
    public void destroy() {

    }
}
