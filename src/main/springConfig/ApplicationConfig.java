import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
/**
 * Created by mafx on 2018/10/9.
 * @author mafx.
 * 配置中间层和数据层的组件
 */
@Configuration
@ComponentScan(basePackages = {"com.bluemsun.answerapp.dao","com.bluemsun.answerapp.service","com.bluemsun.answerapp.entity"})
public class ApplicationConfig {
    /**
     * 配置文件上传
     * */
    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("utf-8");
        multipartResolver.setMaxUploadSize(1048576000);
        return multipartResolver;
    }
    /**
     * 配置数据源，此处使用c3p0数据库连接池
     * */
    @Bean
    public DataSource dataSource(){
        ComboPooledDataSource comboPooledDataSource=new ComboPooledDataSource();
        try {
            comboPooledDataSource.setJdbcUrl("jdbc:mysql://localhost:3306/answerapp_db");
            comboPooledDataSource.setDriverClass("com.mysql.jdbc.Driver");
            comboPooledDataSource.setMinPoolSize(5);
            comboPooledDataSource.setAcquireIncrement(5);
            comboPooledDataSource.setInitialPoolSize(2);
            comboPooledDataSource.setAcquireRetryDelay(400);
            comboPooledDataSource.setPreferredTestQuery("select 1");
            comboPooledDataSource.setTestConnectionOnCheckout(true);
            comboPooledDataSource.setTestConnectionOnCheckin(true);
            comboPooledDataSource.setUser("root");
            comboPooledDataSource.setPassword("sunchem");

        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }
        return  comboPooledDataSource;
    }
    /**
     * 配置对数据源的事务管理
     * */
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
    /**
     * 配置SqlSessionFactory
     * */
    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean=new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("mapper/*.xml"));
        sqlSessionFactoryBean.setTypeAliasesPackage("com.bluemsun.answerapp.entity");
        return sqlSessionFactoryBean.getObject();
    }
    /**
     * 配置扫描dao层接口的类
     * */
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer scannerConfigurer=new MapperScannerConfigurer();
        scannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        scannerConfigurer.setBasePackage("com.bluemsun.answerapp.dao");
        return scannerConfigurer;
    }

}
