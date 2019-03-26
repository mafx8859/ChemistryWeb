package Interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;

/**
 * Created by mafx on 2019/3/19.
 */
public class SingleLoginInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ServletContext application=request.getServletContext();
        HashMap<String, HttpSession> sessionMap=(HashMap<String, HttpSession>)application.getAttribute("sessionMap");
        if(sessionMap==null){
            sessionMap=new HashMap<String, HttpSession>();
            application.setAttribute("sessionMap",sessionMap);
        }
        String username=request.getParameter("username");
        if(sessionMap.containsKey(username)&&sessionMap.get(username)!=null){
            sessionMap.get(username).invalidate();
            sessionMap.remove(username);
        }else{
            sessionMap.remove(username);
        }

        return true;
    }

}
