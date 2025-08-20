/*package com.acoustic.guardian.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //  Serves audio files from resources/audio/ when accessed via /audio/filename.mp3
        registry.addResourceHandler("/audio/**")
                .addResourceLocations("classpath:/static/audio/"); // this ensures /audio/ maps to src/main/resources/audio
    }
}*/
