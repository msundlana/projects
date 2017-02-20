package com.acem.test01.merciful.sundlana;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Created by merciful.sundlana on 2017/02/19.
 */
@Configuration
@EnableWebMvc
@ComponentScan
public class MvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        registry.addViewController("/").setViewName("index");

    }

    @Bean
    public ViewResolver getViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/classes/static/");
        resolver.setSuffix(".html");
        return resolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/assets/**").addResourceLocations("/WEB-INF/classes/static/assets/");
        registry.addResourceHandler("/fonts/**").addResourceLocations("/WEB-INF/classes/static/fonts/");
        registry.addResourceHandler("/resources/**").addResourceLocations("/WEB-INF/classes/static/resources/");
        registry.addResourceHandler("/scripts/**").addResourceLocations("/WEB-INF/classes/static/scripts/");
        registry.addResourceHandler("/styles/**").addResourceLocations("/WEB-INF/classes/static/styles/");
        registry.addResourceHandler("/favicon.ico").addResourceLocations("/WEB-INF/classes/static/favicon.ico");
    }

    @Bean
    // Only used when running in embedded servlet
    public DispatcherServlet dispatcherServlet() {
        return new DispatcherServlet();
    }

    @Override
    public void configureDefaultServletHandling(
            DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**");
    }



}
