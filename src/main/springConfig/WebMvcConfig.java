import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by mafx on 2018/10/9.
 * @author mafx.
 * 配置web组件的bean
 */
@Configuration
//启用springmvc
@EnableWebMvc
@ComponentScan("com.bluemsun.answerapp.controller")
public class WebMvcConfig extends WebMvcConfigurerAdapter{
    /**
     * 配置视图解析器.
     * */
   /* @Bean
    public ViewResolver viewResolver(){
        InternalResourceViewResolver internalResourceViewResolver=new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("");
        internalResourceViewResolver.setSuffix(".jsp");
        internalResourceViewResolver.setExposeContextBeansAsAttributes(true);
        return internalResourceViewResolver;
    }*/
    /**
     * 配置对静态资源的处理
     * Spring MVC不处理静态资源
     * */
    @Override
    public void  configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer){
        configurer.enable();

    }

     /**解决跨域*/
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://47.93.197.5", "null")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
                .maxAge(3600)
                .allowCredentials(true);
    }
    /*@Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration addInterceptor = registry.addInterceptor(new ProcessInterceptor());
        addInterceptor.excludePathPatterns("/ques","/loginReginster","/course","/answer");
        addInterceptor.addPathPatterns("/**");
        super.addInterceptors(registry);

    }*/

}
